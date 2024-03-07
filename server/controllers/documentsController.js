import asyncHandler from 'express-async-handler'
import db from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid';
import generateOTP from '../utils/generateOTP.js'
import { otpEmailTemplate } from '../utils/otpEmailTemplate.js'
import mailer from '../utils/mailer.js'
import { promises as fs } from 'fs'
import path from 'path'
import formatTime from '../utils/formatTime.js'
import { urgentEmailTemplate } from '../utils/urgentEmailTemplate.js'



dotenv.config()

const uploadFiles = asyncHandler(async (req, res) => {
    const fileDetails = JSON.parse(req.body.file_Details);

    const queries = fileDetails.map((file) => {
        return new Promise((resolve, reject) => {
            const uniqueID = uuidv4()
            const q = "INSERT INTO document_files (`file_id`, `document_id`, `file_Name`, `file_Size`) VALUES (?)"

            const values = [
                uniqueID,
                req.query.document_id,
                file.file_Name,
                file.file_Size
            ]

            db.query(q, [values], (err, files) => {
                if (err) {
                    reject(err); // Reject the promise if there's an error
                }
                else {
                    resolve(files);
                }
            });
        });
    });

    try {
        const results = await Promise.all(queries);
        // At this point, all queries have completed successfully
        res.status(200).json({ hasData: true, files: results });
    } catch (error) {
        console.log(error);
        // If any query fails, this block will be executed
        res.status(400).json({ errorMessage: 'An error occurred while uploading the files.' });
    }
})

const getFiles = asyncHandler(async (req, res) => {
    const { document_id } = req.body

    const q = `SELECT * FROM document_files WHERE document_id = '${document_id}'`

    db.query(q, async(err, files) => {
        if (err) res.status(400).json({errorMessage: 'Query Error'})

        if(files.length > 0){
            res.status(200).json({ hasData: true, files: files })
        }
        else{
            res.status(200).json({ hasData: false })
        }
    })
})

const deleteFiles = asyncHandler(async (req, res) => {
    const fileDetails = JSON.parse(req.body.file_Details);
    const uploadPath = './document_Files';

    const deleteFile = fileDetails.map((file) => {
        if(file.file_id){
            return new Promise((resolve, reject) => {
                const q = "DELETE FROM document_files WHERE file_id = ?";
    
                const values = [
                    file.file_id,
                ];
    
                db.query(q, [values], (err, result) => {
                    if (err) {
                        reject(err); // Reject the promise if there's an error
                    } else {
                        const filename = `${file.document_id}-${file.file_Name}`
                        const filePath = path.join(uploadPath, filename);
                        fs.unlink(filePath).catch(err => {
                            console.error(`Error deleting file: ${filename}`, err);
                            throw err;
                        });
                        resolve(result); // Resolve the promise with the result of the deletion
                    }
                });
            });
        }
        else{
            return Promise.resolve()
        }
        
    });

    try {
        // Delete each file in the array and wait for all deletions to complete
        await Promise.all(deleteFile);
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({errorMessage: 'An error occured while adding the document.'})
    }
})

const getDocuments = asyncHandler(async (req, res) => {
    const { documentType } = req.body
    let q = ''

    if(documentType === 'Communication' || documentType === 'Memorandum'){
        q = `SELECT * FROM documents WHERE document_Type = '${documentType}'`
    }
    else{
        q = `SELECT * FROM documents WHERE document_Type NOT IN ('Communication', 'Memorandum')`
    }

    db.query(q, async(err, documents) => {
        if (err) res.status(400).json({errorMessage: 'Query Error'})

        if(documents.length > 0){
            res.status(200).json({ hasData: true, documents: documents })
        }
        else{
            res.status(200).json({ hasData: false })
        }
    })
})

const getDocument = asyncHandler(async (req, res) => {
    const { document_id } = req.body
    console.log(document_id);
    const q = `SELECT * FROM documents WHERE document_id = '${document_id}'`

    db.query(q, async(err, document) => {
        if (err) res.status(400).json({errorMessage: 'Query Error'})

        if(document.length > 0){
            res.status(200).json({ hasData: true, document: document })
        }
        else{
            res.status(200).json({ hasData: false })
        }
    })
})

const addDocument = asyncHandler(async (req, res) => {
    const { 
        document_id,
    } = req.body

    const columns = Object.keys(req.body).join(', ');
    const values = Object.values(req.body).map(value => typeof value === 'string' ? `'${value}'` : value).join(', ');

    const q = `INSERT INTO documents (${columns}) VALUES (${values})`;

    db.query(q, async(err, document) => {
        if (err) res.status(400).json({errorMessage: 'Query Error'})

        if(document){
            sendUrgentEmail({ sender: '', date: '', time: '', receiver: '' })
            res.status(200).json({ hasData: true, document: document, document_id: document_id })
        }
        else{
            res.status(400).json({errorMessage: 'An error occured while adding the document.'})
        }
    })
})

const editDocument = asyncHandler(async (req, res) => {
    const { 
        document_id,
    } = req.body;

    // Update all fields in the request body
    const updates = Object.entries(req.body)
        .filter(([key, value]) => key !== 'document_id')
        .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
        .join(', ');

    const q = `UPDATE documents SET ${updates} WHERE document_id = '${document_id}'`;

    db.query(q, async (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({ errorMessage: 'Query Error' });
        } else if (result.affectedRows > 0) {
            res.status(200).json({ hasData: true, document_id: document_id, message: 'Document updated successfully.' });
        } else {
            res.status(400).json({ errorMessage: 'An error occurred while updating the document.' });
        }
    });
});

const sendUrgentEmail = async(props) => {
    const sender = props.sender
    const date = new Date(props.date).toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})
    const time = formatTime(props.time)


    var receiver = props.receiver
    var subject = 'Urgent Document'
    var body = urgentEmailTemplate(sender, date, time)

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
}


export{
    getDocuments,
    getDocument,
    addDocument,
    uploadFiles,
    getFiles,
    editDocument,
    deleteFiles
}