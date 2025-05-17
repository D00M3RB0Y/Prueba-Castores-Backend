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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, lastname, email, password } = req.body;
    const passwordHash = yield bcrypt_1.default.hash(password, 10);
    const user = yield users_1.User.findOne({ where: { email: email } });
    if (user) {
        return res.status(400).json({
            msg: `Usuario ya existente con el email ${email}`,
        });
    }
    try {
        users_1.User.create({
            username: username,
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            status: 1,
        });
        res.json({
            msg: `User ${name} ${lastname} create success...`,
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `Hubo un error al crear al usuario ${name} ${lastname}`,
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const whereClause = username ? { username } : email ? { email } : null;
    if (!whereClause) {
        return res.status(400).json({ msg: "Debes proporcionar username o email" });
    }
    const user = yield users_1.User.findOne({ where: whereClause });
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existente`,
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Contraseña incorrecta`,
        });
    }
    const token = jsonwebtoken_1.default.sign({
        email: email
    }, process.env.SECRET_KEY || 'Doomer-@2003');
    res.json({
        token,
        username: user.username,
        id: user.id
    });
});
exports.login = login;
