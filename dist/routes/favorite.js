"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const favorite_1 = require("../controllers/favorite");
const router = express_1.default.Router();
router.post('/api/playlist/favorites', favorite_1.addFavorite);
router.get('/api/playlist/favorites/:userid', favorite_1.getFavoritesByUser);
router.delete('/api/playlist/favorites/:userid/:videoId', favorite_1.deleteFavoriteByVideoId);
exports.default = router;
