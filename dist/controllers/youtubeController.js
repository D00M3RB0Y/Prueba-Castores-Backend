"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYouTubeVideos = void 0;
const googleapis_1 = require("googleapis");
const youtube = googleapis_1.google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
});
const RESULTS_PER_PAGE = 10; // Define cuántos videos mostrar por página
const getYouTubeVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query, pageToken } = req.query; // Recibe pageToken
    if (!query) {
        return res.status(400).json({ error: 'Se necesita un término de búsqueda de YouTube.' });
    }
    try {
        const response = yield youtube.search.list({
            key: process.env.YOUTUBE_API_KEY,
            part: 'snippet',
            q: query,
            maxResults: RESULTS_PER_PAGE,
            type: 'video',
            pageToken: pageToken, // Usa el pageToken recibido
        });
        const videos = response.data.items.map((item) => {
            var _a, _b;
            return ({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: ((_b = (_a = item.snippet.thumbnails) === null || _a === void 0 ? void 0 : _a.medium) === null || _b === void 0 ? void 0 : _b.url) || '',
                publishedAt: item.snippet.publishedAt,
            });
        });
        res.json({
            videos,
            nextPageToken: response.data.nextPageToken,
            prevPageToken: response.data.prevPageToken,
            totalResults: (_a = response.data.pageInfo) === null || _a === void 0 ? void 0 : _a.totalResults,
            resultsPerPage: RESULTS_PER_PAGE,
        });
    }
    catch (error) {
        console.error('Error al obtener videos de YouTube:', error);
        res.status(500).json({ error: 'Error al obtener videos de YouTube.' });
    }
});
exports.getYouTubeVideos = getYouTubeVideos;
