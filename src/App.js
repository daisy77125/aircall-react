import PaginationBar from "./components/PaginationBar.js";
import Header from "./components/Header.js";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container-view">
          <Routes></Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
