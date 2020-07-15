import StringValueObject from '../../../../shared/Domain/ValueObjects/StringValueObject';
import * as bcrypt from 'bcrypt';

class AuthPassword extends StringValueObject
{
    constructor(password: string)
    {
        super(password);
        this.isGreaterThanTwoCharacthers();
    }

    private isGreaterThanTwoCharacthers()
    {
        if(this.getValue().length < 2 ){
            throw new Error('AuthPassword must be greater than 2 chars');
        }
    }

    equals(password: string): boolean
    {
        if( this.getValue() === password ){
            return true;
        }

        return false;
    }

    hash() {
        this.value = bcrypt.hashSync(this.value, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.getValue());
    }

}

export default AuthPassword;