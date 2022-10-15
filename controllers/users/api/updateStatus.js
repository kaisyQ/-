import { prisma } from "../../../router/router.js"

export const updateStatusApi = async (email, data) => {

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
            data
        })
        return patchProfile
    } catch (error) {
        console.error(error)
    }
}


