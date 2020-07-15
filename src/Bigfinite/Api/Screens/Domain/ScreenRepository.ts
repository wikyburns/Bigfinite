import Screen from './Screen';
import { UniqueEntityID } from '../../../../Core/Domain/UniqueEntityID';

export interface ScreenRepository {
    create(screen: Screen): Promise<Screen>
    findById(id: UniqueEntityID): Promise<Screen>
    remove(id: UniqueEntityID): Promise<boolean>
    findAll(): Promise<Screen[]>
}