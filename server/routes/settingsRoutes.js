import express from 'express'
import { 
    getDropdowns, getLogs, updateDropdowns 
} from '../controllers/settingsController.js'

const router = express.Router()

router.post('/getDropdowns', getDropdowns)
router.post('/updateDropdowns', updateDropdowns)
router.post('/getLogs', getLogs)

export default router