import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CreateCollection from "./pages/CreateCollection";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="py-10">
        <Routes>
          <Route path="/" element={<CreateCollection />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
