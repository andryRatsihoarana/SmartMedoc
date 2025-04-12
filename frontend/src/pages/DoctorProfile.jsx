import React, { useState } from "react";
import { useParams } from "react-router-dom";

const DoctorProfile = () => {
  const { id } = useParams(); // Récupère l'ID du médecin depuis l'URL

  // Exemple de données fictives pour un médecin
  const doctor = {
    id,
    name: "Dr. John Doe",
    specialty: "Cardiologie",
    email: "john.doe@example.com",
    profilePic: "https://via.placeholder.com/150",
  };

  // Exemple de données des patients
  const [patients, setPatients] = useState([
    { id: 1, name: "Patient 1", condition: "Hypertension" },
    { id: 2, name: "Patient 2", condition: "Diabète" },
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);

  // Fonction pour ajouter un patient
  const handleAddPatient = (e) => {
    e.preventDefault();
    const newPatient = {
      id: patients.length + 1,
      name: e.target.name.value,
      condition: e.target.condition.value,
    };
    setPatients([...patients, newPatient]);
    setShowAddPopup(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-6">
        <img
          src={doctor.profilePic}
          alt={doctor.name}
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold">{doctor.name}</h1>
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
            <th className="border border-gray-300 px-4 py-2">Condition</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{patient.id}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.name}</td>
              <td className="border border-gray-300 px-4 py-2">{patient.condition}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400 mr-2">
                  Modifier
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400">
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
                <label className="block text-sm font-medium mb-1">Condition</label>
                <input
                  type="text"
                  name="condition"
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
    </div>
  );
};

export default DoctorProfile;