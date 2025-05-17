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
exports.deleteFavoriteByVideoId = exports.getFavoritesByUser = exports.addFavorite = void 0;
const favorite_1 = require("../models/favorite");
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId, userid, createdAt } = req.body;
    const fav = yield favorite_1.favorite.findOne({ where: { videoId: videoId } });
    if (fav) {
        return res.status(400).json({
            msg: `Este video ya esta en tus favoritos ${videoId}`,
        });
    }
    try {
        favorite_1.favorite.create({
            userid: userid,
            videoId: videoId,
            createdAt: createdAt
        });
        res.json({
            msg: `Video ${videoId} añadido a favoritos`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Hubo un error al agregar el video a favoritos ${videoId}`,
        });
    }
});
exports.addFavorite = addFavorite;
const getFavoritesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userid } = req.params;
        const favorites = yield favorite_1.favorite.findAll({
            where: { userid }
        });
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener favoritos', error });
    }
});
exports.getFavoritesByUser = getFavoritesByUser;
const deleteFavoriteByVideoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId, userid } = req.params;
    try {
        const fav = yield favorite_1.favorite.findOne({
            where: { videoId: videoId, userid: userid }
        });
        if (!fav) {
            return res.status(404).json({ msg: "Favorito no encontrado para este usuario y videoId" });
        }
        yield fav.destroy();
        res.json({ msg: "Favorito eliminado correctamente" });
    }
    catch (error) {
        res.status(500).json({ msg: "Error al eliminar el favorito", error });
    }
});
exports.deleteFavoriteByVideoId = deleteFavoriteByVideoId;
