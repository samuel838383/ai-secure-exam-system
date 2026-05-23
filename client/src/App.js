import React from "react";

import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";

import Login from "./pages/Login";

import Exam from "./pages/Exam";

import FacultyLogin from "./pages/FacultyLogin";

import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route

          path="/"

          element={<Login />}

        />



        <Route

          path="/exam"

          element={<Exam />}

        />



        <Route

          path="/faculty"

          element={<FacultyLogin />}

        />



        <Route

          path="/faculty-dashboard"

          element={<FacultyDashboard />}

        />

        <Route

  path="/dashboard"

  element={<StudentDashboard />}

/>

      </Routes>

    </BrowserRouter>

  );

}

export default App;