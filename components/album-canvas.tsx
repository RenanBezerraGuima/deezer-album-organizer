'use client';

import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import type { Album, AlbumPosition } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AlbumCard } from './album-card';
import {
  clampZoom,
  DEFAULT_CARD_SIZE,
  getViewportWorldBoundaries,
  isAlbumVisibleInWorld,
  screenToWorld,
  type CameraState,
} from '@/lib/spatial';
import { useFolderStore } from '@/lib/store';

interface AlbumCanvasProps {
  albums: Album[];
  folderId: string;
}

/**
 * Performance: Memoized item component prevents re-rendering all albums during canvas panning.
 * Since panning only updates the parent "stage" transform, the world positions of items
 * remain stable. React skips reconciling these items if their props haven't changed.
 */
const AlbumCanvasItem = React.memo(function AlbumCanvasItem({
  album,
  folderId,
  isDragging,
  position,
  onPointerDown,
}: {
  album: Album;
  folderId: string;
  isDragging: boolean;
  position: AlbumPosition;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>, album: Album) => void;
}) {
  const handleDragStart = useCallback((e: React.DragEvent) => {
    useFolderStore.getState().setDraggedAlbum(album, folderId, null);
    e.dataTransfer.setData('text/plain', album.id);
    e.dataTransfer.effectAllowed = 'move';
  }, [album, folderId]);

  const handleDragEnd = useCallback(() => {
    useFolderStore.getState().setDraggedAlbum(null, null, null);
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    onPointerDown(event, album);
  }, [onPointerDown, album]);

  return (
    <div
      data-album-card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn('absolute pointer-events-auto', isDragging && 'z-50')}
      style={{
        left: position.x,
        top: position.y,
        width: DEFAULT_CARD_SIZE.width,
      }}
      onPointerDown={handlePointerDown}
    >
      <AlbumCard album={album} folderId={folderId} />
    </div>
  );
});

export function AlbumCanvas({ albums, folderId }: AlbumCanvasProps) {
  const setAlbumPosition = useFolderStore((state) => state.setAlbumPosition);
  const containerRef = useRef<HTMLDivElement>(null);

  const [camera, setCamera] = useState<CameraState>({ x: 48, y: 24, zoom: 1 });
  const cameraRef = useRef<CameraState>(camera);

  // Sync ref with state for use in stable handlers
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  const [isPanning, setIsPanning] = useState(false);
  const [draggedAlbum, setDraggedAlbum] = useState<{
    id: string;
    initialPos: AlbumPosition;
    currentPos: AlbumPosition;
  } | null>(null);

  const visibleAlbums = useMemo(() => {
    const container = containerRef.current;
    const viewport = {
      width: container?.clientWidth ?? window.innerWidth,
      height: container?.clientHeight ?? window.innerHeight,
    };

    // Pre-calculate world viewport boundaries once per render to avoid
    // redundant calculations in the O(N) filter loop.
    const bounds = getViewportWorldBoundaries(camera, viewport);

    return albums.filter((album) => {
      // Always include the dragged album so it doesn't pop out of existence
      // if moved out of its initial world-space bounds while dragging.
      if (album.id === draggedAlbum?.id) return true;
      const pos = album.position ?? { x: 0, y: 0 };
      return isAlbumVisibleInWorld(pos, bounds, DEFAULT_CARD_SIZE);
    });
  }, [albums, camera, draggedAlbum?.id]);

  const startPan = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('[data-album-card]')) {
      return;
    }

    setIsPanning(true);
    const startX = event.clientX;
    const startY = event.clientY;

    // Capture the camera state at the moment of interaction
    const initialCamera = cameraRef.current;

    const move = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setCamera({
        ...initialCamera,
        x: initialCamera.x + deltaX,
        y: initialCamera.y + deltaY
      });
    };

    const up = () => {
      setIsPanning(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, []); // Truly stable handler

  const zoomCanvas = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const containerBounds = containerRef.current?.getBoundingClientRect();
    if (!containerBounds) return;

    const cursor = {
      x: event.clientX - containerBounds.left,
      y: event.clientY - containerBounds.top,
    };

    // Use latest camera from ref
    const currentCamera = cameraRef.current;
    const worldBeforeZoom = screenToWorld(cursor, currentCamera);
    const nextZoom = clampZoom(currentCamera.zoom - event.deltaY * 0.001);

    const newCamera = {
      zoom: nextZoom,
      x: cursor.x - worldBeforeZoom.x * nextZoom,
      y: cursor.y - worldBeforeZoom.y * nextZoom,
    };

    setCamera(newCamera);
  }, []); // Truly stable handler

  const startAlbumDrag = useCallback((event: React.PointerEvent<HTMLDivElement>, album: Album) => {
    event.stopPropagation();

    const startX = event.clientX;
    const startY = event.clientY;
    const initial = album.position ?? { x: 0, y: 0 };
    const zoom = cameraRef.current.zoom;

    setDraggedAlbum({ id: album.id, initialPos: initial, currentPos: initial });

    const move = (moveEvent: PointerEvent) => {
      const deltaX = (moveEvent.clientX - startX) / zoom;
      const deltaY = (moveEvent.clientY - startY) / zoom;
      const newPos = { x: initial.x + deltaX, y: initial.y + deltaY };
      setDraggedAlbum((prev) => (prev ? { ...prev, currentPos: newPos } : null));
    };

    const up = (upEvent: PointerEvent) => {
      const deltaX = (upEvent.clientX - startX) / zoom;
      const deltaY = (upEvent.clientY - startY) / zoom;
      setAlbumPosition(folderId, album.id, initial.x + deltaX, initial.y + deltaY);
      setDraggedAlbum(null);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }, [folderId, setAlbumPosition]); // Stabilized by using cameraRef.current.zoom inside

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-background"
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      onPointerDown={startPan}
      onWheel={zoomCanvas}
      data-testid="album-canvas"
    >
      <div
        style={{
          transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})`,
          transformOrigin: '0 0',
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {visibleAlbums.map((album) => {
          const isDragging = draggedAlbum?.id === album.id;
          const position = isDragging
            ? draggedAlbum.currentPos
            : (album.position ?? { x: 0, y: 0 });

          return (
            <AlbumCanvasItem
              key={album.id}
              album={album}
              folderId={folderId}
              isDragging={isDragging}
              position={position}
              onPointerDown={startAlbumDrag}
            />
          );
        })}
      </div>
    </div>
  );
}
