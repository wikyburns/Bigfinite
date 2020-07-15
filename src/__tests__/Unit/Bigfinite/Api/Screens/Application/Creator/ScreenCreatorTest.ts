import ScreenCreator from '../../../../../../../Bigfinite/Api/Screens/Application/Creator/ScreenCreator';
import ScreenName from '../../../../../../../Bigfinite/Api/Screens/Domain/ScreenName';
import InMemoryScreenRepository from '../../../../../../../Bigfinite/Api/Screens/Infrastructure/Persistance/InMemory/InMemoryScreenRepository';
import { SCREEN_NAME_MIN_CHARS } from '../../../../../../../Bigfinite/Api/Screens/Domain/ScreenName';

const screenRepository = InMemoryScreenRepository;


describe('Screens', () => {
    it('Should create an Screen', async () => {

        const usecase = new ScreenCreator(screenRepository);

        const requestDTO = {
            name: ScreenName.create('Testing screen').getValue()
        }

        const result = await usecase.execute(requestDTO);

        expect(result.isSuccess).toBeTruthy();
    })

    it('Should throw Must provide an Screen Name', async() => {
        const usecase = new ScreenCreator(screenRepository);

        const name = ScreenName.create('');

        expect(name.errorValue()).toBe('Must provide an Screen Name');

    })

    it(`Should Screen Name has to be greather than ${SCREEN_NAME_MIN_CHARS} characters`, async() => {
        const usecase = new ScreenCreator(screenRepository);

        const name = ScreenName.create('a');

        expect(name.errorValue()).toBe(`Screen Name has to be greather than ${SCREEN_NAME_MIN_CHARS} characters`);

    })

});