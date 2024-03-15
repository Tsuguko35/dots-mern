import cors from 'cors'
import dotenv from 'dotenv'
import express, { json } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'

import db from './config/database.js'
import { documentRoutes, settingsRoutes, userRoutes } from './routes/index.js'
import generateOTP from './utils/generateOTP.js'
import { otpEmailTemplate } from './utils/otpEmailTemplate.js'
import mailer from './utils/mailer.js'
import bodyParser from 'body-parser'



dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)
const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT'],
        credentials: true,
    },
})

// Middlewares
app.use(cors({ 
    origin: true, 
    credentials: true 
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use('/document_Files', express.static('./document_Files/files'));
app.use('/signature_Files', express.static('./document_Files/signatures'));
app.use('/profile_Pic', express.static('./user_Files/profilePics'));
app.locals.io = io

// Connect Server
db.connect((err) => {
    if(err){
        console.log('Error connecting to MySQL database:', err);
        return
    }
    console.log('Connected to MySQL database successfully');
})


// Socket IO Connections
io.on('connection', (socket) => {
    console.log(`user connected`);

    socket.on('join', (user_id) => {
        socket.join(user_id)
    })

    socket.on('notifications', (user_id) => {
        socket.broadcast.emit('notifications', user_id)
    })
})

// Document Routes
app.use('/api/document', documentRoutes)

// Settings Routes
app.use('/api/settings', settingsRoutes)

// User Routes
app.use('/api/user', userRoutes)

server.listen(port, () => console.log(`Server started on port ${port}`))
