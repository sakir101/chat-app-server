"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const messages_controller_1 = require("./messages.controller");
const router = express_1.default.Router();
router.get('/:id', messages_controller_1.MessageController.fetchUsers);
router.get('/get-message/:id/:receiverId', messages_controller_1.MessageController.getMessages);
router.post('/send-message/:id/:receiverId', messages_controller_1.MessageController.sendMessage);
exports.MessageRoutes = router;
