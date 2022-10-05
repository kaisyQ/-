import { prisma } from "../../../router/router.js"

export const createPostApi = async (id, text) => {
    try {
        const profiles = await prisma.profile.findUnique({
            where: {
                id: Number(id)
            }
        })
        const post = await prisma.posts.create({
            data: {
                text,
                profile: {
                    connect: {
                        id: Number(id)
                    }
                }
            }
        })
        return post
    } catch (error) {
        console.error(error)
    }
}
