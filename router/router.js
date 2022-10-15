import { Router } from "express"
import { PrismaClient } from '@prisma/client'
import { getUsers, updateStatus } from "../controllers/users/users-controller.js"
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


router.get('/users/:pageSize/:pageNumber', getUsers)


router.get('/posts/:pageSize/:pageNumber', getAllPosts)
router.get('/profile/:id/posts/:postId', getProfilePost)

router.patch('/profile/:followerId/follow/:followedId', follow)
router.delete('/profile/:unfollowerId/unfollow/:unfollowedId', unfollow)


router.get('/profile/:id', getProfile)
router.put('/profile', updateProfile)

router.patch('/profile/status', updateStatus)
router.patch('/profile/links', updateLinks)

router.post('/post', createPost)
router.delete('/post/:id', deletePost)
router.patch('/post', updatePost)

/* auth routes */

router.post('/login', login)
router.post('/register', register)
router.get('/me', checkMe)


export default router