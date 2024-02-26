import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'

import db from './config/database.js'
import { documentRoutes, userRoutes } from './routes/index.js'
import generateOTP from './utils/generateOTP.js'
import { otpEmailTemplate } from './utils/otpEmailTemplate.js'
import mailer from './utils/mailer.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const server = http.createServer(app)
const io = new Server(server, {
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
app.use(express.urlencoded({ extended: false }))
app.locals.io = io

// Connect Server
db.connect((err) => {
    if(err){
        console.log('Error connecting to MySQL database:', err);
        return
    }
    console.log('Connected to MySQL database successfully');
    // sendMail()
})

// const sendMail = async() => {
//     const otpCode = generateOTP()

//     var action = 'Password Reset'
//     var receiver = 'grandnest344@gmail.com'
//     var subject = 'Verify Email Address'
//     var body = otpEmailTemplate(action, otpCode)

//     await mailer({ receiver, subject, body })
//     .then(() => {
//         console.log('Email Sent');
//     })
//     .catch((error) => {
//         throw new Error(error)
//     })
// }

// Socket IO Connections
io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);
})

// Document Routes
app.use('/api/document', documentRoutes)

// User Routes
app.use('/api/user', userRoutes)

server.listen(port, () => console.log(`Server started on port ${port}`))
