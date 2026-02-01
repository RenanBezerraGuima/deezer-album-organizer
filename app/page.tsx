'use client';

import { FolderTree } from '@/components/folder-tree';
import { AlbumGrid } from '@/components/album-grid';
import { AlbumSearch } from '@/components/album-search';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export default function Home() {
  return (
    <main className="h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <AlbumSearch />

      <div className="flex-1 min-h-0 z-10">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={35} className="flex flex-col">
            <FolderTree />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={80} minSize={50} className="flex flex-col">
            <AlbumGrid />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
