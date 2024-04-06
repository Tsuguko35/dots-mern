import asyncHandler from "express-async-handler";
import db from "../config/database.js";
import { createReadStream, promises as fs, unlink } from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";
import client from "../config/client.js";

const uploadTemplates = asyncHandler(async (req, res) => {
  const templateDetails = JSON.parse(req.body.template_Details);

  const files = req.files;

  files.forEach((file) => {
    const localFilePath = file.path;
    const remoteFilePath = `templateFiles/templates/${file.filename}`;
    const fileContent = createReadStream(localFilePath);
    // Upload the file to Hostinger FTP server
    client.put(fileContent, remoteFilePath, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
      } else {
        console.log("File uploaded successfully");
        // Delete the file locally after successful upload
        unlink(localFilePath, (err) => {
          if (err) {
            console.error("Error deleting local file:", localFilePath, err);
          } else {
            console.log("Local file deleted successfully:", localFilePath);
          }
        });
      }
    });
  });

  const queries = templateDetails.map((file) => {
    return new Promise((resolve, reject) => {
      const q =
        "INSERT INTO templates (`template_id`, `template_Name`, `date_Added`) VALUES (?)";

      const values = [file.template_id, file.file_Name, file.date_Created];

      db.query(q, [values], (err, template) => {
        if (err) {
          reject(err);
        } else {
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
    return res.status(400).json({
      errorMessage: "An error occurred while uploading the templates.",
    });
  }
});

const getTemplates = asyncHandler(async (req, res) => {
  const q = `SELECT * FROM templates`;

  db.query(q, async (err, templates) => {
    if (err) return res.status(400).json({ errorMessage: "Query Error" });

    if (templates && templates.length > 0) {
      return res.status(200).json({ hasData: true, templates: templates });
    } else {
      return res.status(200).json({ hasData: false });
    }
  });
});

const deleteTemplate = asyncHandler(async (req, res) => {
  const { template_id, date_Added, file_Name } = req.body;
  const uploadPath = "/templateFiles/templates";

  const q = `DELETE FROM templates WHERE template_id = ?`;

  db.query(q, [template_id], async (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ errorMessage: "Failed to delete template", error: err });
    } else {
      if (result.affectedRows > 0) {
        const filename = `${date_Added}-${file_Name}`;
        const filePath = path.join(uploadPath, filename);
        const fixedPath = filePath.replace(/\\/g, "/");

        client.delete(fixedPath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully:", filePath);
          }
        });
        return res
          .status(200)
          .json({ success: true, message: "Template deleted successfully" });
      } else {
        return res.status(404).json({ errorMessage: "Template not found" });
      }
    }
  });
});

export { uploadTemplates, getTemplates, deleteTemplate };
