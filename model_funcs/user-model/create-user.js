import { prisma } from '../../router/router.js'

export const createUserWithProfile = async (
     email, password, firstname, lastname
 ) => {
    try {
        const newData = (await prisma.user.findMany()).length + 1
        console.log(newData)
        const newUserData = String(newData)
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
            user: JSON.stringify(user), 
            resultCode: 0
        }
    } catch(error) {
        console.error(error)
    }
}