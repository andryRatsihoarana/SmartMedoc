import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorName, setDoctorName] = useState(""); // État pour afficher le nom du médecin
  const navigate = useNavigate();
  const location = useLocation();

  // Exemple de données fictives pour les médecins
  const doctors = [
    { id: "1", name: "John Doe", email: "john.doe@example.com", password: "password123" },
    { id: "2", name: "Jane Smith", email: "jane.smith@example.com", password: "password456" },
  ];

  // Récupérer le nom du médecin depuis l'URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const nameFromUrl = queryParams.get("doctorName");
    if (nameFromUrl) {
      setDoctorName(decodeURIComponent(nameFromUrl));
    }
  }, [location.search]);

  // Fonction pour gérer la connexion
  const handleLogin = (e) => {
    e.preventDefault();

    // Vérification des informations d'identification
    const doctor = doctors.find(
      (doc) => doc.email === email.trim() && doc.password === password.trim()
    );

    if (doctor) {
      // Redirige vers DoctorSpace avec l'ID du médecin
      navigate(`/doctor-space/${doctor.id}`);
    } else {
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">
          Connexion {doctorName && `: ${doctorName}`}
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;