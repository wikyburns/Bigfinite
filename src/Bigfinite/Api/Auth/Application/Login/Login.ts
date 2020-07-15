import * as jwt from 'jsonwebtoken';
import AuthRepository from '../../Domain/AuthRespository';
import AuthUsername from '../../Domain/AuthUsername';
import AuthPassword from '../../Domain/AuthPassword';

interface LoginRequestDTO {
    username: string,
    password: string
}


class LoginUseCase {
    private repository: AuthRepository;

    constructor(repository: AuthRepository)
    {
        this.repository = repository;
    }

    async execute(requestDTO: LoginRequestDTO)
    {

        const username = new AuthUsername(requestDTO.username);
        const password = new AuthPassword(requestDTO.password);

        const userFound = await this.repository.findByUsername(username);

        const userFoundPassword = userFound.getPassword();

        if (userFound === null) {
            throw new Error('User not found');
        }
        // Compare passwords
        if (!userFoundPassword.checkIfUnencryptedPasswordIsValid(password.getValue()))
            throw new Error('Password not match');

        const token = jwt.sign(
            {
                username: userFound.getUsername().getValue(),
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.EXPIRES_TIME_TOKEN
            }
        );

        return this.toResponse(token);
    }

    private toResponse(token: any) {
        return {
            "token": token,
            "expiresIn": process.env.EXPIRES_TIME_TOKEN
        }

    }
}


export default LoginUseCase;