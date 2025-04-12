import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  // Simuler des données pour le tableau de bord
  useEffect(() => {
    // Exemple de données fictives
    setTotalDoctors(25); // Total des médecins
    setTotalPatients(120); // Total des patients
    setRecentActivities([
      { id: 1, activity: "Dr. John Doe a ajouté une consultation", time: "Il y a 2 heures" },
      { id: 2, activity: "Dr. Jane Smith a ajouté un nouveau patient", time: "Il y a 4 heures" },
      { id: 3, activity: "Dr. Alice Johnson a mis à jour un dossier médical", time: "Hier" },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord</h1>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-6 rounded shadow">
          <h2 className="text-lg font-bold">Total des Médecins</h2>
          <p className="text-4xl font-bold mt-2">{totalDoctors}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded shadow">
          <h2 className="text-lg font-bold">Total des Patients</h2>
          <p className="text-4xl font-bold mt-2">{totalPatients}</p>
        </div>
        <div className="bg-yellow-500 text-white p-6 rounded shadow">
          <h2 className="text-lg font-bold">Consultations Aujourd'hui</h2>
          <p className="text-4xl font-bold mt-2">15</p>
        </div>
      </div>

      {/* Activités récentes */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-bold mb-4">Activités Récentes</h2>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex justify-between items-center">
              <p>{activity.activity}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;