import { Request, Response } from "express";
import ScreenCreator from '../../../../Bigfinite/Api/Screens/Application/Creator/ScreenCreator';
import ScreenName from '../../../../Bigfinite/Api/Screens/Domain/ScreenName';
import DynamoDBScreenRepository from '../../../../Bigfinite/Api/Screens/Infrastructure/Persistance/DynamoDb/DynamoDBScreenRepository';

import { INTERNAL_SERVER_ERROR, OK } from 'http-status-codes';
import ScreenFinder from '../../../../Bigfinite/Api/Screens/Application/FindAll/ScreensFinder';
import ScreenMap from '../../../../Bigfinite/Api/Screens/Infrastructure/ScreenMap';

class ScreenFindAllGetController {

    constructor() {
        this.execute = this.execute.bind(this);
    }

    async execute(req: Request, res: Response) {

        try {

            const usecase = new ScreenFinder(
                DynamoDBScreenRepository
            );

            const screenCreated = await usecase.execute();

            return res.status(OK).json({
                screens: screenCreated.map((screen) => {
                    return ScreenMap.toResponse(screen);
                })
            });

        } catch (error) {
            // tslint:disable-next-line:no-console
            console.log(error);
            return res.status(INTERNAL_SERVER_ERROR).send();
        }

    };
}

export default new ScreenFindAllGetController();