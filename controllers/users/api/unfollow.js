import { prisma } from "../../../router/router.js"

export const unfollowApi = async (email, toUnfollowUsId) => {
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
                    disconnect: {
                        id: Number(toUnfollowUsId)
                    },
                }
            },
        })
        return patchProfileFollower
    } catch (error) {
        console.error(error)
    }
}
