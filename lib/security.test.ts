import { describe, it, expect, beforeEach } from 'vitest';
import { useFolderStore } from './store';

describe('Security: Input Validation', () => {
  beforeEach(() => {
    useFolderStore.setState({ folders: [], selectedFolderId: null });
  });

  it('should truncate folder names to 100 characters during import', () => {
    const { importFolders } = useFolderStore.getState();

    const longName = 'A'.repeat(200);
    const importedData = [
      {
        id: 'old-id-1',
        name: longName,
        parentId: null,
        albums: [],
        subfolders: [],
        isExpanded: true
      }
    ];

    importFolders(importedData as any);

    const finalFolders = useFolderStore.getState().folders;
    expect(finalFolders[0].name.length).toBe(100);
    expect(finalFolders[0].name).toBe('A'.repeat(100));
  });

  it('should handle malicious properties in imported data by ignoring them', () => {
     const { importFolders } = useFolderStore.getState();

    const importedData = [
      {
        id: 'old-id-1',
        name: 'Safe Name',
        parentId: null,
        albums: [],
        subfolders: [],
        isExpanded: true,
        malicious: '<script>alert(1)</script>',
        extra: 'property'
      }
    ];

    importFolders(importedData as any);

    const finalFolders = useFolderStore.getState().folders;
    expect(finalFolders[0]).not.toHaveProperty('malicious');
    expect(finalFolders[0]).not.toHaveProperty('extra');
    // It should still have the expected properties
    expect(finalFolders[0].name).toBe('Safe Name');
  });
});
