import { Router } from "express"

const router = Router()

router.get('/users', (req, res) => {
})


router.post('/login', (req, res) => {
    console.log(req.body)
    res.json({token: 'token123'})
})

router.get('/me', (req, res) => {
    console.log(req.headers.cookie)
})
export default router