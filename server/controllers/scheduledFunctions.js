import Axios from "../config/axios.js";
import db from "../config/database.js";
import mailer from "../utils/mailer.js";
import { pendingDocumentEmailTemplate } from "../utils/pendingDocumentEmailTemplate.js";

const checkDocumentsToArchive = () => {
  const documentsQuery = `SELECT * from documents`;

  db.query(documentsQuery, async (err, documents) => {
    if (err) console.log(err);

    if (documents) {
      if (documents.length > 0) {
        for (const document of documents) {
          if (
            (document.date_Added && document.status === "Approved") ||
            document.status === "Rejected"
          ) {
            const daysLeft = calculateDaysLeft(document.date_Added, 30);

            if (daysLeft <= 0) {
              try {
                await Axios.post("/document/archiveDocument", {
                  document_id: document.document_id,
                  archived_By: `Dean's Office Transaction`,
                });
                console.log("success");
              } catch (e) {
                console.log(`Unhandled Error: ${e}`);
              }
            }
          }
        }
      }
    }
  });
};

const checkPendingDocuments = () => {
  const documentsQuery = `SELECT * from documents`;

  db.query(documentsQuery, async (err, documents) => {
    if (err) console.log(err);

    if (documents) {
      if (documents.length > 0) {
        for (const document of documents) {
          if (
            (document.forward_To && document.status !== "Approved") ||
            document.status !== "Rejected"
          ) {
            const daysLeft = calculateDaysLeft(document.date_Added, 3);
            console.log(daysLeft);
            if (daysLeft === 0) {
              const getUser = `SELECT * FROM users`;
              db.query(getUser, async (err, users) => {
                if (err) {
                  console.log(err);
                } else {
                  const sender = users.find(
                    (user) => user.user_id === document.created_By
                  )?.full_Name;
                  const user = users.find(
                    (user) => user.user_id === document.forward_To
                  );
                  const email = user.email;
                  const date = new Date(
                    document.date_Received
                  ).toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  var receiver = email;
                  var subject = "Pending Document";
                  var body = pendingDocumentEmailTemplate(
                    sender,
                    document.document_Name,
                    date
                  );

                  console.log(`sending to ${email}`);
                  await mailer({ receiver, subject, body })
                    .then(() => {
                      console.log("Email Sent.");
                    })
                    .catch((error) => {
                      console.log("Failed to send mail.");
                    });
                }
              });
            } else {
              console.log(false);
            }
          }
        }
      }
    }
  });
};

const calculateDaysLeft = (dateProp, daysToAdd) => {
  const date = new Date(dateProp);

  const dateAfterCustomDays = new Date(
    date.getTime() + daysToAdd * 24 * 60 * 60 * 1000
  );

  const currentDate = new Date();

  const differenceMilliseconds =
    dateAfterCustomDays.getTime() - currentDate.getTime();

  const daysLeft = Math.ceil(differenceMilliseconds / (1000 * 3600 * 24));

  return daysLeft;
};

export { checkDocumentsToArchive, checkPendingDocuments, keepAlive };
