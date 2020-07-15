import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, OK, NOT_FOUND, UNAUTHORIZED, BAD_REQUEST } from 'http-status-codes';
import LoginUseCase from '../../../Bigfinite/Api/Auth/Application/Login/Login';
import DynamoDbAuthRepository from '../../../Bigfinite/Api/Auth/Infrastructure/Persistance/DynamoDbAuthRepository';
import * as Joi from 'joi';


class LoginPostController {

    constructor() {
        this.execute = this.execute.bind(this);
    }

    async execute(req: Request, res: Response) {

        let validated = true;

        // Validate body
        const bodySchema = Joi.object({
          username: Joi.string().min(2),
          password: Joi.string().min(6)
        });

        // Validating the body request.
        bodySchema.validate(req.body, (err, value) => {
          if (err) {
            validated = false;

            return res.status(BAD_REQUEST).json({
              validationError: {
                message: err.details[0].message,
                path: err.details[0].path
              }
            });
          }
        });

        if (validated) {

            try {
                const usecase = new LoginUseCase(
                    DynamoDbAuthRepository
                );

                const token = await usecase.execute(req.body);

                // Send the jwt in the response
                res.status(OK).json(token);

            }
            catch (error) {

                if (error.message === 'User not found') {
                    return res.sendStatus(UNAUTHORIZED);
                }

                if (error.message === 'Password not match') {
                    return res.sendStatus(UNAUTHORIZED);
                }

                res.status(BAD_REQUEST).json({
                    status: BAD_REQUEST,
                    message: error.message
                });

            }
        }
    }
}

export default new LoginPostController();