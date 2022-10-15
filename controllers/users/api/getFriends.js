import { prisma } from "../../../router/router.js"

export const getFriendsApi = async (id) => {
    try {
        const usersData = await prisma.profile.findUnique({
            where: {
                id
            },
            select: {
                 follows: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                firstname: true,
                                lastname: true
                            }
                        }
                    }
                }
            }
        })
        return usersData

    } catch (error) {
        console.error(error)
    }
    
}