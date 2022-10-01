import { Router } from "express"
import { getUsers } from "../controllers/users/users-controller.js"
import { checkMe, login, register } from "../controllers/auth/auth-controller.js"

const router = Router()



/* users routes */

router.get('/users/:pageSize/:pageNumber', getUsers)

/* auth routes */

router.post('/login', login)
router.post('/register', register)
router.get('/me', checkMe)


export default router