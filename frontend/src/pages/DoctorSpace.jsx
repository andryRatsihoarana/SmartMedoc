import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DoctorSpace = () => {
  const { id } = useParams(); // Récupère l'ID du médecin depuis l'URL
  const navigate = useNavigate();

  // Exemple de données fictives pour les médecins
  const doctors = [
    { id: "1", name: "John Doe", specialty: "Cardiologie", email: "john.doe@example.com" },
    { id: "2", name: "Jane Smith", specialty: "Neurologie", email: "jane.smith@example.com" },
  ];

  const doctor = doctors.find((doc) => doc.id === id);

  // Exemple de données des patients
  const [patients, setPatients] = useState([
    { id: 1, name: "Patient 1", age: 30, gender: "Homme", phone: "1234567890", consultations: [] },
    { id: 2, name: "Patient 2", age: 25, gender: "Femme", phone: "0987654321", consultations: [] },
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Fonction pour générer une couleur aléatoire pour le fond de la photo de profil
  const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Fonction pour ajouter un patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      name: e.target.name.value,
      age: e.target.age.value,
      gender: e.target.gender.value,
      phone: e.target.phone.value,
      consultations: [],
    };
    setPatients([...patients, newPatient]);
    setShowAddPopup(false);
  };

  // Fonction pour modifier un patient
  const handleEditPatient = (e) => {
    e.preventDefault();
    const updatedPatients = patients.map((patient) =>
      patient.id === editPatient.id
        ? {
            ...patient,
            name: e.target.name.value,
            age: e.target.age.value,
            gender: e.target.gender.value,
            phone: e.target.phone.value,
          }
        : patient
    );
    setPatients(updatedPatients);
    setEditPatient(null);
  };

  // Fonction pour supprimer un patient
  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  // Fonction pour ajouter une consultation
  const handleAddConsultation = (e) => {
    e.preventDefault();
    const newConsultation = {
      id: selectedPatient.consultations.length + 1,
      date: new Date().toLocaleDateString(),
      notes: e.target.notes.value,
    };
    const updatedPatients = patients.map((patient) =>
      patient.id === selectedPatient.id
        ? { ...patient, consultations: [...patient.consultations, newConsultation] }
        : patient
    );
    setPatients(updatedPatients);
    setSelectedPatient(null);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    navigate("/doctors"); // Redirige vers la section "Doctors" du sidebar
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Espace Médecin</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
        >
          Déconnexion
        </button>
      </div>
      <div className="mb-6 flex items-center space-x-4">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getRandomColor()}`}
        >
          {doctor.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold">Bienvenue, {doctor.name}</h2>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <p className="text-sm text-gray-600">{doctor.email}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">Liste des patients</h2>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        onClick={() => setShowAddPopup(true)}
      >
        Ajouter un nouveau patient
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Âge</th>
            <th className="border border-gray-300 px-4 py-2">Sexe</th>
            <th className="border border-gray-300 px-4 py-2">Téléphone</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{patient.id}</td>
              <td
                className="border border-gray-300 px-4 py-2 cursor-pointer hover:underline"
                onClick={() => navigate(`/consultations/${patient.id}`)}
              >
                {patient.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{patient.age}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.gender}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.phone}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400 mr-2"
                  onClick={() => setEditPatient(patient)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                  onClick={() => handleDeletePatient(patient.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup pour ajouter un patient */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter un patient</h2>
            <form onSubmit={handleAddPatient}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Âge</label>
                <input
                  type="number"
                  name="age"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Sexe</label>
                <select
                  name="gender"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setShowAddPopup(false)}
                >
                  Annuler
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup pour afficher les consultations */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Consultations de {selectedPatient.name}</h2>
            <ul className="mb-4">
              {selectedPatient.consultations.map((consultation) => (
                <li
                  key={consultation.id}
                  className="border border-gray-300 p-2 rounded mb-2 shadow"
                >
                  <p className="text-sm font-bold">Date : {consultation.date}</p>
                  <p className="text-sm">Notes : {consultation.notes}</p>
                </li>
              ))}
            </ul>
            <form onSubmit={handleAddConsultation}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  name="notes"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setSelectedPatient(null)}
                >
                  Fermer
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Popup pour modifier un patient */}
      {editPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Modifier un patient</h2>
            <form onSubmit={handleEditPatient}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editPatient.name}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Âge</label>
                <input
                  type="number"
                  name="age"
                  defaultValue={editPatient.age}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Sexe</label>
                <select
                  name="gender"
                  defaultValue={editPatient.gender}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editPatient.phone}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setEditPatient(null)}
                >
                  Annuler
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSpace;