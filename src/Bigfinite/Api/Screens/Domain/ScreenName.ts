import { Result } from '../../../../Shared/Core/Result';
import { ValueObject } from '../../../../Shared/Core/ValueObject';
import { Guard } from '../../../../Shared/Core/Guard';


interface ScreenNameProps {
    value: string;
}

export const SCREEN_NAME_MIN_CHARS = 2;

class ScreenName extends ValueObject<ScreenNameProps> {

    get value (): string {
      return this.props.value;
    }

    private constructor (props: ScreenNameProps) {
      super(props);
    }

    public static create (name: string): Result<ScreenName> {

      if (!!name === false || name === '') {
        return Result.fail<ScreenName>('Must provide an Screen Name')
      } else if(!Guard.greaterThanChars(SCREEN_NAME_MIN_CHARS, name.length).succeeded){
          return Result.fail<ScreenName>(`Screen Name has to be greather than ${SCREEN_NAME_MIN_CHARS} characters`)
      }

      return Result.ok<ScreenName>(new ScreenName({ value: name }))

    }
}


export default ScreenName;