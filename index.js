import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import router from './router/router.js'
import sequelize from './database/db.js'
import { syncAllTables } from './database/db.js'

import { PORT } from './config/config.js'

const app = express()

app.use(cors())
app.use(cookieParser()) 
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