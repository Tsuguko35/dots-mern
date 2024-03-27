import asyncHandler from "express-async-handler";
import db from "../config/database.js";

const getDropdowns = asyncHandler(async (req, res) => {
  let q = `SELECT * FROM dropdowns`;

  db.query(q, async (err, dropdowns) => {
    if (err) res.status(400).json({ errorMessage: "Query Error" });

    if (dropdowns && dropdowns.length > 0) {
      res.status(200).json({ hasData: true, dropdowns: dropdowns });
    } else {
      res.status(200).json({ hasData: false });
    }
  });
});

const updateDropdowns = asyncHandler(async (req, res) => {
  const dropdowns = JSON.parse(req.body.dropdownData);
  const updateDropdown = (dropdown) => {
    return new Promise((resolve, reject) => {
      let q = `UPDATE dropdowns SET dropdown_option = ? WHERE dropdown_id = ?`;
      db.query(
        q,
        [dropdown.dropdown_option, dropdown.dropdown_id],
        (err, result) => {
          console.log();
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  };

  try {
    const results = await Promise.all(dropdowns.map(updateDropdown));
    res
      .status(200)
      .json({ message: "Dropdowns updated successfully", results });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "Update Error", error });
  }
});

const getLogs = asyncHandler(async (req, res) => {
  let q = `SELECT * FROM logs`;

  db.query(q, async (err, logs) => {
    if (err) res.status(400).json({ errorMessage: "Query Error" });

    if (logs && logs.length > 0) {
      res.status(200).json({ hasData: true, logs: logs });
    } else {
      res.status(200).json({ hasData: false });
    }
  });
});

export { getDropdowns, updateDropdowns, getLogs };
