import { prisma } from "../../../router/router.js"

export const updateProfileApi = async (email, data) => {

    const dataToProfile = {
        aboutMe: data.aboutMe,
        aboutMyJob: data.aboutMyJob
    }

    const dataToLinks = {
        vk: data.vk,
        facebook: data.facebook,
        twitter: data.twitter
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        const patchProfile = await prisma.profile.update({
            where: {
                id: Number(user.id)
            },
            data: dataToProfile
        })

        const patchLinks = await prisma.links.update({
            where: {
                id : Number(user.id)
            },
            data: dataToLinks
        })
        return { patchProfile, patchLinks }
    } catch (error) {
        console.error(error)
    }
}


