import { Request, Response } from "express";
import ScreenCreator from '../../../../Bigfinite/Api/Screens/Application/Creator/ScreenCreator';
import ScreenName from '../../../../Bigfinite/Api/Screens/Domain/ScreenName';
import DynamoDBScreenRepository from '../../../../Bigfinite/Api/Screens/Infrastructure/Persistance/DynamoDb/DynamoDBScreenRepository';

import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from 'http-status-codes';

class ScreenCreatePostController {

    constructor() {
        this.execute = this.execute.bind(this);
    }

    async execute(req: Request, res: Response) {

        try {

            const usecase = new ScreenCreator(
                DynamoDBScreenRepository
            );

            const name = ScreenName.create(req.body.name);
            if (name.isFailure)
                return res.status(BAD_REQUEST).json({ error: name.errorValue().toString() });

            const screenCreated = await usecase.execute({name: name.getValue()});

            return res.status(CREATED).json({
                _id: screenCreated.getValue().id().toString()
            });

        } catch (error) {
            return res.status(INTERNAL_SERVER_ERROR).json(error.message);
        }

    };
}

export default new ScreenCreatePostController();