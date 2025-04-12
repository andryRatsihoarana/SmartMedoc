import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const ConsultationPage = () => {
  const { patientId } = useParams(); // Récupère l'ID du patient depuis l'URL
  const navigate = useNavigate();

  // Exemple de données fictives pour un patient
  const [patient] = useState({
    id: patientId,
    name: "Patient 1",
    age: 30,
    gender: "Homme",
    phone: "1234567890",
    consultations: [
      {
        id: 1,
        date: "01/01/2023",
        illnesses: ["Hypertension"],
        medications: ["Médicament A", "Médicament B"],
      },
    ],
  });

  const [showAddPopup, setShowAddPopup] = useState(false);

  // Fonction pour ajouter une consultation
  const handleAddConsultation = (e) => {
    e.preventDefault();
    const newConsultation = {
      id: patient.consultations.length + 1,
      date: e.target.date.value,
      illnesses: e.target.illnesses.value.split("\n").map((ill) => ill.trim()),
      medications: e.target.medications.value.split(",").map((med) => med.trim()),
    };
    patient.consultations.push(newConsultation);
    setShowAddPopup(false);
  };

  // Fonction pour générer un PDF
  const generatePDF = (medications) => {
    const doc = new jsPDF();
    doc.text("Liste des Médicaments", 10, 10);
    medications.forEach((med, index) => {
      doc.text(`${index + 1}. ${med}`, 10, 20 + index * 10);
    });
    doc.save("medications.pdf");
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-400"
      >
        Retour
      </button>
      <h1 className="text-2xl font-bold mb-4">Consultations de {patient.name}</h1>
      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        onClick={() => setShowAddPopup(true)}
      >
        Ajouter une nouvelle consultation
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {patient.consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="border border-gray-300 p-4 rounded shadow-md bg-white"
          >
            <p className="text-sm font-bold">Date : {consultation.date}</p>
            <p className="text-sm font-bold mt-2">Maladies :</p>
            <ul className="list-disc pl-5">
              {consultation.illnesses.map((illness, index) => (
                <li key={index} className="text-sm">{illness}</li>
              ))}
            </ul>
            <p className="text-sm font-bold mt-2">Médicaments :</p>
            <ul className="list-disc pl-5">
              {consultation.medications.map((medication, index) => (
                <li key={index} className="text-sm">{medication}</li>
              ))}
            </ul>
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
              onClick={() => generatePDF(consultation.medications)}
            >
              Télécharger les médicaments (PDF)
            </button>
          </div>
        ))}
      </div>

      {/* Popup pour ajouter une consultation */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Ajouter une consultation</h2>
            <form onSubmit={handleAddConsultation}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Maladies</label>
                <textarea
                  name="illnesses"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  rows="4"
                  placeholder="Entrez chaque maladie sur une nouvelle ligne"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Médicaments (séparés par des virgules)
                </label>
                <input
                  type="text"
                  name="medications"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                  placeholder="Exemple : Médicament A, Médicament B"
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

export default ConsultationPage;