import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoalDashboard from './components/GoalDashboard';
import GoalDetails from './components/GoalDetails';
import Expenses from './components/Expenses';
import Header from './components/Header/Header';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Header title="Expenses and Goal Tracker" userName="Abby" />
      <Routes>
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/goal/:id" element={<GoalDetails />} />
        <Route path="/goals" element={<GoalDashboard />} />
        <Route path="/" element={<Expenses />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
