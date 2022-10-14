import { prisma } from '../../router/router.js'

export const createUserWithProfile = async (
     email, password, firstname, lastname
 ) => {
    try {
        const user = await prisma.user.create({
            data: {
                email, password, firstname, lastname,
                profile: {
                    create: {
                        status: 'newUserWithProfileDone',
                        links: {
                            create: {
                                vk: 'newUserWithProfileAndLinksDone'
                            }
                        }
                    }
                }
            }
        })
        return {
            newUser: user, 
            resultCode: 0
        }
    } catch(error) {
        console.error(error)
    }
}