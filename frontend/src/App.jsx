import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorSpace from "./pages/DoctorSpace";
import ConsultationPage from "./pages/ConsultationPage";
import AdminAuth from "./pages/AdminAuth";
import ProtectedLayout from "./components/ProtectedLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route pour l'authentification admin */}
        <Route path="/admin-auth" element={<AdminAuth />} />

        {/* Routes protégées avec le Sidebar */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedLayout>
              <Doctors />
            </ProtectedLayout>
          }
        />
        <Route
          path="/consultations/:patientId"
          element={
            <ProtectedLayout>
              <ConsultationPage />
            </ProtectedLayout>
          }
        />

        {/* Routes sans le Sidebar */}
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor-space/:id" element={<DoctorSpace />} />
      </Routes>
    </Router>
  );
};

export default App;
