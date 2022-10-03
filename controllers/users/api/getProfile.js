import { prisma } from "../../../router/router.js"

export const getProfileApi = async (id) => {
    try {
        const profiles = await prisma.profile.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                followedBy: true,
                follows: true,
                links: true
            }
        })
        console.log(profiles.followedBy)
        const renewedProfiles = JSON.stringify({
            id: profiles.id,
            status: profiles.status,
            aboutMe: profiles.aboutMe,
            aboutMyJob: profiles.aboutMyJob,
            followedBy:  profiles.followedBy ? profiles.followedBy.map(f => ({
                id: f.id
            }))  : 'Пользователь одинок словно волк',
            follows: profiles.follows ? profiles.follows.map(f => ({
                id: f.id
            }))  : 'Пользователь принимает одиночество',
            userId: profiles.userId,
            links: profiles.links ? profiles.links : 'Пользователь не развращен интернетом'
        })
        return renewedProfiles
    } catch (error) {
        console.error(error)
    }
}
