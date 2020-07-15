import { ScreenRepository } from '../../../Domain/ScreenRepository';
import Screen from '../../../Domain/Screen';
import { UniqueEntityID } from '../../../../../../Core/Domain/UniqueEntityID';
import { DynamoDB } from 'aws-sdk';
import ScreenMap from '../../ScreenMap';


const SCREENS_TABLE = 'Screens';


class DynamoDBScreenRepository implements ScreenRepository
{
    async create(screen: Screen): Promise<Screen>
    {
        const ScreenDB = new DynamoDB.DocumentClient();

        const params = {
            TableName:SCREENS_TABLE,
            Item: ScreenMap.toPersistence(screen)
        };

        try {
            await ScreenDB.put(params).promise();
        } catch (error) {
            throw Error('Error trying to save in Screens table. ' + error);
        }

        return screen;
    }

    async findById(id: UniqueEntityID): Promise<Screen>
    {
        const ScreenDB = await new DynamoDB.DocumentClient();
        let screen: Screen;

        const params = {
            TableName:SCREENS_TABLE,
            Key: {
                "_id": id.toString()
            }
        }

        try {

            const screenFound = await ScreenDB.get(params).promise();

            if(screenFound.Item)
                screen = ScreenMap.toDomain(screenFound.Item);


        } catch (error) {
            throw Error('Error trying to save in Screens table. ' + error);
        }

        return screen;
    }

    async remove(id: UniqueEntityID): Promise<boolean>
    {
        return true;
    }

    async findAll(): Promise<Screen[]>
    {
        const ScreenDB = await new DynamoDB.DocumentClient();
        const screens: Screen[] = [];

        const params = {
            TableName:SCREENS_TABLE
        }

        try {

            const screeens = await ScreenDB.scan(params).promise();

            screeens.Items.map( (screen: any) => {
                screens.push(ScreenMap.toDomain(screen));
            })


        } catch (error) {
            throw Error('Error trying to save in Screens table. ' + error);
        }

        return screens;
    }
}

export default new DynamoDBScreenRepository();