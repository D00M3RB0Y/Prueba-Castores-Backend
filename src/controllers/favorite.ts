import { Request, Response } from "express";
import { favorite } from "../models/favorite"; 



export const addFavorite = async (req: Request, res: Response) => {
  const { videoId, userid, createdAt} = req.body;
  const fav = await favorite.findOne({ where: { videoId: videoId } });

  if (fav) {
    return res.status(400).json({
      msg: `Este video ya esta en tus favoritos ${videoId}`,
    });
  }
  try {
    favorite.create({
    userid: userid,
    videoId: videoId,
    createdAt: createdAt
    })
    res.json({
      msg: `Video ${videoId} añadido a favoritos`
    })
  } catch (error) {
    res.status(400).json({
      msg: `Hubo un error al agregar el video a favoritos ${videoId}`,
    });
  }
  
};

export const getFavoritesByUser = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    const favorites = await favorite.findAll({
      where: { userid }
    });

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos', error });
  }
};

export const deleteFavoriteByVideoId = async (req: Request, res: Response) => {
  const { videoId, userid } = req.params;

  try {
    const fav = await favorite.findOne({
      where: { videoId: videoId, userid: userid }
    });

    if (!fav) {
      return res.status(404).json({ msg: "Favorito no encontrado para este usuario y videoId" });
    }

    await fav.destroy();

    res.json({ msg: "Favorito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar el favorito", error });
  }
};