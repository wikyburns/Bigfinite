import AuthUsername from './AuthUsername';
import Auth from './Auth';


interface AuthRepository {
    findByUsername(username: AuthUsername): Promise<Auth>;
}

export default AuthRepository;