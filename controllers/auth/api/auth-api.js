import { decodeJwt, signJwt } from "./jwt-maker.js"
import { prisma } from '../../../router/router.js'
import { createUserWithProfile } from "../../../model_funcs/user-model/create-user.js"

class Auth {

    login = async (email, password) => {
        try {
            const user = await prisma.user.findFirst({ where: { email, password } })
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
        } catch (error) {
            return {
                resultCode: 0,
                message: 'THERE_IS_SOME_ERROR',
                error
            }
        }
    }

    register = async (email, password, firstname, lastname) => {
        try {

            if (!email || !password || !firstname || !lastname) {
                return {
                    resultCode: 1
                }
            }
            const user = await prisma.user.findFirst({ 
                where: { 
                    email,
                    password,
                    firstname,
                    lastname
                } 
            })
            
            if(!user) {
                const { newUser } = await createUserWithProfile(email, password, firstname, lastname)
                return {
                    resultCode: 0,
                    message: 'USER_WAS_CREATED',
                    newUser,
                    token: signJwt(email, password)
                }
            } else {
                return {
                    resultCode: 1,
                    message: 'USER_EXISTS'
                }
            }
        } catch (error) {
            return {
                resultCode: 1,
                message: 'THERE_IS_SOME_ERROR',
                error
            }
        }
    
    }

    checkMe = async (token) => {
        const user = decodeJwt(token)
        const userObject = await prisma.user.findFirst({where: {
            email: user.email,
            password: user.password
        }})
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