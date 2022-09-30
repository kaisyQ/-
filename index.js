import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import router from './router/router.js'
import sequelize from './database/db.js'

import { PORT } from './config/config.js'
import { CORS_OPTIONS } from './config/cors-options.js'
import User from './database/models/user/user.js'
import { Links } from './database/models/user/profile/links/links.js'
import { Profile } from './database/models/user/profile/profile.js'

const app = express()

app.use(cors(CORS_OPTIONS))

app.use(cookieParser()) 
app.use(express.json())
app.use(bodyParser())

app.use(router)



const startApp = async () => {
    try {
        await sequelize.authenticate()
        await Links.sync({ force: true })
        await Profile.sync({ force: true })
        await User.sync({ force: true })        
    } catch (err) {
        console.error(err)
    }

    app.listen(PORT, () => {
        console.log(`server is running on PORT ${ PORT }`)
    })
}


startApp()