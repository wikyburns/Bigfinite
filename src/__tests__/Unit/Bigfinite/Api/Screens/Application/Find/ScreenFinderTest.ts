import InMemoryScreenRepository from '../../../../../../../Bigfinite/Api/Screens/Infrastructure/Persistance/InMemory/InMemoryScreenRepository';
import ScreenFinder from '../../../../../../../Bigfinite/Api/Screens/Application/Find/ScreenFinder';
import { UniqueEntityID } from '../../../../../../../Core/Domain/UniqueEntityID';

const screenRepository = InMemoryScreenRepository;


describe('Screens', () => {
    it('Should found a Screen', async () => {

       const usecase = new ScreenFinder(
           screenRepository
       )

       const idToFind = new UniqueEntityID('899a5439-4af6-41d1-8adb-d3e8aa7e05e0');

       const result = await usecase.execute({id: idToFind})

       expect(result.id()).toBe(idToFind.toString());
    })

    it('Should throw Screen not found', async () => {
        const usecase = new ScreenFinder(
            screenRepository
        )

        const idToFind = new UniqueEntityID('111111111111111111111111');

        await expect(usecase.execute({id: idToFind})).rejects.toThrowError('Screen not found');
    })

});