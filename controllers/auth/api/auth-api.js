import { decodeJwt, signJwt } from "./jwt-maker.js"
import User from "../../../database/models/user/user.js"
import { createUserWithProfile } from "../../../database/models/user/create-user.js"

class Auth {

    login = async (email, password) => {
        try {
            const user = await User.findOne({ where: { email, password } })
            if (!user) {
                return {
                    resultCode: 1,
                    message: 'USER_NOT_FOUND'
                }
            } else {
                return {
                    resultCode: 0,
                    token: signJwt(email, password),
                    message: 'SUCCESS',
                    user
                }
            }
        } catch (err) {
            return {
                resultCode: 0,
                message: 'THERE_IS_SOME_ERROR',
                error: err
            }
        }
    }

    register = async (email, password, firstname, lastname) => {
        try {
            const user = await User.findOne({ 
                where: { 
                    email,
                    password,
                    firstname,
                    lastname
                } 
            })
            if(!user) {
                const { newUser } = createUserWithProfile(email, password, firstname, lastname)
                return {
                    resultCode: 0,
                    message: 'USER_WAS_CREATED',
                    user: newUser,
                    token: signJwt(email, password)
                }
            } else {
                return {
                    resultCode: 1,
                    message: 'USER_EXISTS'
                }
            }
        } catch (err) {
            return {
                resultCode: 1,
                message: 'THERE_IS_SOME_ERROR',
                error: err
            }
        }
    }

    checkMe = async (token) => {
        const user = decodeJwt(token)
        console.log('USER IS ', user)
        const userObject = await User.findOne({where: {
            email: user.email,
            password: user.password
        }})
        console.log(userObject)
        if(userObject) {
            return {
                resultCode: 0,
                user: userObject
            }
        } else {
            return {
                resultCode: 1
            }
        }
    }
}

export default new Auth()