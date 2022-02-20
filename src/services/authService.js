import config from '../config.json'
import httpService from './httpService';
import jwtDecode from 'jwt-decode'

const apiUrl = "/auth"
const tokenKey = 'token'

httpService.setJwt(getJwt())

export async function login(email, password) {
    const { data: jwt } = await httpService.post(apiUrl, { email, password })
    localStorage.setItem(tokenKey, jwt)
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt)
}

export function logout() {
    localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
    const jwt = localStorage.getItem(tokenKey)
    if (jwt) {
        const user = jwtDecode(jwt)
        return user
    }
    return jwt
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    loginWithJwt,
    logout,
    getCurrentUser
}