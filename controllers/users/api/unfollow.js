import { prisma } from "../../../router/router.js"

export const unfollowApi = async (unfollowerId, unfollowedId) => {
    try {
        const patchProfileFollower = await prisma.profile.update({
            where: {
                id: Number(unfollowerId)
            },
            include: {
                follows: true
            },
            data: {
                follows: {
                    disconnect: {
                        id: Number(unfollowedId)
                    },
                }
            },
        })
        return patchProfileFollower
    } catch (error) {
        console.error(error)
    }
}
