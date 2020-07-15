import { Request, Response } from "express";
import DynamoDBScreenRepository from '../../../../Bigfinite/Api/Screens/Infrastructure/Persistance/DynamoDb/DynamoDBScreenRepository';
import { INTERNAL_SERVER_ERROR, OK, NOT_FOUND } from 'http-status-codes';
import ScreenFinder from '../../../../Bigfinite/Api/Screens/Application/Find/ScreenFinder';
import { UniqueEntityID } from '../../../../Core/Domain/UniqueEntityID';
import ScreenMap from '../../../../Bigfinite/Api/Screens/Infrastructure/ScreenMap';

class ScreenFindByIdGetController {

    constructor() {
        this.execute = this.execute.bind(this);
    }

    async execute(req: Request, res: Response) {

        try {

            const usecase = new ScreenFinder(
                DynamoDBScreenRepository
            );

            const requestDTO = {
                id: new UniqueEntityID(req.params.id)
            }

            const screenFound = await usecase.execute(requestDTO);

            if(!screenFound)
                return res.status(NOT_FOUND).send();

            return res.status(OK).json({
                screen: ScreenMap.toResponse(screenFound)
            });

        } catch (error) {
            // tslint:disable-next-line:no-console

            if (error.message === 'Screen not found') {
                return res.sendStatus(NOT_FOUND);
            }

            return res.status(INTERNAL_SERVER_ERROR).send();
        }

    };
}

export default new ScreenFindByIdGetController();