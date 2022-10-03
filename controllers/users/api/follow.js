import { prisma } from "../../../router/router.js"

export const followApi = async (followerId, followedId) => {
    try {
        const patchProfileFollower = await prisma.profile.update({
            where: {
                id: Number(followerId)
            },
            include: {
                follows: true
            },
            data: {
                follows: {
                    connect: {
                        id: Number(followedId)
                    },
                }
            },
        })
        return patchProfileFollower
    } catch (error) {
        console.error(error)
    }
}
