'use client';

import { useEffect } from 'react';
import { useFolderStore } from '@/lib/store';

export function ThemeHandler() {
  const theme = useFolderStore((state) => state.theme);
  const geistFont = useFolderStore((state) => state.geistFont);

  useEffect(() => {
    // Remove all existing theme classes
    const classes = document.body.className.split(' ').filter(c => !c.startsWith('theme-'));
    document.body.className = [...classes, `theme-${theme}`].join(' ');
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-geist-font', geistFont);
  }, [geistFont]);

  return null;
}
