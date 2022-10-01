import { signJwt } from "./jwt-maker"
import User from "../models/user"

class Auth {

    signIn = async (email, password) => {
        try {
            const user = await User.findAll({ where: { email, password } })
            if (!user) {
                return JSON.stringify({
                    resultCode: 1,
                    message: 'USER_NOT_FOUND'
                })
            } else {
                return JSON.stringify({
                    resultCode: 0,
                    token: signJwt(email, password),
                    message: 'SUCCESS',
                    user
                })
            }
        } catch (err) {
            return JSON.stringify({
                resultCode: 0,
                message: 'THERE_IS_SOME_ERROR',
                error: err
            })
        }
    }

    signUp = async (email, password, firstname, lastname) => {
        try {
            const user = await User.findAll({ 
                where: { 
                    email,
                    password,
                    firstname,
                    lastname
                } 
            })
            if(!user) {
                const newUser = await User.create({ email, password, firstname, lastname })
                // createUserWithProfile
                return JSON.stringify({
                    resultCode: 0,
                    message: 'USER_WAS_CREATED',
                    user: newUser.toJSON(),
                    token: signJwt(email, password)
                })
            } else {
                return JSON.stringify({
                    resultCode: 1,
                    message: 'USER_EXISTS'
                })
            }
        } catch (err) {
            return JSON.stringify({
                resultCode: 1,
                message: 'THERE_IS_SOME_ERROR',
                error: err
            })
        }
    }

    checkMe = () => {
        
    }
}

export default new Auth()