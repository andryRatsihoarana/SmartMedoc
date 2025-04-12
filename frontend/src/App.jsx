import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorSpace from "./pages/DoctorSpace";
import Header from "./components/Header";
import ConsultationPage from "./pages/ConsultationPage"; // Import de la page de consultation
import AdminAuth from "./pages/AdminAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin-auth" element={<AdminAuth />} />
        {/* Routes avec le sidebar */}
        <Route
          path="/"
          element={
            <div className="flex">
              <Header />
              <main className="flex-1 p-4">
                <Dashboard />
              </main>
            </div>
          }
        />
        <Route
          path="/doctors"
          element={
            <div className="flex">
              <Header />
              <main className="flex-1 p-4">
                <Doctors />
              </main>
            </div>
          }
        />

        {/* Routes sans le sidebar */}
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-space/:id" element={<DoctorSpace />} />
        <Route path="/consultations/:patientId" element={<ConsultationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
