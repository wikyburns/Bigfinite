import ScreenName from './ScreenName';

import { Entity } from '../../../../Core/Domain/Entity';
import { Result } from '../../../../Shared/Core/Result';
import { Guard } from '../../../../Shared/Core/Guard';
import { UniqueEntityID } from '../../../../Core/Domain/UniqueEntityID';

interface ScreenProps {
    name: ScreenName
}

class Screen extends Entity<ScreenProps>
{
    private constructor(props: ScreenProps, _id?: UniqueEntityID) {
        super(props, _id);
    }

    static create(props: ScreenProps, id?: UniqueEntityID): Result<Screen> {

        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' }
        ]);

        if (!guardResult.succeeded) {
            return Result.fail<Screen>(guardResult.message)
        } else {
            return Result.ok<Screen>(new Screen({
                ...props
            }, id));
        }
    }
}

export default Screen;