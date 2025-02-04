import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./page/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
