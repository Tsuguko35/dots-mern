import asyncHandler from 'express-async-handler'
import db from '../config/database.js'
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs'
import path from 'path'

const uploadTemplates = asyncHandler(async (req, res) => {
    const templateDetails = JSON.parse(req.body.template_Details);

    const queries = templateDetails.map((file) => {
        return new Promise((resolve, reject) => {
            const q = "INSERT INTO templates (`template_id`, `template_Name`, `date_Added`) VALUES (?)"

            const values = [
                file.template_id,
                file.file_Name,
                file.date_Created
            ]

            db.query(q, [values], (err, template) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(template);
                }
            });
        });
    });

    try {
        const results = await Promise.all(queries);
        return res.status(200).json({ hasData: true, templates: results });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errorMessage: 'An error occurred while uploading the templates.' });
    }
})

const getTemplates = asyncHandler(async (req, res) => {
    const q = `SELECT * FROM templates`

    db.query(q, async(err, templates) => {
        if (err) return res.status(400).json({errorMessage: 'Query Error'})

        if(templates.length > 0){
            return res.status(200).json({ hasData: true, templates: templates })
        }
        else{
            return res.status(200).json({ hasData: false })
        }
    })
})

const deleteTemplate = asyncHandler(async (req, res) => {
    const { 
        template_id,
        date_Added,
        file_Name
    } = req.body;
    const uploadPath = './template_Files/templates';

    const q = `DELETE FROM templates WHERE template_id = ?`;

    db.query(q, [template_id], async(err, result) => {
        if (err) {
            return res.status(400).json({ errorMessage: 'Failed to delete template', error: err });
        } else {
            if (result.affectedRows > 0) {
                const filename = `${date_Added}-${file_Name}`
                const filePath = path.join(uploadPath, filename);
                fs.unlink(filePath).catch(err => {
                    console.error(`Error deleting file: ${filename}`, err);
                    throw err;
                });
                return res.status(200).json({ success: true, message: 'Template deleted successfully' });
            } else {
                return res.status(404).json({ errorMessage: 'Template not found' });
            }
        }
    });
})



export{
    uploadTemplates,
    getTemplates,
    deleteTemplate
}