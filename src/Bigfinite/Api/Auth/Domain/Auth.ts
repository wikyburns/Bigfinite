import AuthUsername from './AuthUsername';
import AuthPassword from './AuthPassword';
import * as bcrypt from 'bcrypt';


class Auth {
    private username: AuthUsername;
    private password: AuthPassword;

    private constructor(username: AuthUsername, passoword: AuthPassword)
    {
        this.username = username;
        this.password = passoword;
    }

    public static create(username: AuthUsername, password: AuthPassword): Auth
    {
        const auth = new Auth(username, password);

        return auth;
    }

    getUsername(): AuthUsername
    {
        return this.username;
    }

    getPassword(): AuthPassword
    {
        return this.password;
    }

    validUnencryptedPassword(unencryptedPassword: any): boolean
    {
        return bcrypt.compareSync(unencryptedPassword, this.password.getValue());
    }

}

export default Auth;