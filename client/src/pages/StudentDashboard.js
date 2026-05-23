import React, {

  useEffect,

  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import axios from "axios";

import jsPDF from "jspdf";



function StudentDashboard() {



  const navigate = useNavigate();



  const student = JSON.parse(

    localStorage.getItem("student")

  );



  const [completedExam, setCompletedExam] = useState(false);

  const [studentResult, setStudentResult] = useState(null);



  // ---------------- CHECK EXAM STATUS ----------------



  useEffect(() => {

    checkExamStatus();

  }, []);




  const checkExamStatus = async () => {

    try {

      const response = await axios.get(

        "http://localhost:5000/students"

      );



      const resultData = response.data.find(

        (exam) =>

          exam.regno?.trim() ===

            student.regno?.trim()

          &&

          exam.subject?.trim() === "NLP"

      );



      if (resultData) {

        setCompletedExam(true);

        setStudentResult(resultData);

      }



    } catch (error) {

      console.log(error);

    }

  };



  // ---------------- DOWNLOAD PDF ----------------



  const downloadResultPDF = () => {



    if (!studentResult) return;



    const doc = new jsPDF();



    doc.setFontSize(22);

    doc.text(

      "AI Secure Examination Result",

      20,

      20

    );



    doc.setFontSize(14);



    doc.text(

      `Student Name: ${student.name}`,

      20,

      50

    );



    doc.text(

      `Register Number: ${student.regno}`,

      20,

      60

    );



    doc.text(

      `Class: ${student.class}`,

      20,

      70

    );



    doc.text(

      `Subject: NLP`,

      20,

      80

    );



    doc.text(

      `CIA: CIA 1`,

      20,

      90

    );



    doc.text(

      `Part A Marks: ${studentResult.partAScore}/20`,

      20,

      110

    );



    doc.text(

      `Part B Marks: ${studentResult.partBMarks || 0}/30`,

      20,

      120

    );



    doc.text(

      `Final Marks: ${studentResult.totalMarks || 0}/50`,

      20,

      130

    );



    doc.text(

      `Status: Evaluated`,

      20,

      140

    );



    doc.text(

      `Faculty Signature: ____________`,

      20,

      170

    );



    doc.save(

      `${student.regno}_NLP_Result.pdf`

    );

  };



  return (

    <div

      style={{

        minHeight: "100vh",

        background:

          "linear-gradient(135deg,#dbeafe,#f8fafc)",

        padding: "40px",

        fontFamily: "Poppins"

      }}

    >

      {/* STUDENT INFO */}



      <div

        style={{

          background: "white",

          padding: "40px",

          borderRadius: "25px",

          marginBottom: "40px",

          boxShadow:

            "0px 10px 25px rgba(0,0,0,0.08)"

        }}

      >

        <h1

          style={{

            fontSize: "52px",

            color: "#0f172a",

            marginBottom: "20px"

          }}

        >

          🎓 Student Dashboard

        </h1>



        <h2>

          Welcome,

          {" "}

          {student.name}

        </h2>



        <h3>

          Register No:

          {" "}

          {student.regno}

        </h3>



        <h3>

          Class:

          {" "}

          {student.class}

        </h3>

      </div>



      {/* CIA 1 */}



      <div

        style={{

          background: "white",

          padding: "40px",

          borderRadius: "25px",

          boxShadow:

            "0px 10px 25px rgba(0,0,0,0.08)"

        }}

      >

        <h1

          style={{

            color: "#16a34a",

            marginBottom: "35px"

          }}

        >

          ✅ CIA 1 Active Exams

        </h1>



        <div

          style={{

            display: "grid",

            gridTemplateColumns:

              "repeat(auto-fit,minmax(300px,1fr))",

            gap: "25px"

          }}

        >

          {/* NLP CARD */}



          <div

            style={{

              background:

                "linear-gradient(135deg,#2563eb,#1d4ed8)",

              padding: "35px",

              borderRadius: "24px",

              color: "white",

              boxShadow:

                "0px 12px 25px rgba(37,99,235,0.3)"

            }}

          >

            <div

              style={{

                fontSize: "50px",

                marginBottom: "15px"

              }}

            >

              🧠

            </div>



            <h1>NLP</h1>



            <p

              style={{

                marginTop: "10px",

                marginBottom: "25px"

              }}

            >

              Natural Language Processing Examination

            </p>



            {

              completedExam ? (

                <button

                  disabled

                  style={{

                    padding: "14px 30px",

                    background: "#16a34a",

                    color: "white",

                    border: "none",

                    borderRadius: "14px",

                    fontWeight: "700",

                    width: "100%"

                  }}

                >

                  ✅ Completed

                </button>

              ) : (

                <button

                  onClick={() =>

                    navigate("/exam")

                  }

                  style={{

                    padding: "14px 30px",

                    background: "white",

                    color: "#2563eb",

                    border: "none",

                    borderRadius: "14px",

                    fontWeight: "700",

                    width: "100%",

                    cursor: "pointer"

                  }}

                >

                  Start Examination →

                </button>

              )

            }

          </div>



          {/* RESULT CARD */}



          {

            studentResult && (

              <div

                style={{

                  background:

                    "linear-gradient(135deg,#0f172a,#1e293b)",

                  padding: "35px",

                  borderRadius: "24px",

                  color: "white",

                  boxShadow:

                    "0px 12px 25px rgba(15,23,42,0.3)"

                }}

              >

                <div

                  style={{

                    fontSize: "45px",

                    marginBottom: "15px"

                  }}

                >

                  📊

                </div>



                <h1>

                  NLP Result

                </h1>



                <div

                  style={{

                    marginTop: "25px",

                    lineHeight: "2"

                  }}

                >

                  <h3>

                    Status:

                    {" "}

                    Evaluated

                  </h3>



                  <h3>

                    Part A:

                    {" "}

                    {studentResult.partAScore}/20

                  </h3>



                  <h3>

                    Part B:

                    {" "}

                    {studentResult.partBMarks || 0}/30

                  </h3>



                  <h2>

                    Final Marks:

                    {" "}

                    {studentResult.totalMarks || 0}/50

                  </h2>

                </div>



                <button

                  onClick={downloadResultPDF}

                  style={{

                    marginTop: "25px",

                    padding: "14px 24px",

                    background:

                      "linear-gradient(to right,#2563eb,#3b82f6)",

                    color: "white",

                    border: "none",

                    borderRadius: "14px",

                    fontWeight: "700",

                    width: "100%",

                    cursor: "pointer"

                  }}

                >

                  ⬇ Download Result PDF

                </button>

              </div>

            )

          }



          {/* OTHER SUBJECTS */}



          {[

            {

              name: "CC",

              icon: "💻"

            },

            {

              name: "KE",

              icon: "📘"

            },

            {

              name: "HCI",

              icon: "🖥"

            },

            {

              name: "CCS",

              icon: "🔐"

            }

          ].map((subject) => (

            <div

              key={subject.name}

              style={{

                background: "white",

                padding: "35px",

                borderRadius: "24px",

                textAlign: "center",

                border:

                  "1px solid #e2e8f0",

                boxShadow:

                  "0px 5px 15px rgba(0,0,0,0.05)"

              }}

            >

              <div

                style={{

                  fontSize: "42px",

                  marginBottom: "15px"

                }}

              >

                {subject.icon}

              </div>



              <h2>

                {subject.name}

              </h2>



              <button

                disabled

                style={{

                  marginTop: "20px",

                  padding: "14px 24px",

                  background: "#cbd5e1",

                  color: "#475569",

                  border: "none",

                  borderRadius: "14px",

                  fontWeight: "700",

                  width: "100%"

                }}

              >

                Not Yet Scheduled

              </button>

            </div>

          ))}

        </div>

      </div>



      {/* CIA 2 */}



      <div

        style={{

          background: "white",

          padding: "40px",

          borderRadius: "25px",

          marginTop: "40px",

          boxShadow:

            "0px 10px 25px rgba(0,0,0,0.08)"

        }}

      >

        <h1

          style={{

            color: "#dc2626"

          }}

        >

          ❌ CIA 2

        </h1>



        <h3>

          Exams Not Yet Scheduled

        </h3>

      </div>



      {/* CIA 3 */}



      <div

        style={{

          background: "white",

          padding: "40px",

          borderRadius: "25px",

          marginTop: "40px",

          boxShadow:

            "0px 10px 25px rgba(0,0,0,0.08)"

        }}

      >

        <h1

          style={{

            color: "#dc2626"

          }}

        >

          ❌ CIA 3

        </h1>



        <h3>

          Exams Not Yet Scheduled

        </h3>

      </div>

    </div>

  );

}



export default StudentDashboard;