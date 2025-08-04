import React, { useState } from 'react';
import '../skin_web/HomeSampling.css';

export default function HomeSampling() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        dob: '',
        address: '',
        time: '',
        relationshipType: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        alert("Home sample appointment registered successfully!");
        // Gui du lieu backend o day 
    };

    return (
        <div className="home-sampling-container">
            <h2 className="form-title">Register for DNA Sample Collection at Home</h2>
            <form className="home-sampling-form" onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <label>Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <label>Patient's Home Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <label>Preferred Time for Sample Collection:</label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                />

                <label>Type of Relationship to be Tested:</label>
                <select
                    name="relationshipType"
                    value={formData.relationshipType}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Select Relationship Type --</option>
                    <option value="Father - Child">Father - Child</option>
                    <option value="Siblings">Siblings</option>
                    <option value="Paternity (Grandparent)">Paternity (Grandparent)</option>
                    <option value="Remains">Remains</option>
                    <option value="Others">Others</option>
                </select>

                <label>Additional Notes:</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />

                <button type="submit">Confirm Registration</button>
            </form>
        </div>
    );
}
