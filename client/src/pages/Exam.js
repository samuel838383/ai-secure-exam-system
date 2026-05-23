import React, {

  useState,

  useEffect,

  useRef

} from "react";

import axios from "axios";

import data from "../data/questions";

import * as faceapi from "face-api.js";



const shuffleArray = (array) => {

  return [...array].sort(

    () => Math.random() - 0.5

  );

};



function Exam() {



  const videoRef = useRef();



  const student = JSON.parse(

    localStorage.getItem("student")

  );



  // ---------------- STATES ----------------



  const [partA] = useState(

    shuffleArray(

      data.partA.map((question) => ({

        ...question,

        options: shuffleArray(

          question.options

        )

      }))

    )

  );



  const partB = data.partB;



  const [currentQuestion, setCurrentQuestion] = useState(0);



  const [selectedAnswers, setSelectedAnswers] = useState({});



  const [descriptiveAnswers, setDescriptiveAnswers] = useState({});



  const [examFinished, setExamFinished] = useState(false);



  const [score, setScore] = useState(0);



  const [warningCount, setWarningCount] = useState(0);



  const [timeLeft, setTimeLeft] = useState(5400);



  // ---------------- TIMER ----------------



  useEffect(() => {

    if (timeLeft > 0 && !examFinished) {

      const timer = setTimeout(() => {

        setTimeLeft(timeLeft - 1);

      }, 1000);



      return () => clearTimeout(timer);

    }



    if (timeLeft === 0) {

      alert(

        "⏳ Time Over - Exam Submitted"

      );



      finishExam();

    }

  }, [timeLeft, examFinished]);



  // ---------------- FULLSCREEN ----------------



  useEffect(() => {

    setTimeout(() => {

      enterFullscreen();

    }, 1000);

  }, []);




  const enterFullscreen = async () => {

    const elem = document.documentElement;



    try {

      if (elem.requestFullscreen) {

        await elem.requestFullscreen();

      }

    } catch (error) {

      console.log(error);

    }

  };



  // ---------------- TAB SWITCH ----------------



  useEffect(() => {

    const handleVisibilityChange = () => {

      if (document.hidden) {

        const newWarning =

          warningCount + 1;



        setWarningCount(newWarning);



        alert(

          `⚠ Warning ${newWarning}: Tab Switching Detected`

        );



        if (newWarning >= 3) {

          alert(

            "🚫 Exam Auto Submitted"

          );



          finishExam();

        }

      }

    };



    document.addEventListener(

      "visibilitychange",

      handleVisibilityChange

    );



    return () => {

      document.removeEventListener(

        "visibilitychange",

        handleVisibilityChange

      );

    };

  }, [warningCount]);



  // ---------------- COPY PASTE SECURITY ----------------



  useEffect(() => {

    // Disable Right Click

    const disableRightClick = (e) => {

      e.preventDefault();

    };



    // Disable Copy

    const disableCopy = (e) => {

      e.preventDefault();

    };



    // Disable Paste

    const disablePaste = (e) => {

      e.preventDefault();

    };



    // Disable Cut

    const disableCut = (e) => {

      e.preventDefault();

    };



    // Disable Keyboard Shortcuts

    const disableKeys = (e) => {

      if (

        (e.ctrlKey && e.key === "c")

        ||

        (e.ctrlKey && e.key === "v")

        ||

        (e.ctrlKey && e.key === "x")

        ||

        (e.ctrlKey && e.key === "u")

        ||

        (e.ctrlKey && e.key === "a")

        ||

        (e.ctrlKey && e.key === "s")

      ) {

        e.preventDefault();



        alert(

          "⚠ Copy Paste Not Allowed During Exam"

        );

      }

    };



    document.addEventListener(

      "contextmenu",

      disableRightClick

    );



    document.addEventListener(

      "copy",

      disableCopy

    );



    document.addEventListener(

      "paste",

      disablePaste

    );



    document.addEventListener(

      "cut",

      disableCut

    );



    document.addEventListener(

      "keydown",

      disableKeys

    );



    return () => {

      document.removeEventListener(

        "contextmenu",

        disableRightClick

      );



      document.removeEventListener(

        "copy",

        disableCopy

      );



      document.removeEventListener(

        "paste",

        disablePaste

      );



      document.removeEventListener(

        "cut",

        disableCut

      );



      document.removeEventListener(

        "keydown",

        disableKeys

      );

    };

  }, []);




  // ---------------- SELECT ANSWER ----------------



  const handleAnswerSelect = (

    option

  ) => {

    setSelectedAnswers({

      ...selectedAnswers,

      [currentQuestion]: option

    });

  };



  // ---------------- DESCRIPTIVE ANSWERS ----------------



  const handleDescriptiveAnswer = (

    index,

    value

  ) => {

    const words = value

      .trim()

      .split(/\s+/);



    if (words.length <= 300) {

      setDescriptiveAnswers({

        ...descriptiveAnswers,

        [index]: value

      });

    }

  };



  // ---------------- NEXT QUESTION ----------------



  const nextQuestion = () => {

    if (

      currentQuestion <

      partA.length - 1

    ) {

      setCurrentQuestion(

        currentQuestion + 1

      );

    }

  };



  // ---------------- FINISH EXAM ----------------



  const finishExam = async () => {

    let finalScore = 0;



    partA.forEach((question, index) => {

      if (

        selectedAnswers[index] ===

        question.answer

      ) {

        finalScore += 2;

      }

    });



    localStorage.setItem(

      "descriptiveAnswers",

      JSON.stringify(descriptiveAnswers)

    );



    localStorage.setItem(

      "partAScore",

      finalScore

    );



    try {

      await axios.post(

        "http://localhost:5000/submit-exam",

        {

          name: student.name,

          regno: student.regno,

          studentClass: student.class,

          subject: "NLP",

          partAScore: finalScore,

          partBAnswer1:

            descriptiveAnswers[0] || "",

          partBAnswer2:

            descriptiveAnswers[1] || "",

          partBAnswer3:

            descriptiveAnswers[2] || "",

          totalMarks: finalScore

        }

      );



      console.log(

        "Submission Saved"

      );



    } catch (error) {

      console.log(error);

    }



    setScore(finalScore);

    setExamFinished(true);

  };



  // ---------------- RESULT PAGE ----------------



  if (examFinished) {

    return (

      <div

        style={{

          minHeight: "100vh",

          backgroundColor: "#f4f6f9",

          padding: "40px",

          fontFamily: "Poppins"

        }}

      >

        <div

          style={{

            background: "white",

            maxWidth: "1000px",

            margin: "auto",

            padding: "30px",

            borderRadius: "20px",

            boxShadow:

              "0px 0px 20px rgba(0,0,0,0.1)"

          }}

        >

          <h1>

            ✅ Exam Submitted Successfully

          </h1>



          <hr />



          <h2>

            Student Details

          </h2>



          <p>

            <strong>Name:</strong>

            {" "}

            {student.name}

          </p>



          <p>

            <strong>Register No:</strong>

            {" "}

            {student.regno}

          </p>



          <p>

            <strong>Class:</strong>

            {" "}

            {student.class}

          </p>



          <hr />



          <h2>

            PART A Score:

            {" "}

            {score}/20

          </h2>



          <h2>

            PART B:

            Manual Evaluation

          </h2>



          <h2>

            Total Marks:

            {" "}

            50

          </h2>



          <h3>

            Warnings:

            {" "}

            {warningCount}

          </h3>

        </div>

      </div>

    );

  }



  // ---------------- EXAM PAGE ----------------



  return (

    <div

      style={{

        padding: "40px",

        minHeight: "100vh",

        background:

          "linear-gradient(135deg,#e0f2fe,#f8fafc)",

        fontFamily: "Poppins"

      }}

    >

      <div

        style={{

          background: "white",

          maxWidth: "1000px",

          margin: "auto",

          padding: "35px",

          borderRadius: "20px",

          boxShadow:

            "0px 0px 20px rgba(0,0,0,0.1)"

        }}

      >

        <h1

          style={{

            color: "#1e293b"

          }}

        >

          🎓 Secure Offline Examination

        </h1>



        <hr />



        <h3>

          Name:

          {" "}

          {student.name}

        </h3>



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



        <hr />



        <div

          style={{

            display: "flex",

            justifyContent:

              "space-between"

          }}

        >

          <h3>

            ⏳ Time Left:

            {" "}

            {Math.floor(timeLeft / 60)}m

            {" "}

            {timeLeft % 60}s

          </h3>



          <h3>

            ⚠ Warnings:

            {" "}

            {warningCount}/3

          </h3>

        </div>



        <hr />



        {/* PART A */}



        <h2>

          PART A — MCQ

        </h2>



        <h3>

          Question

          {" "}

          {currentQuestion + 1}

        </h3>



        <p>

          {

            partA[currentQuestion]

              .question

          }

        </p>



        {

          partA[currentQuestion]

            .options.map(

              (option, index) => (

                <div

                  key={index}

                  style={{

                    marginBottom: "15px"

                  }}

                >

                  <label>

                    <input

                      type="radio"

                      name="option"

                      value={option}

                      checked={

                        selectedAnswers[

                          currentQuestion

                        ] === option

                      }

                      onChange={() =>

                        handleAnswerSelect(

                          option

                        )

                      }

                    />

                    {" "}

                    {option}

                  </label>

                </div>

              )

            )

        }



        <br />



        {

          currentQuestion <

            partA.length - 1 && (

            <button

              onClick={nextQuestion}

              style={{

                padding: "14px 28px",

                background:

                  "linear-gradient(to right,#2563eb,#1d4ed8)",

                color: "white",

                border: "none",

                borderRadius: "12px",

                fontWeight: "600",

                fontSize: "16px",

                cursor: "pointer"

              }}

            >

              Next Question

            </button>

          )

        }



        <hr

          style={{

            marginTop: "50px"

          }}

        />



        {/* PART B */}



        <h2>

          PART B — Descriptive

        </h2>



        {

          partB.map(

            (question, index) => (

              <div

                key={index}

                style={{

                  marginBottom: "40px"

                }}

              >

                <h3>

                  Question

                  {" "}

                  {index + 1}

                </h3>



                <p>

                  {question.question}

                </p>



                <textarea

                  rows="8"

                  cols="100"

                  placeholder="Write your answer here"

                  value={

                    descriptiveAnswers[index] || ""

                  }

                  onChange={(e) =>

                    handleDescriptiveAnswer(

                      index,

                      e.target.value

                    )

                  }

                  style={{

                    width: "100%",

                    padding: "15px",

                    borderRadius: "12px",

                    border:

                      "1px solid #cbd5e1",

                    fontSize: "15px"

                  }}

                />



                <p>

                  Word Count:

                  {" "}

                  {

                    descriptiveAnswers[index]

                      ? descriptiveAnswers[

                          index

                        ]

                          .trim()

                          .split(/\s+/)

                          .length

                      : 0

                  }

                  /300

                </p>

              </div>

            )

          )

        }



        {/* FINAL SUBMIT */}



        <div

          style={{

            marginTop: "40px",

            textAlign: "center"

          }}

        >

          <button

            onClick={finishExam}

            style={{

              padding: "16px 40px",

              background:

                "linear-gradient(to right,#16a34a,#15803d)",

              color: "white",

              border: "none",

              borderRadius: "14px",

              fontSize: "18px",

              fontWeight: "600",

              cursor: "pointer"

            }}

          >

            ✅ Submit Final Exam

          </button>

        </div>

      </div>

    </div>

  );

}



export default Exam;