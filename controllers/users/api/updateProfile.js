import { prisma } from "../../../router/router.js"

export const updateProfileApi = async (id, data) => {
    try {
        const patchProfile = await prisma.profile.update({
            where: {
                id: Number(id)
            },
            data
        })
        return patchProfile
    } catch (error) {
        console.error(error)
    }
}
