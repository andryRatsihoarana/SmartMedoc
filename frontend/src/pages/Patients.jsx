import React from 'react';

const Patients = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Patient Records</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Patient ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Age</th>
                        <th className="py-2 px-4 border-b">Condition</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample data, replace with dynamic data */}
                    <tr>
                        <td className="py-2 px-4 border-b">1</td>
                        <td className="py-2 px-4 border-b">John Doe</td>
                        <td className="py-2 px-4 border-b">30</td>
                        <td className="py-2 px-4 border-b">Healthy</td>
                        <td className="py-2 px-4 border-b">
                            <button className="text-blue-500">Edit</button>
                            <button className="text-red-500 ml-2">Delete</button>
                        </td>
                    </tr>
                    {/* Add more patient records here */}
                </tbody>
            </table>
        </div>
    );
};

export default Patients;