import { Router } from "express"
import { PrismaClient } from '@prisma/client'
// import { getUsers } from "../controllers/users/users-controller.js"
// import { checkMe, login, register } from "../controllers/auth/auth-controller.js"

const router = Router()
const prisma = new PrismaClient()

/* some functions */

// const getUsers = async (pageSize=2, pageNumber=1) => {
//     let users = []
//     try {
//         users = await prisma.user.findMany()
//     } catch (err) {
//         console.error(err)
//     }
//     const jsonUsers = users.map(user => user)
//     console.log(jsonUsers[0])
//     console.log(jsonUsers.slice((0, pageNumber*pageSize+1)))
//     return JSON.stringify(jsonUsers.slice(((pageNumber-1)*pageSize), pageNumber*pageSize+1))
// }


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

// router.get('/users/:pageSize/:pageNumber', getUsers)


/* auth routes */

// router.post('/login', login)
// router.post('/register', register)
// router.get('/me', checkMe)


export default router