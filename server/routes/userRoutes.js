import express from 'express'
import { 
    getUsers,
    isEmailRegistered,
    logOutUser,
    register,
    requestOtp,
    resetUserPassword,
    signIn,
    validateUser, 
    verifyOtp
} from '../controllers/userController.js'

const router = express.Router()

router.post('/signIn', signIn)
router.post('/validateUser', validateUser)
router.post('/logOutUser', logOutUser)
router.post('/isEmailRegistered', isEmailRegistered)
router.post('/register', register)
router.post('/requestOtp', requestOtp)
router.post('/verifyOtp', verifyOtp)
router.post('/resetPassword', resetUserPassword)
router.post('/getAllUsers', getUsers)


export default router