import Auth from '../Domain/Auth';
import AuthUsername from '../Domain/AuthUsername';
import AuthPassword from '../Domain/AuthPassword';

class AuthMap
{
    public static toDomain(raw: any): Auth {

        const authOrError = Auth.create(
            new AuthUsername(raw.username),
            new AuthPassword(raw.password)
        );

       return authOrError;
    }
}

export default AuthMap;
