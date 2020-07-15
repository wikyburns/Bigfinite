import ScreenName from '../../Domain/ScreenName';
import { Result } from '../../../../../Shared/Core/Result';
import Screen from '../../Domain/Screen';
import { UniqueEntityID } from '../../../../../Core/Domain/UniqueEntityID';
import { ScreenRepository } from '../../Domain/ScreenRepository';


interface ScreenCreatorRequestDTO {
    name: ScreenName;
}

class ScreenCreator {

    private screenRepository: ScreenRepository;

    constructor(screenRepository: ScreenRepository)
    {
        this.screenRepository = screenRepository;
    }

    async execute(request: ScreenCreatorRequestDTO): Promise<Result<Screen>>
    {
        const uuid = new UniqueEntityID();

        const screen = Screen.create({...request}, uuid)

        if(screen.isFailure)
            return Result.fail<Screen>(screen.error.toString());
        else {
            const patientCreated = await this.screenRepository.create(screen.getValue());

            return Result.ok<Screen>(patientCreated);
        }
    }
}

export default ScreenCreator;