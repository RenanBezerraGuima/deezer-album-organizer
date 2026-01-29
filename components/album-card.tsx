'use client';

import React from "react";
import { useState } from 'react';
import { Play, GripVertical, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFolderStore } from '@/lib/store';
import type { Album } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AlbumCardProps {
  album: Album;
  folderId: string;
}

export function AlbumCard({ album, folderId }: AlbumCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [deezerUrl, setDeezerUrl] = useState<string | null>(null);
  const [isLoadingDeezer, setIsLoadingDeezer] = useState(false);

  const { setDraggedAlbum, setDraggedFolderId, removeAlbumFromFolder } = useFolderStore();

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    setDraggedAlbum(album);
    setDraggedFolderId(folderId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedAlbum(null);
    setDraggedFolderId(null);
  };

  const handleRemove = () => {
    removeAlbumFromFolder(folderId, album.id);
  };

  const handleOpenDeezer = async () => {
    if (deezerUrl) {
      window.open(deezerUrl, '_blank');
      return;
    }

    setIsLoadingDeezer(true);
    try {
      const response = await fetch(
        `/api/deezer?album=${encodeURIComponent(album.name)}&artist=${encodeURIComponent(album.artist)}`
      );

      if (!response.ok) {
        throw new Error('API not available');
      }

      const data = await response.json();
      
      if (data.deezerUrl) {
        setDeezerUrl(data.deezerUrl);
        window.open(data.deezerUrl, '_blank');
      } else {
        window.open(
          `https://www.deezer.com/search/${encodeURIComponent(`${album.name} ${album.artist}`)}`,
          '_blank'
        );
      }
    } catch (error) {
      console.error('Failed to get Deezer link:', error);
      window.open(
        `https://www.deezer.com/search/${encodeURIComponent(`${album.name} ${album.artist}`)}`,
        '_blank'
      );
    } finally {
      setIsLoadingDeezer(false);
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={cn(
        'group relative bg-card rounded-lg overflow-hidden border border-border shadow-sm transition-all hover:shadow-md hover:border-muted-foreground/30',
        isDragging && 'opacity-50 ring-2 ring-primary'
      )}
    >
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10">
        <div className="bg-background/80 backdrop-blur-sm rounded p-1">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Button
          size="icon"
          variant="destructive"
          className="h-7 w-7"
          onClick={handleRemove}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="aspect-square relative">
        <img
          src={album.imageUrl || "/placeholder.svg"}
          alt={album.name}
          className="w-full h-full object-cover"
        />
        
        <button
          onClick={handleOpenDeezer}
          disabled={isLoadingDeezer}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {isLoadingDeezer ? (
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          ) : (
            <div className="bg-[#A238FF] rounded-full p-3 shadow-lg hover:scale-110 transition-transform">
              <Play className="h-8 w-8 text-white fill-white" />
            </div>
          )}
        </button>
      </div>

      <div className="p-3">
        <h3 className="font-medium text-sm text-foreground truncate" title={album.name}>
          {album.name}
        </h3>
        <p className="text-xs text-muted-foreground truncate mt-0.5" title={album.artist}>
          {album.artist}
        </p>
        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
          <span>{album.releaseDate?.split('-')[0]}</span>
          <span>-</span>
          <span>{album.totalTracks} tracks</span>
        </div>
      </div>
    </div>
  );
}
