"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/users/user.route");
const forms_route_1 = require("../modules/forms/forms.route");
const messages_route_1 = require("../modules/messages/messages.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes
    },
    {
        path: '/form',
        route: forms_route_1.FormRoutes
    },
    {
        path: '/user',
        route: user_route_1.UserRoutes
    },
    {
        path: '/message',
        route: messages_route_1.MessageRoutes
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
