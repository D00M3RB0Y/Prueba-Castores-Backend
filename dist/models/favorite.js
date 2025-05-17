"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favorite = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection")); // Asegúrate de que esta ruta sea correcta
exports.favorite = connection_1.default.define('Favorite', {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userid: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    videoId: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    createdAt: { type: sequelize_1.DataTypes.DATE, allowNull: false }
});
