import express from 'express'
import { 
    getDropdowns, updateDropdowns 
} from '../controllers/settingsController.js'

const router = express.Router()

router.post('/getDropdowns', getDropdowns)
router.post('/updateDropdowns', updateDropdowns)


export default router