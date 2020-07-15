import Screen from '../../Domain/Screen';
import { UniqueEntityID } from '../../../../../Core/Domain/UniqueEntityID';
import { ScreenRepository } from '../../Domain/ScreenRepository';

export interface ScreenFindByIdRequestDTO {
    id: UniqueEntityID;
}

class ScreenFinder {

    private screenRepository: ScreenRepository;

    constructor(screenRepository: ScreenRepository)
    {
        this.screenRepository = screenRepository;
    }

    async execute(request: ScreenFindByIdRequestDTO): Promise<Screen>
    {
        const screen = await this.screenRepository.findById(request.id);

        if(!screen)
            throw Error('Screen not found');

        return screen;
    }
}

export default ScreenFinder;