import React from "react";
import { Navigate } from "react-router-dom";
import Header from "./Header";;


const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem("token"); // Vérifiez si le token existe

  if (!token) {
    return <Navigate to="/admin-auth" />; // Rediriger vers la page de connexion si non authentifié
  }

  return (
    <div className="flex">
      <Header />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default ProtectedLayout;