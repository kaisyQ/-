import { prisma } from "../../../router/router.js"

export const updatePostApi = async (postId, data) => {
    try {
        const post = await prisma.posts.update({
            where: {
                id: Number(postId)
            },
            data
        })
        return post
    } catch (error) {
        console.error(error)
    }
}
