"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.post("/api/user/register", users_1.register);
router.post("/api/user/login", users_1.login);
exports.default = router;
