import React, { useState } from 'react';
import '../skin_web/SendSampling.css';

export default function SendSampling() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        dob: '',
        relationshipType: '',
        sampleType: '',
        note: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted data:", formData);
        alert("Sample submission successfully recorded!");
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Send Sample to Medical Facility</h2>
            <form onSubmit={handleSubmit}>
                <label>Full Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Phone Number:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Date of Birth:</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />

                <label>Relationship Type:</label>
                <select name="relationshipType" value={formData.relationshipType} onChange={handleChange} required>
                    <option value="">-- Select --</option>
                    <option value="Father - Child">Father - Child</option>
                    <option value="Civil">Civil</option>
                    <option value="Bone Sample">Bone Sample</option>
                </select>

                <label>Sample Type Sent:</label>
                <input type="text" name="sampleType" value={formData.sampleType} onChange={handleChange} required />

                <label>Additional Notes:</label>
                <textarea name="note" value={formData.note} onChange={handleChange} />

                <button type="submit" style={{ marginTop: '1rem' }}>Submit Sample</button>
            </form>
        </div>
    );
}
