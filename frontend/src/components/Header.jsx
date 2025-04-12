import React, { useState, useEffect } from "react";
import { Home, UserPlus, Moon, Sun, LogOut } from "lucide-react"; // Import icons from lucide-react
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [admin, setAdmin] = useState(null); // État pour stocker les données de l'admin
  const navigate = useNavigate();

  // Charger les données de l'admin depuis localStorage
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, []);

  // Fonction pour basculer entre le mode nuit et le mode jour
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("admin"); // Supprime les données de l'admin
    navigate("/admin-auth"); // Redirige vers la page de login
  };

  // Réduire automatiquement le sidebar lorsque la fenêtre est réduite
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768); // Réduit si la largeur est <= 768px
    };

    handleResize(); // Vérifie la taille initiale
    window.addEventListener("resize", handleResize); // Ajoute un écouteur d'événements

    return () => {
      window.removeEventListener("resize", handleResize); // Nettoie l'écouteur
    };
  }, []);

  return (
    <aside
      className={`bg-blue-600 text-white h-screen p-4 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex mb-8">
        <button
          className="text-white focus:outline-none hover:bg-blue-500 p-2 rounded"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "☰" : "✕"}
        </button>
      </div>

      {/* Profile Section */}
      <div className="mb-8 cursor-pointer flex flex-col items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        {!isCollapsed && admin && (
          <div className="mt-2 text-center">
            <p className="font-bold">{admin.name}</p>
            <p className="text-sm">{admin.email}</p>
          </div>
        )}
      </div>
      <hr />

      {/* Navigation Menu */}
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-4 hover:bg-blue-500 p-2 rounded"
            >
              <Home size={24} />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/doctors"
              className="flex items-center space-x-4 hover:bg-blue-500 p-2 rounded"
            >
              <UserPlus size={24} />
              {!isCollapsed && <span>Doctors</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Dark Mode and Logout Buttons */}
      <div className="mt-auto space-y-4 pt-4">
        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-4 hover:bg-blue-500 p-2 rounded w-full"
        >
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          {!isCollapsed && <span>{isDarkMode ? "Mode Jour" : "Mode Nuit"}</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-4 hover:bg-blue-500 p-2 rounded w-full"
        >
          <LogOut size={24} />
          {!isCollapsed && <span>Déconnexion</span>}
        </button>
      </div>
      <hr />
    </aside>
  );
};

export default Header;