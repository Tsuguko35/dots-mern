import express from 'express'
import { 
    changeUserStatus,
    finishStaffSetup,
    getUsers,
    isEmailRegistered,
    logOutUser,
    register,
    registerStaff,
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
router.post('/changeUserStatus', changeUserStatus)
router.post('/registerStaff', registerStaff)
router.post('/finishStaffSetup', finishStaffSetup)


export default router