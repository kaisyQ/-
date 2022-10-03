import { getUsersApi } from "../users/api/getUsers.js"
import { getProfileApi } from "../users/api/getProfile.js"
import { updateProfileApi} from "./api/updateProfile.js"
import { updateLinksApi } from "./api/updateLinks.js"
import { followApi } from "./api/follow.js"
import { unfollowApi } from "./api/unfollow.js"

export const getUsers = async (req, res) => {
    const { pageSize, pageNumber } = req.params
    const responseUsers = await getUsersApi(pageSize, pageNumber)
    res
        .json(responseUsers)
        .status(200)
}

export const getProfile = async (req, res) => {
    const { id } = req.params
    const responseProfile = await getProfileApi(id)
    res
        .json(responseProfile)
        .status(200)
}

export const updateProfile = async (req, res) => {
    const { id } = req.params
    const  data  = req.body
    const responseProfile = await updateProfileApi(id, data)
    res
        .json(responseProfile)
        .status(200)
}

export const updateLinks = async (req, res) => {
    const { id } = req.params
    const  data = req.body
    const responseLinks = await updateLinksApi(id, data)
    res
        .json(responseLinks)
        .status(200)
}

export const follow = async (req, res) => {
    const { followerId, followedId } = req.params
    console.log(followerId, followedId)
    const responseFollows = await followApi(followerId, followedId)
    res
        .json(responseFollows)
        .status(200)
}

export const unfollow = async (req, res) => {
    const { unfollowerId, unfollowedId } = req.params
    console.log(unfollowerId, unfollowedId)
    const responseUnfollows = await unfollowApi(unfollowerId, unfollowedId)
    res
        .json(responseUnfollows)
        .status(200)
}