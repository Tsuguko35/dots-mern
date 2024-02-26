/**
 ** This function sends the mail to the email address of the user
 **/

import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

const mailer = ({ receiver, subject, body }) => {
    let transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE,
        auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
        },
    })

    let mailOptions = {
        from: process.env.MAILER_USER,
        to: receiver,
        subject: subject,
        html: body,
    }

return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        reject(`Error occured: ${error}`)
    } else {
        resolve(`Mail sent: ${info}`)
    }
    })
})
}

export default mailer