import express from 'express'
import { MessageController } from './messages.controller'

const router = express.Router()

router.get('/:id', MessageController.fetchUsers)
router.get('/get-message/:id/:receiverId', MessageController.getMessages)
router.post('/send-message/:id/:receiverId', MessageController.sendMessage)

export const MessageRoutes = router