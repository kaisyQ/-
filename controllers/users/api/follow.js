import { prisma } from "../../../router/router.js"

export const followApi = async (email, toFollowUsId) => {
    try {

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        }) 
        const patchProfileFollower = await prisma.profile.update({
            where: {
                id: Number(user.id)
            },
            include: {
                follows: true
            },
            data: {
                follows: {
                    connect: {
                        id: Number(toFollowUsId)
                    },
                }
            },
        })
        return patchProfileFollower
    } catch (error) {
        console.error(error)
    }
}
