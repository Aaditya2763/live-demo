import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Dashboard from "./pages/dashboard";

import AddShift from "./components/addShift/addShift";
import "bootstrap/dist/css/bootstrap.min.css";
import UpdateShift from "./components/updateShift/updateShift";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-shift" element={<AddShift />} />
          <Route path="/update-shift/:id" element={<UpdateShift />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
