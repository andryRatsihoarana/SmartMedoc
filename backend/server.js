require('dotenv').config();

const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "consultation_db",
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL.");
});

// Clé secrète pour les tokens JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware pour authentifier le token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Récupérer le token depuis l'en-tête Authorization
  if (!token) return res.status(401).json({ message: "Accès non autorisé." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalide." });
    req.user = user; // Ajouter les informations de l'utilisateur à la requête
    next();
  });
};

// Route pour l'inscription de l'admin
app.post("/admin/register", async (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const checkQuery = "SELECT * FROM admins WHERE username = ?";
  db.query(checkQuery, [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'admin dans la base de données
    const query = "INSERT INTO admins (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ message: "Admin enregistré avec succès." });
    });
  });
});

// Route pour la connexion de l'admin
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe
  const query = "SELECT * FROM admins WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    const admin = results[0];

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Connexion réussie.", token });
  });
});

// Exemple d'utilisation pour protéger une route
app.get("/admin/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Bienvenue sur le tableau de bord admin !" });
});

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});