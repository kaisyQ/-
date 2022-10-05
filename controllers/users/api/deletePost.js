import { prisma } from "../../../router/router.js"

export const deletePostApi = async (postId) => {
    try {
        const post = await prisma.posts.delete({
            where: {
                id: Number(postId)
            }
        })
        return post
    } catch (error) {
        console.error(error)
    }
}
