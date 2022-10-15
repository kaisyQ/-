import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import router from './router/router.js'

import { PORT } from './config/config.js'
import { CORS_OPTIONS } from './config/cors-options.js'

const app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:'http://localhost:3000',
        methods: ['GET', 'POST']
,    }
})

io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`)

    socket.on('chat_message', (msg) => {
        console.log('message:' + msg)
        io.emit('chat_message', msg)
        // socket.join(msg)
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id)
    })
})

const SERVER_PORT = 8080

app.use(cors(CORS_OPTIONS))

app.use(cookieParser()) 
app.use(express.json())
app.use(bodyParser())

app.use(router)



const startApp = async () => {
    app.listen(PORT, () => {
        console.log(`server is running on PORT ${ PORT }`)
    }),
    server.listen(SERVER_PORT, () => {
        console.log('SERVER RUNNING')
    })
}


startApp()