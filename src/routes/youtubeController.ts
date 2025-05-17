import express from 'express';
import { getYouTubeVideos } from '../controllers/youtubeController';


const router = express.Router();

router.get('/api/youtube/videos', getYouTubeVideos); 


export default router;