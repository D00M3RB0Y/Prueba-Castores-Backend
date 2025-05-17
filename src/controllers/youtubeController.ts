import { Request, Response } from 'express';
import { google } from 'googleapis';
import { YouTubeVideo } from '../models/youtube';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

const RESULTS_PER_PAGE = 10; // Define cuántos videos mostrar por página

export const getYouTubeVideos = async (req: Request, res: Response) => {
  const { query, pageToken } = req.query; // Recibe pageToken

  if (!query) {
    return res.status(400).json({ error: 'Se necesita un término de búsqueda de YouTube.' });
  }

  try {
    const response = await youtube.search.list({
      key: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      q: query as string,
      maxResults: RESULTS_PER_PAGE,
      type: 'video',
      pageToken: pageToken as string | undefined, // Usa el pageToken recibido
    });

    const videos: YouTubeVideo[] = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || '',
      publishedAt: item.snippet.publishedAt,
    }));

    res.json({
      videos,
      nextPageToken: response.data.nextPageToken,
      prevPageToken: response.data.prevPageToken,
      totalResults: response.data.pageInfo?.totalResults,
      resultsPerPage: RESULTS_PER_PAGE,
    });
  } catch (error: any) {
    console.error('Error al obtener videos de YouTube:', error);
    res.status(500).json({ error: 'Error al obtener videos de YouTube.' });
  }
};