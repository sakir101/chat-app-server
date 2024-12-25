import express from 'express';

import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/users/user.route';
import { FormRoutes } from '../modules/forms/forms.route';
import { MessageRoutes } from '../modules/messages/messages.route';







const router = express.Router();

const moduleRoutes = [

    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/form',
        route: FormRoutes
    },
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/message',
        route: MessageRoutes
    },




]
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

