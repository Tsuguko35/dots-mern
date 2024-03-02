import asyncHandler from 'express-async-handler'
import db from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';
import generateOTP from '../utils/generateOTP.js'
import { otpEmailTemplate } from '../utils/otpEmailTemplate.js'
import mailer from '../utils/mailer.js'

const uniqueID = uuidv4()

dotenv.config()

var otpCode
var otpExpirationTime
var userEmailAddress

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME, // Expires in one year
    });
};

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const q = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`

    db.query(q, async(err, user) => {
        if (err) res.json({success : false})

        if(user.length > 0){
            const passwordMatch = await bcrypt.compare(password, user[0].password); 

            if (!passwordMatch){
                res.status(400).json({errorMessage : 'Invalid email or password.'})
            }else{
                const token = generateToken(user[0].uID)

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                })
                res.status(200).json({
                    uID: user[0].uID,
                    role: user[0].role,
                    email: user[0].email,
                    active: user[0].Active,
                    verified: user[0].verified,
                    profilePic: user[0].profilePic,
                    temporary: user[0].temporary,
                    full_Name: user[0].full_Name,
                    token
                })
            }
        }
        else{
            res.status(400).json({errorMessage : 'Invalid email or password.'})
        }
    })
})

const validateUser = asyncHandler(async (req, res) => {
    // Token

    let token = req.cookies.token || req.body.token

    try {
        if(!token){
            res.status(400).json({ errorMessage: 'Not Authorized' })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const q = `SELECT * FROM users WHERE uID = '${decode.id}' LIMIT 1`
        db.query(q, async(err, user) => {
            if (err) res.status(400).json({ errorMessage: 'Query Error' })
            if(user.length > 0){
                res.status(200).json({
                    uID: user[0].uID,
                    role: user[0].role,
                    email: user[0].email,
                    active: user[0].Active,
                    verified: user[0].verified,
                    profilePic: user[0].profilePic,
                    temporary: user[0].temporary,
                    full_Name: user[0].full_Name,
                    token
                })
            }
        })
    }
    catch(error) {
        console.error(error)
        return res.status(400).json({ errorMessage: 'Not authorized.' })
    }
})

const logOutUser = asyncHandler(async (req, res) => {
    try{
        res.cookie('token', '', { expires: new Date(0) })
        res.status(200).json({success: true})
    }
    catch(error) {
        console.error(error)
        return res.status(400).json({ errorMessage: 'Something went wrong.' })
    }
})

const isEmailRegistered = asyncHandler(async (req, res) => {
        const { email, password } = req.body
        const q = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`

        db.query(q, async(err, user) => {
            if (err) res.status(400).json({ errorMessage: 'Query Error' })
            if(user.length > 0){
                res.status(200).json({
                    exist: true
                })
            }
            else{
                res.status(200).json({
                    exist: false
                })
            }
        })
})

const register = asyncHandler(async (req, res) => {
    const { email, password, fullName } = req.body

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const q = "INSERT INTO users (`email`, `password`, `full_Name`, `role`, `Active`, `uID`, `verified`, `pending`, `date_Created`) VALUES (?)"

    const values = [
        email,
        hashedPassword,
        fullName,
        'Faculty',
        1,
        uniqueID,
        0,
        1,
        new Date()
    ]

    db.query(q, [values], async(err, user) => {
        if (err){
            res.status(400).json({ errorMessage: 'Query Error' })
        } 
        else{
            if(user){
                // User was created successfully
                res.status(200).json({ success: true })
            } else {
                // User creation failed
                res.status(400).json({ errorMessage: 'User creation failed' })
            }
        }

        
    })
})

const requestOtp = asyncHandler(async (req, res) => {
    console.log(true);
    const otpData = generateOTP();
    otpCode = otpData.otpCode;
    console.log(otpCode);
    otpExpirationTime = otpData.expirationTime;

    var action = req.body.action
    var receiver = req.body.receiver
    var subject = 'Verify Email Address'
    var body = otpEmailTemplate(action, otpCode)

    await mailer({ receiver, subject, body })
        .then(() => {
            console.log('sent');
            res.status(200).json({
            status: 'success',
            })
        })
        .catch((error) => {
            res.status(400)
        })
})

const verifyOtp = asyncHandler(async (req, res) => {
    const { otpCodeInput } = req.body

    console.log(otpCodeInput, otpCode);

    if (new Date().getTime() > otpExpirationTime) {
        res.status(400).json({ success: false, errorMessage: 'OTP code has expired.' });
    }

    if (otpCodeInput == otpCode) {
        res.status(200).json({ success: true })
    } else {
        res.status(400).json({ success: false, errorMessage: 'Invalid OTP code.' })
    }
})

const resetUserPassword = asyncHandler(async (req, res) => {
    console.log(true);
    const { email, password } = req.body
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const q = "UPDATE users SET `password` = ? WHERE email = ?"

    const values = [
        hashedPassword
    ]

    db.query(q, [...values, email], async(err, user) => {
        if (err){
            res.status(400).json({ errorMessage: 'Query Error' })
        } 
        else{
            if(user){
                // User was created successfully
                res.status(200).json({ success: true })
            } else {
                // User creation failed
                res.status(400).json({ errorMessage: 'Reset password failed. Try again.' })
            }
        }
    })
})

export {
    signIn,
    validateUser,
    logOutUser,
    isEmailRegistered,
    register,
    requestOtp,
    verifyOtp,
    resetUserPassword
}