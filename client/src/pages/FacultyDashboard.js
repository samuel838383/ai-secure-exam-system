import React, {

  useState,

  useEffect

} from "react";

import axios from "axios";

import jsPDF from "jspdf";

import data from "../data/questions";
import stringSimilarity from "string-similarity";


function FacultyDashboard() {



  const partB = data.partB;



  // ---------------- STATES ----------------



  const [students, setStudents] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState(null);



  const [q1Marks, setQ1Marks] = useState(0);

  const [q2Marks, setQ2Marks] = useState(0);

  const [q3Marks, setQ3Marks] = useState(0);



  // ---------------- FETCH STUDENTS ----------------



  useEffect(() => {

    fetchStudents();

  }, []);



  const fetchStudents = async () => {

    try {

      const response = await axios.get(

        "http://localhost:5000/students"

      );



      // SORT BY TOTAL MARKS DESCENDING

      const sortedStudents = response.data.sort(

        (a, b) =>

          (b.totalMarks || b.partAScore || 0)

          -

          (a.totalMarks || a.partAScore || 0)

      );



      setStudents(sortedStudents);

    } catch (error) {

      console.log(error);

    }

  };



  // ---------------- TOTALS ----------------



  const partBTotal =

    Number(q1Marks)

    +

    Number(q2Marks)

    +

    Number(q3Marks);



  const finalTotal =

    (selectedStudent?.partAScore || 0)

    +

    partBTotal;



  // ---------------- TOP SCORE ----------------



  const topScore =

    students.length > 0

      ? Math.max(

          ...students.map(

            (student) =>

              student.totalMarks ||

              student.partAScore ||

              0

          )

        )

      : 0;



  // ---------------- SAVE MARKS ----------------



  const saveMarks = async () => {

    if (!selectedStudent) {

      alert("Select Student");

      return;

    }



    try {

      const updatedPartB =

        Number(q1Marks)

        +

        Number(q2Marks)

        +

        Number(q3Marks);



      const updatedTotal =

        Number(selectedStudent.partAScore)

        +

        updatedPartB;



      await axios.put(

        `http://localhost:5000/update-marks/${selectedStudent.id}`,

        {

          partBMarks: updatedPartB,

          totalMarks: updatedTotal

        }

      );



      await fetchStudents();



      alert(

        "Marks Saved Successfully"

      );



    } catch (error) {

      console.log(error);

    }

  };



  // ---------------- PDF ----------------



  const downloadPDF = () => {



    if (!selectedStudent) {

      alert("Select Student");

      return;

    }



    const doc = new jsPDF();



    doc.setFontSize(20);



    doc.text(

      "Offline Examination Report",

      20,

      20

    );



    doc.setFontSize(14);



    doc.text(

      `Student Name: ${selectedStudent.name}`,

      20,

      40

    );



    doc.text(

      `Register No: ${selectedStudent.regno}`,

      20,

      50

    );



    doc.text(

      `Class: ${selectedStudent.class}`,

      20,

      60

    );



    doc.text(

      `Part A Score: ${selectedStudent.partAScore}/20`,

      20,

      80

    );



    doc.text(

      `Part B Score: ${partBTotal}/30`,

      20,

      90

    );



    doc.text(

      `Final Total: ${finalTotal}/50`,

      20,

      100

    );



    doc.save(

      `${selectedStudent.regno}_Result.pdf`

    );

  };



  return (

    <div

      style={{

        padding: "40px",

        background:

          "linear-gradient(135deg, #e0f2fe, #f8fafc)",

        minHeight: "100vh",

        fontFamily: "Poppins, sans-serif"

      }}

    >

      <div

        style={{

          background: "white",

          padding: "35px",

          borderRadius: "22px",

          maxWidth: "1400px",

          margin: "auto",

          boxShadow:

            "0 15px 40px rgba(0,0,0,0.12)"

        }}

      >



        {/* HEADER */}



        <div

          style={{

            display: "flex",

            justifyContent: "space-between",

            alignItems: "center",

            marginBottom: "30px"

          }}

        >

          <div>

            <h1

              style={{

                margin: 0,

                color: "#0f172a",

                fontSize: "40px"

              }}

            >

              🎓 Faculty Dashboard

            </h1>



            <p

              style={{

                color: "#64748b",

                marginTop: "10px"

              }}

            >

              AI Examination Result Management System

            </p>

          </div>



          <div

            style={{

              background:

                "linear-gradient(to right, #2563eb, #1d4ed8)",

              color: "white",

              padding: "14px 24px",

              borderRadius: "14px",

              fontWeight: "600"

            }}

          >

            👨‍🏫 Faculty Access

          </div>

        </div>



        {/* STATS */}



        <div

          style={{

            display: "grid",

            gridTemplateColumns:

              "repeat(3, 1fr)",

            gap: "20px",

            marginBottom: "35px"

          }}

        >

          <div

            style={{

              background:

                "linear-gradient(to right, #2563eb, #1d4ed8)",

              color: "white",

              padding: "25px",

              borderRadius: "18px"

            }}

          >

            <h3>Total Students</h3>



            <h1>

              {students.length}

            </h1>

          </div>



          <div

            style={{

              background:

                "linear-gradient(to right, #16a34a, #15803d)",

              color: "white",

              padding: "25px",

              borderRadius: "18px"

            }}

          >

            <h3>Top Score</h3>



            <h1>

              {topScore}/50

            </h1>

          </div>



          <div

            style={{

              background:

                "linear-gradient(to right, #ea580c, #c2410c)",

              color: "white",

              padding: "25px",

              borderRadius: "18px"

            }}

          >

            <h3>Evaluation Status</h3>



            <h1>

              Active

            </h1>

          </div>

        </div>



        {/* TABLE */}



        <h2>

          Student Leaderboard

        </h2>



        <table

          border="1"

          cellPadding="14"

          style={{

            width: "100%",

            borderCollapse: "collapse",

            marginBottom: "40px"

          }}

        >

          <thead

            style={{

              background:

                "linear-gradient(to right, #2563eb, #1d4ed8)",

              color: "white"

            }}

          >

            <tr>

              <th>Rank</th>

              <th>Name</th>

              <th>Register No</th>

              <th>Class</th>

              <th>Part A</th>

              <th>Part B</th>

              <th>Total</th>

              <th>Action</th>

            </tr>

          </thead>



          <tbody>

            {students.map((student, index) => (

              <tr

                key={student.id}

                style={{

                  textAlign: "center"

                }}

              >

                <td>

                  {index + 1}

                </td>



                <td>

                  {student.name}

                </td>



                <td>

                  {student.regno}

                </td>



                <td>

                  {student.class}

                </td>



                <td>

                  {student.partAScore}/20

                </td>



                <td>

                  {student.partBMarks || 0}/30

                </td>



                <td>

                  {student.totalMarks || student.partAScore}/50

                </td>



                <td>

                  <button

                    onClick={() => {

                      setSelectedStudent(student);



                      setQ1Marks(0);

                      setQ2Marks(0);

                      setQ3Marks(0);

                    }}

                    style={{

                      padding: "10px 18px",

                      background:

                        "linear-gradient(to right, #2563eb, #1d4ed8)",

                      color: "white",

                      border: "none",

                      borderRadius: "10px",

                      cursor: "pointer"

                    }}

                  >

                    Evaluate

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* EVALUATION PANEL */}

{selectedStudent && (

  <div

    style={{

      marginTop: "40px",

      background: "#f8fafc",

      padding: "30px",

      borderRadius: "20px",

      border: "1px solid #cbd5e1"

    }}

  >

    <h2>

      PART B Evaluation

    </h2>



    <h3>

      Student:

      {" "}

      {selectedStudent.name}

    </h3>



    <h3>

      Register No:

      {" "}

      {selectedStudent.regno}

    </h3>



    <hr />



    {/* QUESTION 1 */}



    <div

      style={{

        marginBottom: "25px"

      }}

    >

      <h3>

        Question 1 Marks / 10

      </h3>



      <input

        type="number"

        value={q1Marks}

        onChange={(e) =>

          setQ1Marks(e.target.value)

        }

        style={{

          width: "300px",

          padding: "14px",

          borderRadius: "10px",

          border: "1px solid #cbd5e1"

        }}

      />

    </div>



    {/* QUESTION 2 */}



    <div

      style={{

        marginBottom: "25px"

      }}

    >

      <h3>

        Question 2 Marks / 10

      </h3>



      <input

        type="number"

        value={q2Marks}

        onChange={(e) =>

          setQ2Marks(e.target.value)

        }

        style={{

          width: "300px",

          padding: "14px",

          borderRadius: "10px",

          border: "1px solid #cbd5e1"

        }}

      />

    </div>



    {/* QUESTION 3 */}



    <div

      style={{

        marginBottom: "25px"

      }}

    >

      <h3>

        Question 3 Marks / 10

      </h3>



      <input

        type="number"

        value={q3Marks}

        onChange={(e) =>

          setQ3Marks(e.target.value)

        }

        style={{

          width: "300px",

          padding: "14px",

          borderRadius: "10px",

          border: "1px solid #cbd5e1"

        }}

      />

    </div>



    {/* BUTTONS */}



    <div

      style={{

        display: "flex",

        gap: "20px",

        marginTop: "30px"

      }}

    >

      <button

        onClick={saveMarks}

        style={{

          padding: "14px 30px",

          background:

            "linear-gradient(to right, #16a34a, #15803d)",

          color: "white",

          border: "none",

          borderRadius: "12px",

          fontWeight: "600",

          cursor: "pointer"

        }}

      >

        Save Marks

      </button>



      <button

        onClick={downloadPDF}

        style={{

          padding: "14px 30px",

          background:

            "linear-gradient(to right, #2563eb, #1d4ed8)",

          color: "white",

          border: "none",

          borderRadius: "12px",

          fontWeight: "600",

          cursor: "pointer"

        }}

      >

        Download PDF

      </button>

    </div>



    <hr

      style={{

        marginTop: "40px"

      }}

    />



    <h1>

      PART B Total:

      {" "}

      {partBTotal}/30

    </h1>



    <h1>

      Final Total:

      {" "}

      {finalTotal}/50

    </h1>

  </div>

)}



      </div>

    </div>

  );

}



export default FacultyDashboard;