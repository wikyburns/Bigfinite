import Screen from '../Domain/Screen';
import ScreenName from '../Domain/ScreenName';


class ScreenMap
{
    public static toDomain(raw: any): Screen {

        const screenOrError = Screen.create({
            name: ScreenName.create(raw.name).getValue()
        }, raw._id);

        // // tslint:disable-next-line:no-console
        // screenOrError.isFailure ? console.log(screenOrError.error) : '';

        return screenOrError.isSuccess ? screenOrError.getValue() : null;
    }

    public static toPersistence(screen: Screen): any {
        return {
            _id: screen.id().toString(),
            name: screen.props.name.value
        }
    }

    public static toResponse(screen: Screen): any {
        return {
            id: screen.id().toString(),
            name: screen.props.name.value
        }
    }

}

export default ScreenMap;
