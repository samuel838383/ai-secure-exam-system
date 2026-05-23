import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function FacultyLogin() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  const handleLogin = () => {

    if (

  (

    username === "rajaram"

    &&

    password === "rajaram@123"

  )

  ||

  (

    username === "janani"

    &&

    password === "janani@123"

  )

){

      navigate("/faculty-dashboard");

    } else {

      setError("Invalid Faculty Login");

    }

  };



  return (

    <div

      style={{

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: "#f4f6f9",

        fontFamily: "Arial"

      }}

    >

      <div

        style={{

          background: "white",

          padding: "40px",

          width: "400px",

          borderRadius: "10px",

          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"

        }}

      >

        <h1

          style={{

            textAlign: "center"

          }}

        >

          Faculty Login

        </h1>



        <input

          type="text"

          placeholder="Username"

          value={username}

          onChange={(e) =>

            setUsername(e.target.value)

          }

          style={{

            width: "100%",

            padding: "12px",

            marginTop: "20px"

          }}

        />



        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>

            setPassword(e.target.value)

          }

          style={{

            width: "100%",

            padding: "12px",

            marginTop: "20px"

          }}

        />



        {error && (

          <p style={{ color: "red" }}>

            {error}

          </p>

        )}



        <button

          onClick={handleLogin}

          style={{

            width: "100%",

            padding: "12px",

            marginTop: "20px",

            backgroundColor: "#007bff",

            color: "white",

            border: "none",

            borderRadius: "5px",

            cursor: "pointer"

          }}

        >

          Login

        </button>

      </div>

    </div>

  );

}

export default FacultyLogin;