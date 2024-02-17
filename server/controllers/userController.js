import asyncHandler from 'express-async-handler'
import db from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

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

export {
    signIn,
    validateUser,
    logOutUser
}