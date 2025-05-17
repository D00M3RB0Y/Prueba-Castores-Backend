import express from 'express';
import { addFavorite, getFavoritesByUser, deleteFavoriteByVideoId } from '../controllers/favorite';


const router = express.Router();

router.post('/api/playlist/favorites', addFavorite);
router.get('/api/playlist/favorites/:userid', getFavoritesByUser);
router.delete('/api/playlist/favorites/:userid/:videoId', deleteFavoriteByVideoId);

export default router;