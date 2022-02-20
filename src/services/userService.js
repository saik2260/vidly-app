import config from '../config.json'
import httpService from './httpService';

const apiUrl = "/users"

export function register(user) {
    return httpService.post(apiUrl,
        {
            email: user.username,
            password: user.password,
            name: user.name
        }
    )
}