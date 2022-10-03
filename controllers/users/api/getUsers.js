import { prisma } from "../../../router/router.js"

export const getUsersApi = async (pageSize, pageNumber) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                profile: true
            }
        })
        const renewedUsers = users.map(user => JSON.stringify({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            status: user.profile.status ? user.profile.status : 'Пользователь немногословен'
        }))
        return renewedUsers.slice(((pageNumber-1)*pageSize), pageNumber*pageSize+1)
    } catch (error) {
        console.error(error)
    }
    
}