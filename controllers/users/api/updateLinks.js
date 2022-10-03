import { prisma } from "../../../router/router.js"

export const updateLinksApi = async (id, data ) => {
    try {
        const patchLinks = await prisma.links.update({
            where: {
                id: Number(id)
            },
            data
        })
        console.log(patchLinks)
        return patchLinks
    } catch (error) {
        console.error(error)
    }
}
