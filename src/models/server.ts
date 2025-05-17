import express, { Application } from "express";
import sequelize from "../database/connection";
import RUser from "../routes/users";
import RProduct from "../routes/products";
import RYouTube from "../routes/youtubeController";
import RPlaylist from "../routes/favorite";
import { User } from "./users";
import { Product } from "./products";
import cors from "cors";
import { favorite } from "./favorite";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3017";
    this.midlewares();
    this.router();
    this.DBconnnect();
    this.listen();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Funcionando en el puerto: " + this.port);
    });
  }

  router() {
    this.app.use(RUser);
    this.app.use(RProduct);
    this.app.use(RYouTube);
    this.app.use(RPlaylist);
  }

  midlewares() {
    this.app.use(express.json());
    this.app.use(cors());

  }

  async DBconnnect() {
    try {
      await User.sync();
      await Product.sync();
      await favorite.sync();
    //   console.log("Conexión exitosa");
    } catch (error) {
      console.log("Error al conectar: ", error);
    }
  }
}

export default Server;

