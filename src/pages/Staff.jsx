import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard() {
    const navigate = useNavigate();

    return (
        <div className="staff-dashboard" style={{ padding: '2rem' }}>
            <h2>Welcome, Staff</h2>
            <p>Select a task to manage:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <button onClick={() => navigate('/staff/schedule')}>Manage Appointments</button>
                <button onClick={() => navigate('/staff/chat')}>Customer Support (Chat)</button>
                <button onClick={() => navigate('/staff/testing-process')}>Manage Testing Process</button>
                <button onClick={() => navigate('/staff/incoming-samples')}>View Incoming Samples</button>
                <button onClick={() => navigate('/staff/print-documents')}>Manage Printable Documents</button>
            </div>
        </div>
    );
}