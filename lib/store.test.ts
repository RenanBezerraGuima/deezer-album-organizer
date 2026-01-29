import { describe, it, expect, beforeEach } from 'vitest';
import { useFolderStore } from './store';

describe('useFolderStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    // Since it's a singleton, we need a way to reset it or just clear folders
    const { folders, deleteFolder } = useFolderStore.getState();
    folders.forEach(f => deleteFolder(f.id));
    useFolderStore.setState({ folders: [], selectedFolderId: null });
  });

  it('should add an album to a folder', () => {
    const { createFolder, addAlbumToFolder } = useFolderStore.getState();
    createFolder('Test Folder', null);
    const folder = useFolderStore.getState().folders[0];

    const album = {
      id: 'itunes-1',
      name: 'Album 1',
      artist: 'Artist 1',
      imageUrl: 'url1',
      releaseDate: '2021',
      totalTracks: 10,
    };

    addAlbumToFolder(folder.id, album);

    const updatedFolder = useFolderStore.getState().folders[0];
    expect(updatedFolder.albums).toHaveLength(1);
    expect(updatedFolder.albums[0].name).toBe('Album 1');
  });

  it('should NOT allow adding two different iTunes albums to the same folder if they have undefined spotifyId (the bug)', () => {
    const { createFolder, addAlbumToFolder } = useFolderStore.getState();
    createFolder('Test Folder', null);
    const folder = useFolderStore.getState().folders[0];

    const album1 = {
      id: 'itunes-1',
      name: 'Album 1',
      artist: 'Artist 1',
      imageUrl: 'url1',
      releaseDate: '2021',
      totalTracks: 10,
      // spotifyId is undefined
    };

    const album2 = {
      id: 'itunes-2',
      name: 'Album 2',
      artist: 'Artist 2',
      imageUrl: 'url2',
      releaseDate: '2022',
      totalTracks: 12,
      // spotifyId is undefined
    };

    addAlbumToFolder(folder.id, album1);
    addAlbumToFolder(folder.id, album2);

    const updatedFolder = useFolderStore.getState().folders[0];

    // This is expected to FAIL with current implementation because
    // it checks spotifyId === spotifyId (undefined === undefined)
    expect(updatedFolder.albums).toHaveLength(2);
  });
});
