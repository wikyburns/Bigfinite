import { Router, Request, Response } from 'express';
import ScreenCreatePostController from '../Controllers/BigfiniteApi/Screens/Create/ScreenCreatePostController';
import ScreenFindAllGetController from '../Controllers/BigfiniteApi/Screens/FindAll/ScreenFindAllGetController';
import ScreenFindByIdGetController from '../Controllers/BigfiniteApi/Screens/FindById/ScreenFindByIdGetController';

const routerScreens = Router();

routerScreens.post('/', ScreenCreatePostController.execute);
routerScreens.get('/', ScreenFindAllGetController.execute);
routerScreens.get('/:id', ScreenFindByIdGetController.execute);

export default routerScreens;