import express from 'express'
import { 
    signIn,
    validateUser 
} from '../controllers/userController.js'

const router = express.Router()

router.post('/signIn', signIn)
router.post('/validateUser', validateUser)
router.post('/logOutUser', validateUser)


export default router