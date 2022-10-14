import { Router } from "express"
import { PrismaClient } from '@prisma/client'
import { getUsers } from "../controllers/users/users-controller.js"
import { getProfile } from "../controllers/users/users-controller.js"
import { updateProfile } from "../controllers/users/users-controller.js"
import { updateLinks } from "../controllers/users/users-controller.js"
import { follow } from "../controllers/users/users-controller.js"
import { unfollow } from "../controllers/users/users-controller.js"
import { createPost } from "../controllers/users/users-controller.js"
import { deletePost } from "../controllers/users/users-controller.js"
import { updatePost } from "../controllers/users/users-controller.js"
import { getAllPosts } from "../controllers/users/users-controller.js"
import { getProfilePost } from "../controllers/users/users-controller.js"
import { checkMe, login, register } from "../controllers/auth/auth-controller.js"

const router = Router()
export const prisma = new PrismaClient()


/* users routes */

router.get('/users', async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({
            include: { 
                profile: true
            },
        })
        const profiles = await prisma.profile.findMany({
            include: { 
                links: true
            },
        })
        res.json({users, profiles})
    } catch (error) {
        next(error)
    }
})

router.get('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.post('/users', async (req, res, next) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.delete('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteUser = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.json(deleteUser)
    } catch (error) {
        next(error)
    }
})

router.patch('/users/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const patchUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: req.body
        })
        res.json(patchUser)
    } catch (error) {
        next(error)
    }
})

router.get('/users/:pageSize/:pageNumber', getUsers)

router.get('/profile/:id', getProfile)
router.patch('/profile/:id', updateProfile)

router.patch('/profile/:id/links', updateLinks)

router.get('/posts/:pageSize/:pageNumber', getAllPosts)
router.get('/profile/:id/posts/:postId', getProfilePost)
router.post('/profile/:id/createPost', createPost)
router.patch('/profile/:id/posts/:postId', updatePost)
router.delete('/profile/:id/deletePost/:postId', deletePost)

router.patch('/profile/:followerId/follow/:followedId', follow)
router.delete('/profile/:unfollowerId/unfollow/:unfollowedId', unfollow)


// router.patch('/profile/follow/:followerId/:followedId', follow)
// router.delete('/profile/follow/:unfollowerId/:unfollowedId', unfollow)


/* auth routes */

router.post('/login', login)
router.post('/register', register)
router.get('/me', checkMe)


export default router