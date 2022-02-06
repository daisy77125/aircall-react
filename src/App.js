import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginationBar from "./components/PaginationBar.jsx";
import Header from "./components/Header.jsx";
import ActivityBoard from "./components/ActivityBoard.jsx";
import ActivityDetail from "./components/ActivityDetail.jsx";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <div className="container-view">
          <Routes>
            <Route path="/" exact element={<ActivityBoard />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
