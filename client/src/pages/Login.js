import React, {

  useState

} from "react";

import {

  useNavigate

} from "react-router-dom";

import students from "../data/students";



function Login() {



  const navigate = useNavigate();



  const [regno, setRegno] = useState("");



  const startExam = () => {



    const student = students.find(

      (s) =>

        s.regno === regno

    );



    if (!student) {

      alert(

        "Invalid Register Number"

      );

      return;

    }



    localStorage.setItem(

      "student",

      JSON.stringify(student)

    );



    navigate("/dashboard");

  };



  return (

    <div

      style={{

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:

          "linear-gradient(135deg, #dbeafe, #f1f5f9)",

        fontFamily:

          "'Poppins', sans-serif"

      }}

    >

      <div

        style={{

          width: "420px",

          background: "white",

          padding: "45px",

          borderRadius: "20px",

          boxShadow:

            "0 10px 25px rgba(0,0,0,0.15)"

        }}

      >

        <h1

          style={{

            textAlign: "center",

            color: "#1e293b",

            fontSize: "42px",

            marginBottom: "10px",

            fontWeight: "700"

          }}

        >

          🎓 AI Secure

          <br />

          Examination

        </h1>



        <p

          style={{

            textAlign: "center",

            color: "#64748b",

            marginBottom: "35px",

            fontSize: "16px"

          }}

        >

          Smart Offline Assessment Platform

        </p>



        <div

          style={{

            marginBottom: "25px"

          }}

        >

          <label

            style={{

              display: "block",

              marginBottom: "10px",

              color: "#334155",

              fontWeight: "600"

            }}

          >

            Register Number

          </label>



          <input

            type="text"

            placeholder="Enter Register Number"

            value={regno}

            onChange={(e) =>

              setRegno(e.target.value)

            }

            style={{

              width: "100%",

              padding: "15px",

              borderRadius: "10px",

              border:

                "1px solid #cbd5e1",

              outline: "none",

              fontSize: "16px",

              boxSizing: "border-box"

            }}

          />

        </div>



        <button

          onClick={startExam}

          style={{

            width: "100%",

            padding: "15px",

            background:

              "linear-gradient(to right, #2563eb, #1d4ed8)",

            color: "white",

            border: "none",

            borderRadius: "10px",

            fontSize: "18px",

            fontWeight: "600",

            cursor: "pointer",

            transition: "0.3s"

          }}

        >

          Login & Start Exam

        </button>



        <div

          style={{

            marginTop: "30px",

            background: "#f8fafc",

            padding: "15px",

            borderRadius: "10px",

            border:

              "1px solid #e2e8f0"

          }}

        >

          <h4

            style={{

              marginTop: 0,

              color: "#1e293b"

            }}

          >

            Demo Students

          </h4>



          <p

            style={{

              marginBottom: "8px",

              color: "#475569"

            }}

          >

            Samuel →

            23JUAI234

          </p>



          <p

            style={{

              margin: 0,

              color: "#475569"

            }}

          >

            Nebinson →

            23JUAI108

          </p>

        </div>

      </div>

    </div>

  );

}



export default Login;