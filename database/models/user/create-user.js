import { Links } from "./profile/links/links.js"
import { Profile } from "./profile/profile.js"
import User from "./user.js"

export const createUserWithProfile = async (
    email, password, firstName, lastName
) => {
    try {
        const newUserId = (await User.findAll()).length + 1
        await Links.create({id: newUserId})
        await Profile.create({id: newUserId, linksId: newUserId})
        const user = await User.create({
            id: newUserId,
            email, password, firstName, lastName,
            profileId: newUserId
        })
        return {
            user: user.toJSON(), 
            resultCode: 0
        }
    } catch(err) {
        console.error(err)
    }
}