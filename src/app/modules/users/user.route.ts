import express from 'express'
import { UserController } from './users.controller'

const router = express.Router()

router.get('/:id', UserController.getUserById)

router.get('/', UserController.fetchAllUsers)

export const UserRoutes = router