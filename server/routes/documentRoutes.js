import express from 'express'
import { 
    addDocument,
    deleteFiles,
    editDocument,
    getDocument,
    getDocuments, 
    getFiles, 
    uploadFiles
} from '../controllers/documentsController.js'

import multer from 'multer'

const router = express.Router()

const fileStorage = multer.diskStorage({
    destination: './document_Files',
    filename: function(req, file, cb){
        return cb(null, `${req.query.document_id}-${file.originalname}`)
    }
})

const documentFilesUpload = multer({storage: fileStorage})

// const signatureStorage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, 'document_Files')
//     },
//     filename: function(req, file, cb){
//         cb(null, `${req.query.file_id}-${file.originalname}`)
//     }
// })

router.post('/getDocuments', getDocuments)
router.post('/getDocument', getDocument)
router.post('/addDocument', addDocument)
router.post('/editDocument', editDocument)
router.post('/uploadFiles', documentFilesUpload.array('files') ,uploadFiles)
router.post('/getFiles', getFiles)
router.post('/deleteFiles', deleteFiles)

export default router