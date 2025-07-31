import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManagerPanel() {
    const navigate = useNavigate();

    return (
        <div className="manager-container p-6">
            <h2 className="text-2xl font-bold mb-4">Manager Control Panel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                    onClick={() => navigate('/price')}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600"
                >
                    Price
                </button>

                <button
                    onClick={() => navigate('/staff-monitoring')}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600"
                >
                    Monitor Staff
                </button>

                <button
                    onClick={() => navigate('/sample-tracking')}
                    className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600"
                >
                    Track Sample Status
                </button>

                <button
                    onClick={() => navigate('/Dashboard')}
                    className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600"
                >
                    DashBoard
                </button>
            </div>
        </div>
    );
}