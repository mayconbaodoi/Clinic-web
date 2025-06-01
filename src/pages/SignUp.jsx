import React, { useState } from 'react';
import '../skin_web/SignUp.css';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        agreed: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="signup-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    First Name
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>

                <label>
                    Last Name
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>

                <label>
                    Email
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>

                <label>
                    Create Password
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>

                <label>
                    Confirm Password
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </label>

                <label>
                    Date of Birth
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </label>

                <label className="checkbox">
                    <input
                        type="checkbox"
                        name="agreed"
                        checked={formData.agreed}
                        onChange={handleChange}
                        required
                    />
                    I agree to the terms and conditions.
                </label>

                <button type="submit">Register</button>

                <p className="switch-auth">
                    Already have an account? <Link to = "/singin">Sign in here</Link>
                </p>
            </form>
        </div>
    );
}
