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
exports.getProducts = exports.registerProduct = void 0;
const products_1 = require("../models/products");
const registerProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    products_1.Product.create({
        name: name,
        description: description,
        status: 1,
    });
    res.json({
        msg: `Product ${name} create success...`
    });
});
exports.registerProduct = registerProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield products_1.Product.findAll();
    res.json({ listProducts });
});
exports.getProducts = getProducts;
