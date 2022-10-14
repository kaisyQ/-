import { getCookie } from "../cookie/cookie-check.js"
import authApi from "./api/auth-api.js"


export const login = async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body
    console.log( {email, password })
    const responseData = await authApi.login(email, password)
    console.log(responseData)
    if (responseData.error) {
        res
            .json({ resultCode: 1 })
            .status(501)
            next()
    }
    if (responseData.resultCode === 0) {
        res
            .status(200)
            .json({
                user: responseData.user,
                token: responseData.token,
                resultCode: 0
            })
    } else {
        res
            .json({ resultCode: 1 })
            .status(400)
    }

}

export const register = async (req, res, next) => {
    const { email, password, firstname, lastname } = req.body
    const responseData = await authApi.register(email, password, firstname, lastname)
    if (responseData.resultCode === 0) {
        res
            .status(200)
            .json(JSON.stringify({
                user: responseData.newUser,
                token: responseData.token,
                resultCode: 0
            }))
    } else {
        if (responseData.error) {
            res
                .json({ resultCode: 1 })
                .status(501)
            next()
        }
            res
                .status(400)
                .json({ resultCode: 1 })
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
                .json(JSON.stringify(responseData))
                .status(401)
        }

    } else {
        res
            .json(JSON.stringify({ resultCode: 1}))
            .status(401)
    }
}

