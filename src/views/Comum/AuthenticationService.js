import axios from 'axios'
import { URL_API } from '../Comum/Constantes'

export const TOKEN_SESSION_ATTRIBUTE_NAME = 'token'
export const EXPIRATION_SESSION_ATTRIBUTE_NAME = 'expiration'

class AuthenticationService {

    isUserLoggedIn() {

        let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    isTokenExpired() {
        
        let expiration = localStorage.getItem(EXPIRATION_SESSION_ATTRIBUTE_NAME)
        return expiration === null || expiration < new Date().getTime()
    }

    executeJwtAuthenticationService(email, senha) {

        let authenticationRequest = {
            username: email,
            password: senha
        }

        return axios.post(URL_API + '/api/login/signin', authenticationRequest)
    }

    registerSuccessfulLoginForJwt(token, expiration) {

        localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token)
        localStorage.setItem(EXPIRATION_SESSION_ATTRIBUTE_NAME, expiration)

        this.setupAxiosInterceptors()
    }

    setupAxiosInterceptors() {

        let token = this.createJWTToken(localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME))

        if (this.isUserLoggedIn()) {
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    getToken() {
        let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME)
        if (token === null) return ''
        return token
    }
    
    logout() {
        localStorage.clear() 
        delete axios.defaults.headers.common['Authorization'];
    }

}

export default new AuthenticationService()