import { prisma } from "../../../router/router.js"

export const getProfilePostApi = async (postId) => {
    try {
        const posts = await prisma.posts.findUnique({
            where: {
                id: Number(postId)
            }
        })
        return posts
    } catch (error) {
        console.error(error)
    }
    
}