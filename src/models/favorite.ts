import { DataTypes } from 'sequelize';
import sequelize from '../database/connection'; // Asegúrate de que esta ruta sea correcta

export const favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userid: { type: DataTypes.INTEGER, allowNull: false },
  videoId: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false }
});
