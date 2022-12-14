import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import router from './router/router.js'

import { PORT } from './config/config.js'
import { CORS_OPTIONS } from './config/cors-options.js'
import { prisma } from './router/router.js'

const app = express()


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin:'http://localhost:3000',
        methods: ['GET', 'POST']
,   }
})


const arrOfRooms = [] // {idFrom: 1, idTo: 2: text: ''}



io.on("connection", (socket) => {
    console.log(`User Connected : ${socket.id}`)

    socket.on('connect-to-room', (data) => {
        let room = null
        if (arrOfRooms[`room-${data.id}-${data.chatWithId}`]) {
            socket.join(`room-${data.id}-${data.chatWithId}`)
            room = `room-${data.id}-${data.chatWithId}`
        } else {
            socket.join(`room-${data.chatWithId}-${data.id}`)
            room = `room-${data.chatWithId}-${data.id}`
        }
        arrOfRooms[room] = {
            created: true,
            messages: []
        }

        io.to(room).emit('initial', { room })
    })

    socket.on('send-message', async (data) => {
        arrOfRooms[data.room].messages.push(data.message)
        
        const message = await prisma.messages.create({
            data: {
                sentFrom: Number(data.message.fromId),
                sentTo: Number(data.message.toId),
                text: data.message.text,
                profile: {
                    connect: {
                        id: Number(data.message.fromId)
                    }
                }
            }

        })

        io.to(data.room).emit('all-messages', arrOfRooms[data.room].messages)
    })

    socket.on('save-messages', (data) => {
        console.log(arrOfRooms[data.room].messages)
    })


    socket.on('disconnect', (data) => {
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