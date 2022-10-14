import { getUsersApi } from "../users/api/getUsers.js"
import { getProfileApi } from "../users/api/getProfile.js"
import { updateProfileApi} from "./api/updateProfile.js"
import { updateLinksApi } from "./api/updateLinks.js"
import { followApi } from "./api/follow.js"
import { unfollowApi } from "./api/unfollow.js"
import { createPostApi } from "./api/createPost.js"
import { deletePostApi } from "./api/deletePost.js"
import { updatePostApi } from "./api/updatePost.js"
import { getAllPostsApi } from "./api/getAllPosts.js"
import { getProfilePostApi } from "./api/getProfilePost.js"

export const getUsers = async (req, res) => {
    const { pageSize, pageNumber } = req.params
    const responseUsers = await getUsersApi(pageSize, pageNumber)
    res
        .json(responseUsers)
        .status(200)
}

export const getProfile = async (req, res) => {
    const { id } = req.params
    console.log(id)
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

export const createPost = async (req, res) => {
    const { id, text } = req.body
    console.log(text, id)
    const responsePost = await createPostApi(id, text)
    res 
        .json({
            resultCode: 0,
            responsePost
        })
        .status(200)
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    const responsePost = await deletePostApi(id)
    res 
        .json({
            responsePost,
            resultCode: 0
        })
        .status(200)
}

export const updatePost = async (req, res) => {
    const { postId } = req.params
    console.log(postId)
    const data = req.body
    console.log(data)
    const responsePost = await updatePostApi(postId, data)
    res 
        .json(responsePost)
        .status(200)
}

export const getAllPosts = async (req, res) => {
    const { pageSize, pageNumber } = req.params
    const responseAllPosts = await getAllPostsApi(pageSize, pageNumber)
    res
        .json(responseAllPosts)
        .status(200)
}

export const getProfilePost = async (req, res) => {
    const { id, postId } = req.params
    console.log(postId)
    const responsePost = await getProfilePostApi(postId)
    res 
        .json(responsePost)
        .status(200)
}