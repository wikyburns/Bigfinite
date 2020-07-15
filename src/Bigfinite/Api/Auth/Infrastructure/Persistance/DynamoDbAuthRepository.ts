import AuthRepository from '../../Domain/AuthRespository';
import AuthUsername from '../../Domain/AuthUsername';
import { DynamoDB } from 'aws-sdk';
import Auth from '../../Domain/Auth';
import AuthMap from '../AuthMap';

const AUTH_TABLE = 'Users';

class DynamoDbAuthRepository implements AuthRepository {

    async findByUsername(username: AuthUsername): Promise<Auth>
    {

        const DB = await new DynamoDB.DocumentClient();
        let auth: Auth;

        const params = {
            TableName:AUTH_TABLE,
            FilterExpression : "username = :a",
            ExpressionAttributeValues: {
                ":a": username.getValue()
            }
        }

        try {

            const usernameFound = await DB.scan(params).promise();

            if(usernameFound.Items)
                auth = AuthMap.toDomain(usernameFound.Items[0]);


        } catch (error) {
            throw Error('Error trying to save in Users table. ' + error);
        }

        return auth;
    }
}

export default new DynamoDbAuthRepository();