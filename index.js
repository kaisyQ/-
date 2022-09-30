import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import router from './router/router.js'
import sequelize from './database/db.js'
import { syncAllTables } from './database/db.js'

import { PORT } from './config/config.js'
import { CORS_OPTIONS } from './config/cors-options.js'

const app = express()

app.use(cors(CORS_OPTIONS))

app.use(cookieParser()) 
app.use(express.json())
app.use(bodyParser())

app.use(router)



const startApp = async () => {
    try {
        await sequelize.authenticate()
        await syncAllTables()
    } catch (err) {
        console.error(err)
    }

    app.listen(PORT, () => {
        console.log(`server is running on PORT ${ PORT }`)
    })
}


startApp()