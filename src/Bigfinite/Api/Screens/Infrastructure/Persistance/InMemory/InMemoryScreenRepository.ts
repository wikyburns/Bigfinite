import { ScreenRepository } from "../../../Domain/ScreenRepository";
import Screen from '../../../Domain/Screen';
import { UniqueEntityID } from '../../../../../../Core/Domain/UniqueEntityID';
import ScreenMap from '../../ScreenMap';



class DynamoDBScreenRepository implements ScreenRepository
{
    private DB: any[] = [
        {
            "_id": "899a5439-4af6-41d1-8adb-d3e8aa7e05e0",
            "name": "Screen1"
        },
        {
            "_id": "899a5439-4af6-41d1-8adb-d3e8aa7e05e2",
            "name": "Screen 2"
        },
        {
            "_id": "899a5439-4af6-41d1-8adb-d3e8aa7e05e3",
            "name": "Screen 3"
        }
    ];

    async create(screen: Screen): Promise<Screen>
    {
        return screen;
    }

    async findAll(): Promise<Screen[]>
    {
        return this.DB.map((screen: any) => {
            return ScreenMap.toDomain(screen)
        })
    }

    async findById(id: UniqueEntityID): Promise<Screen>
    {
        let screen = null;

        this.DB.map((screenDB: any) => {
            if(screenDB._id === id.toString()){
                screen =  ScreenMap.toDomain(screenDB)
            }
        })

        return screen;
    }

    async remove(id: UniqueEntityID): Promise<boolean>
    {
        return true;
    }
}


export default new DynamoDBScreenRepository();