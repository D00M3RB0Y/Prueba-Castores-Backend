"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const youtubeController_1 = require("../controllers/youtubeController");
const router = express_1.default.Router();
router.get('/api/youtube/videos', youtubeController_1.getYouTubeVideos);
exports.default = router;
