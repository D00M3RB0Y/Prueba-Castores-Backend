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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../routes/users"));
const products_1 = __importDefault(require("../routes/products"));
const youtubeController_1 = __importDefault(require("../routes/youtubeController"));
const favorite_1 = __importDefault(require("../routes/favorite"));
const users_2 = require("./users");
const products_2 = require("./products");
const cors_1 = __importDefault(require("cors"));
const favorite_2 = require("./favorite");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.use(users_1.default);
        this.app.use(products_1.default);
        this.app.use(youtubeController_1.default);
        this.app.use(favorite_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    DBconnnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield users_2.User.sync();
                yield products_2.Product.sync();
                yield favorite_2.favorite.sync();
                //   console.log("Conexión exitosa");
            }
            catch (error) {
                console.log("Error al conectar: ", error);
            }
        });
    }
}
exports.default = Server;
