const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3").verbose();



// ---------------- APP ----------------

const app = express();

app.use(cors());

app.use(bodyParser.json());



// ---------------- DATABASE ----------------

const db = new sqlite3.Database(

  "./exam.db",

  (err) => {

    if (err) {

      console.log(err.message);

    } else {

      console.log(

        "SQLite Connected"

      );

    }

  }

);



// ---------------- CREATE TABLE ----------------

db.run(`

CREATE TABLE IF NOT EXISTS submissions (

  id INTEGER PRIMARY KEY AUTOINCREMENT,

  name TEXT,

  regno TEXT,

  class TEXT,

  subject TEXT,

  partAScore INTEGER,

  partBAnswer1 TEXT,

  partBAnswer2 TEXT,

  partBAnswer3 TEXT,

  partBMarks INTEGER DEFAULT 0,

  totalMarks INTEGER DEFAULT 0

)

`);



// ---------------- SAVE EXAM ----------------

app.post(

  "/submit-exam",

  (req, res) => {

    const {

      name,

      regno,

      studentClass,

      subject,

      partAScore,

      partBAnswer1,

      partBAnswer2,

      partBAnswer3,

      totalMarks

    } = req.body;



    // CHECK IF SAME STUDENT ALREADY WROTE SAME SUBJECT



    db.get(

      `

      SELECT * FROM submissions

      WHERE regno = ?

      AND subject = ?

      `,

      [

        regno,

        subject

      ],

      (err, row) => {



        if (row) {

          return res.status(400).json({

            message:

              "Student already completed this exam"

          });

        }



        // INSERT NEW EXAM



        db.run(

          `

          INSERT INTO submissions (

            name,

            regno,

            class,

            subject,

            partAScore,

            partBAnswer1,

            partBAnswer2,

            partBAnswer3,

            totalMarks

          )

          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

          `,

          [

            name,

            regno,

            studentClass,

            subject,

            partAScore,

            partBAnswer1,

            partBAnswer2,

            partBAnswer3,

            totalMarks

          ],

          function(err) {

            if (err) {

              res.status(500).json({

                error: err.message

              });

            } else {

              res.json({

                message:

                  "Submission Saved Successfully"

              });

            }

          }

        );



      }

    );

  }

);



// ---------------- GET STUDENTS ----------------

app.get(

  "/students",

  (req, res) => {

    db.all(

      "SELECT * FROM submissions",

      [],

      (err, rows) => {

        if (err) {

          res.status(500).json({

            error: err.message

          });

        } else {

          res.json(rows);

        }

      }

    );

  }

);



// ---------------- UPDATE MARKS ----------------

app.put(

  "/update-marks/:id",

  (req, res) => {

    const id = req.params.id;



    const {

      partBMarks,

      totalMarks

    } = req.body;



    db.run(

      `

      UPDATE submissions

      SET

        partBMarks = ?,

        totalMarks = ?

      WHERE id = ?

      `,

      [

        partBMarks,

        totalMarks,

        id

      ],

      function(err) {

        if (err) {

          res.status(500).json({

            error: err.message

          });

        } else {

          res.json({

            message:

              "Marks Updated Successfully"

          });

        }

      }

    );

  }

);



// ---------------- DELETE ALL DATA ----------------

app.delete(

  "/delete-all",

  (req, res) => {

    db.run(

      "DELETE FROM submissions",

      function(err) {

        if (err) {

          res.status(500).json({

            error: err.message

          });

        } else {

          res.json({

            message:

              "All Student Records Deleted"

          });

        }

      }

    );

  }

);



// ---------------- SERVER ----------------

app.listen(5000, () => {

  console.log(

    "Server running on port 5000"

  );

});