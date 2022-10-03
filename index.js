import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import router from './router/router.js'

import { PORT } from './config/config.js'
import { CORS_OPTIONS } from './config/cors-options.js'

const app = express()

app.use(cors(CORS_OPTIONS))

app.use(cookieParser()) 
app.use(express.json())
app.use(bodyParser())

app.use(router)



const startApp = async () => {
    app.listen(PORT, () => {
        console.log(`server is running on PORT ${ PORT }`)
    })
}


startApp()