import { Router, Request, Response } from 'express';
import routerScreens from './screens';
import routerLogin from './login';
import { checkJwt } from '../middlewares/checkJWT';


const router = Router();

router.use('/screen', checkJwt, routerScreens);
router.use('/login', routerLogin);

export default router;