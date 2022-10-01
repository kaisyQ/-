import { getCookie } from "../cookie/cookie-check.js"
import authApi from "./api/auth-api.js"


export const login = async (req, res, next) => {
    const { email, password } = req.body
    const responseData = await authApi.login(email, password)

    if (responseData.error) {
        res
            .status(501)
            .statusText('Query error')
            next()
    }
    if (responseData.resultCode === 0) {
        res
            .status(200)
            .statusText('success')
            .json({
                user: responseData.user,
                token: responseData.token
            })
    } else {
        res
            .status(400)
            .statusText('bad request')
    }

}

export const register = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body
    const responseData = await authApi.register(email, password, firstName, lastName)
    if (responseData.resultCode === 0) {
        res
            .status(200)
            .json(JSON.stringify({
                user: responseData.user,
                token: responseData.token
            }))
    } else {
        if (responseData.error) {
            res
                .status(501)
            next()
        }
            res
                .status(400)
                .status(responseData.message)
    }
}

export const checkMe = async (req, res) => {
    const token = getCookie(req)
    if (token) {
        const responseData = await authApi.checkMe(token)
        if (responseData.resultCode === 0) {
            res
                .json(JSON.stringify(responseData))
                .status(200)
        } else {
            res
                .status(401)
        }

    } else {
        res
            .status(401)
    }
}