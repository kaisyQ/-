import { prisma } from "../../../router/router.js"

export const updateProfileApi = async (id, data ) => {
    try {
        const patchProfile = await prisma.profile.update({
            where: {
                id: Number(id)
            },
            data
        })
        console.log(patchProfile)
        return patchProfile
    } catch (error) {
        console.error(error)
    }
}
