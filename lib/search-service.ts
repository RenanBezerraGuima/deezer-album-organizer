import type { Album } from './types';

export async function searchAlbumsITunes(query: string): Promise<Album[]> {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=20`
    );

    if (!response.ok) {
      throw new Error('Failed to search iTunes');
    }

    const data = await response.json();

    return data.results.map((item: any) => ({
      id: `itunes-${item.collectionId}`,
      name: item.collectionName,
      artist: item.artistName,
      imageUrl: item.artworkUrl100.replace('100x100bb', '600x600bb'), // Get higher resolution
      releaseDate: item.releaseDate,
      totalTracks: item.trackCount,
      externalUrl: item.collectionViewUrl,
    }));
  } catch (error) {
    console.error('iTunes search error:', error);
    throw error;
  }
}
