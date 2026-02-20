'use client';

import React from 'react';
import { Menu, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFolderStore } from '@/lib/store';

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
    return (
        <header className="h-[60px] w-full border-b-2 border-border bg-background flex items-center justify-between px-4 z-50 shrink-0">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="h-10 w-10 border-2 border-transparent hover:border-border rounded-none"
                    aria-label="Open menu"
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
            </div>

            <h1 className="text-xl font-semibold tracking-tighter" style={{ fontFamily: 'var(--font-display)' }}>
                AlbumShelf
            </h1>

            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-none border-border"
                    onClick={() => useFolderStore.getState().setSettingsOpen(true)}
                    title="Settings [S]"
                    aria-label="Settings [S]"
                    aria-keyshortcuts="s"
                >
                    <Settings className="h-4 w-4" aria-hidden="true" />
                </Button>
            </div>
        </header>
    );
}
