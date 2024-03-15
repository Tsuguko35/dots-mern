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
    uploadUserProfilePic,
    validateUser, 
    verifyOtp
} from '../controllers/userController.js'
import multer from 'multer'

const router = express.Router()

const profilePicStorage = multer.diskStorage({
    destination: './user_Files/profilePics',
    filename: function(req, file, cb){
        cb(null, `${req.query.user_id}-${file.originalname}`)
    }
})
const profilePicUpload = multer({storage: profilePicStorage})

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
router.post('/uploadProfilePic', profilePicUpload.array('file'), uploadUserProfilePic)


export default router