import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false); // État pour basculer entre login et sign-up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nom pour le sign-up
  const [error, setError] = useState(""); // État pour afficher les erreurs
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        username: email,
        password,
      });
      const adminData = {
        name: response.data.name, // Assurez-vous que le backend retourne le nom
        email: response.data.email, // Assurez-vous que le backend retourne l'email
      };
      localStorage.setItem("admin", JSON.stringify(adminData)); // Stocker les données de l'admin
      localStorage.setItem("token", response.data.token); // Stocker le token JWT
      alert("Connexion réussie !");
      navigate("/admin/dashboard"); // Rediriger vers le tableau de bord admin
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">{isSignUp ? "Créer un compte" : "Connexion"}</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleAuth}>
          {isSignUp && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                placeholder="Entrez votre nom"
                required
              />
            </div>
          )}
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
            {isSignUp ? "Créer un compte" : "Se connecter"}
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          {isSignUp ? "Vous avez déjà un compte ?" : "Vous n'avez pas de compte ?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Se connecter" : "Créer un compte"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminAuth;