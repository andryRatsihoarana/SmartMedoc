import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false); // État pour basculer entre login et sign-up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Nom pour le sign-up
  const navigate = useNavigate();

  // Exemple de stockage des données admin (localStorage pour simplification)
  const handleAuth = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Création de compte
      const adminData = { name, email, password };
      localStorage.setItem("admin", JSON.stringify(adminData));
      alert("Compte créé avec succès !");
      setIsSignUp(false); // Retour au login après sign-up
    } else {
      // Connexion
      const storedAdmin = JSON.parse(localStorage.getItem("admin"));
      if (storedAdmin && storedAdmin.email === email && storedAdmin.password === password) {
        navigate("/"); // Redirige vers le tableau de bord admin
      } else {
        alert("Email ou mot de passe incorrect.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4">{isSignUp ? "Créer un compte" : "Connexion"}</h1>
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