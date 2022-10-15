import { prisma } from "../../../router/router.js"

const PAGE_SIZE = 10

export const getUsersApi = async (pageNumber, id) => {
    try {
        const usersData = await prisma.profile.findMany({
            select: {
                id: true,
                status: true,
                followedBy: true,
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true,
                        email: true
                    }
                }
            }
        })

        const isFollowing = []

        for (let i = 0; i < usersData.length; i++) {
            let following = false
            if (usersData[i].followedBy) {
                for (let j = 0; j < usersData[i].followedBy.length; j++) {
                    if (id === usersData[i].followedBy[j].id) {
                        following = true
                        break
                    }
                }
            }
            isFollowing.push(following)
        }

        const renewedUsers = usersData.map((userData, index) => ({
            id: userData.user.id,
            firstname: userData.user.firstname,
            lastname: userData.user.lastname,
            email: userData.user.email,
            status: userData.status ? userData.status : 'Пользователь немногословен',
            isFollowed: isFollowing[index]
        }))

        return renewedUsers.slice(((pageNumber-1)*PAGE_SIZE), pageNumber*PAGE_SIZE+1)
    } catch (error) {
        console.error(error)
    }
    
}