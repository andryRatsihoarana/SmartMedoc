import React, { useState } from "react";

const Doctors = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "John Doe", age: 40, specialty: "Cardiologie", gender: "Homme", email: "john.doe@example.com", password: "password123" },
    { id: 2, name: "Jane Smith", age: 35, specialty: "Neurologie", gender: "Femme", email: "jane.smith@example.com", password: "password456" },
  ]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Fonction pour ajouter un médecin
  const handleAddDoctor = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: doctors.length + 1,
      name: e.target.name.value,
      age: e.target.age.value,
      specialty: e.target.specialty.value,
      gender: e.target.gender.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    setDoctors([...doctors, newDoctor]);
    setShowAddPopup(false);
  };

  // Fonction pour modifier un médecin
  const handleEditDoctor = (e) => {
    e.preventDefault();
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === editDoctor.id
        ? {
            ...doctor,
            name: e.target.name.value,
            age: e.target.age.value,
            specialty: e.target.specialty.value,
            gender: e.target.gender.value,
            email: e.target.email.value,
            password: e.target.password.value,
          }
        : doctor
    );
    setDoctors(updatedDoctors);
    setEditDoctor(null);
  };

  // Fonction pour supprimer un médecin
  const handleDeleteDoctor = (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
  };

  // Générer une couleur aléatoire pour le fond de la photo de profil
  const getRandomColor = () => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Liste des Médecins</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        onClick={() => setShowAddPopup(true)}
      >
        Ajouter un Médecin
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Spécialité</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id} className="text-center">
              <td
                className="border border-gray-300 px-4 py-2 cursor-pointer hover:underline"
                onClick={() => setSelectedDoctor(doctor)}
              >
                {doctor.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{doctor.specialty}</td>
              <td className="border border-gray-300 px-4 py-2">{doctor.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-400 mr-2"
                  onClick={() => setEditDoctor(doctor)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                  onClick={() => handleDeleteDoctor(doctor.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup pour ajouter un médecin */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter un Médecin</h2>
            <form onSubmit={handleAddDoctor}>
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
                <label className="block text-sm font-medium mb-1">Spécialité</label>
                <select
                  name="specialty"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                >
                  <option value="Cardiologie">Cardiologie</option>
                  <option value="Neurologie">Neurologie</option>
                  <option value="Pédiatrie">Pédiatrie</option>
                  <option value="Dermatologie">Dermatologie</option>
                </select>
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
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
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

      {/* Popup pour afficher les détails d'un médecin */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <div className="flex items-center space-x-4 mb-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getRandomColor()}`}
              >
                {selectedDoctor.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
                <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                <p className="text-sm text-gray-600">{selectedDoctor.email}</p>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedDoctor(null)}
              >
                Fermer
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                onClick={() => {
                  window.location.href = `/doctor-login?doctorId=${selectedDoctor.id}&doctorName=${encodeURIComponent(selectedDoctor.name)}`;
                }}
              >
                Accéder au profil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup pour modifier un médecin */}
      {editDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Modifier un Médecin</h2>
            <form onSubmit={handleEditDoctor}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nom</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={editDoctor.name}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Âge</label>
                <input
                  type="number"
                  name="age"
                  defaultValue={editDoctor.age}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Spécialité</label>
                <select
                  name="specialty"
                  defaultValue={editDoctor.specialty}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                >
                  <option value="Cardiologie">Cardiologie</option>
                  <option value="Neurologie">Neurologie</option>
                  <option value="Pédiatrie">Pédiatrie</option>
                  <option value="Dermatologie">Dermatologie</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Sexe</label>
                <select
                  name="gender"
                  defaultValue={editDoctor.gender}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                >
                  <option value="Homme">Homme</option>
                  <option value="Femme">Femme</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={editDoctor.email}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Mot de passe</label>
                <input
                  type="password"
                  name="password"
                  defaultValue={editDoctor.password}
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setEditDoctor(null)}
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

export default Doctors;