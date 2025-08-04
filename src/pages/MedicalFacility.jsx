import React, { useState } from 'react';
import '../skin_web/MedicalFacility.css';

export default function MedicalFacility() {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        date: '',
        testType: '',
        note: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted data:", formData);
        alert("Appointment confirmed successfully!");
        // gui data o day
    };

    return (
        <div className="medical-container">
            <h2 className="medical-title">Schedule a DNA Test Appointment at Medical Facility</h2>
            <form className="medical-form" onSubmit={handleSubmit}>
                <label>Patient Full Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Phone Number:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Email Address:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Appointment Date:</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />

                <label>Type of DNA Test:</label>
                <select name="testType" value={formData.testType} onChange={handleChange} required>
                    <option value="">-- Select Test Type --</option>
                    <option value="Father - Child">Father - Child</option>
                    <option value="Remains">Remains</option>
                    <option value="Civil">Civil</option>
                </select>

                <label>Additional Notes:</label>
                <textarea name="note" value={formData.note} onChange={handleChange} />

                <button type="submit">Confirm Appointment</button>
            </form>
            </div>
    );
}
