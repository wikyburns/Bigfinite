import StringValueObject from '../../../../shared/Domain/ValueObjects/StringValueObject';

class AuthUsername extends StringValueObject
{
    constructor(username: string)
    {
        super(username);
        this.isGreaterThanTwoCharacthers();
    }

    private isGreaterThanTwoCharacthers()
    {
        if(this.getValue().length < 2 )
        {
            throw new Error('AuthUsername must be greater than 2 chars')
        }
    }
}

export default AuthUsername;