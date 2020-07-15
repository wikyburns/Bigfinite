import { Router, Request, Response } from 'express';
import LoginPostController from '../Controllers/BigfiniteApi/Auth/LoginPostController';

const routerLogin = Router();

routerLogin.post('/', LoginPostController.execute);

export default routerLogin;