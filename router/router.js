import { Router } from "express"
//import { createUserWithProfile } from "../database/models/user/create-user.js"
import User from "../database/models/user/user.js"
import { getUsers } from "../controllers/users/users-controller.js"

const router = Router()

router.get('/users', getUsers)

// router.get('/register', async (req, res) => {
//     //await createUserWithProfile('email', '123', 'firstname', 'lastname')
// })


// router.post('/login', (req, res) => {
//     console.log(req.body)
//     res.json({token: 'token123'})
// })

router.get('/me', (req, res) => {
    if (req.headers.cookie) {
        
    }
    console.log(req.headers.cookie)
})
export default router