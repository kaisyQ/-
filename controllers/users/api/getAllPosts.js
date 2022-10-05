import { prisma } from "../../../router/router.js"

export const getAllPostsApi = async (pageSize, pageNumber) => {
    try {
        const posts = await prisma.posts.findMany({
            include: {
                profile: true
            }
        })
        return posts.slice(((pageNumber-1)*pageSize), pageNumber*pageSize+1)
    } catch (error) {
        console.error(error)
    }
    
}