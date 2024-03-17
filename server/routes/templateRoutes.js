import express from 'express'

import multer from 'multer'
import { deleteTemplate, getTemplates, uploadTemplates } from '../controllers/templateController.js'

const router = express.Router()

const templateStorage = multer.diskStorage({
    destination: './template_Files/templates',
    filename: function(req, file, cb){
        return cb(null, `${req.query.date_Created}-${file.originalname}`)
    }
})

const templateUpload = multer({storage: templateStorage})

router.post('/uploadTemplates', templateUpload.array('files'), uploadTemplates)
router.post('/getTemplates', getTemplates)
router.post('/deleteTemplate', deleteTemplate)

export default router