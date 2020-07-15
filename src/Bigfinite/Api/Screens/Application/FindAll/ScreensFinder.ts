import Screen from '../../Domain/Screen';
import { ScreenRepository } from '../../Domain/ScreenRepository';

class ScreensFinder {

    private screenRepository: ScreenRepository;

    constructor(screenRepository: ScreenRepository)
    {
        this.screenRepository = screenRepository;
    }

    async execute(): Promise<Screen[]>
    {
        const screens = await this.screenRepository.findAll();

        return screens;
    }
}

export default ScreensFinder;