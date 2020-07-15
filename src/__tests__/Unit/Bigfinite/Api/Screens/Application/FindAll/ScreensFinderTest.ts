import InMemoryScreenRepository from '../../../../../../../Bigfinite/Api/Screens/Infrastructure/Persistance/InMemory/InMemoryScreenRepository';
import ScreensFinder from '../../../../../../../Bigfinite/Api/Screens/Application/FindAll/ScreensFinder';

const screenRepository = InMemoryScreenRepository;


describe('Screens', () => {
    it('Should found all Screens', async () => {

       const usecase = new ScreensFinder(
           screenRepository
       )
       const result = await usecase.execute();

       expect(result.length).toBeGreaterThan(0);
    })
});