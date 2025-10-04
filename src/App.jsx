import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./Auth/RegistrationForm";
import EnhancedRegistrationForm from "./Auth/EnhancedRegistrationForm";
import LoginForm from "./Auth/LoginForm";
import "./App.css";
import "./Auth/LoginForm.module.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<EnhancedRegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;
