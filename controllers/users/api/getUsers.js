import { prisma } from "../../../router/router.js"

const PAGE_SIZE = 10

export const getUsersApi = async (pageNumber) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                profile: true
            }
        })
        const renewedUsers = users.map(user => ({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            status: user.profile.status ? user.profile.status : 'Пользователь немногословен'
        }))
        return renewedUsers.slice(((pageNumber-1)*PAGE_SIZE), pageNumber*PAGE_SIZE+1)
    } catch (error) {
        console.error(error)
    }
    
}