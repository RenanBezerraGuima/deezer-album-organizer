import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const albumName = searchParams.get('album');
  const artistName = searchParams.get('artist');

  if (!albumName || !artistName) {
    return NextResponse.json({ error: 'Album and artist parameters are required' }, { status: 400 });
  }

  try {
    const query = `album:"${albumName}" artist:"${artistName}"`;
    const response = await fetch(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}&limit=1`
    );

    if (!response.ok) {
      throw new Error('Failed to search Deezer');
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const album = data.data[0];
      return NextResponse.json({
        deezerUrl: album.link,
        deezerId: album.id,
      });
    }

    // Fallback: try simpler search
    const fallbackQuery = `${albumName} ${artistName}`;
    const fallbackResponse = await fetch(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(fallbackQuery)}&limit=1`
    );

    if (fallbackResponse.ok) {
      const fallbackData = await fallbackResponse.json();
      if (fallbackData.data && fallbackData.data.length > 0) {
        const album = fallbackData.data[0];
        return NextResponse.json({
          deezerUrl: album.link,
          deezerId: album.id,
        });
      }
    }

    return NextResponse.json({ deezerUrl: null, deezerId: null });
  } catch (error) {
    console.error('Deezer search error:', error);
    return NextResponse.json({ error: 'Failed to find album on Deezer' }, { status: 500 });
  }
}
