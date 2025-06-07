import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../skin_web/HomePage.css'; 

export default function HomePage() {
    const navigate = useNavigate();

    const handleServiceClick = (serviceId) => {
        navigate('/choose-type', { state: { service: serviceId } });
    };

    const services = [
        {
            id: 'customer',
            title: 'DNA testing using a customer-provided sample'
        },
        {
            id: 'facility',
            title: 'DNA testing at medical facilities'
        },
        {
            id: 'home',
            title: "DNA tests with samples taken at the customer's home by medical staff"
        }
    ];

    return (
        <main className="homepage-container">
            <section className="section">
                <h2 className="section-title">Introduction</h2>
                <p>
                    We are the leading unit in the field of DNA testing in Vietnam, with a team of experienced experts and modern equipment.
                </p>
            </section>

            <section className="section">
                <h2 className="section-title">Achievements</h2>
                <ul className="achievement-list">
                    <li>National Health Science Awards 2023</li>
                    <li>More than 10,000 successful appraisals</li>
                    <li>Cooperating with many major hospitals nationwide</li>
                </ul>
            </section>

            <section className="section">
                <h2 className="section-title">DNA Services</h2>
                <ul className="service-list">
                    {services.map((service) => (
                        <li
                            key={service.id}
                            onClick={() => handleServiceClick(service.id)}
                            className="service-item"
                        >
                            {service.title}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Phan nay de test page */ }
            <button
                onClick={() => navigate('/user-management')}
                style={{
                    marginTop: '2rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Go to AdminPage (Test Only)
            </button>

            <button
                onClick={() => navigate('/manager-panel')}
                style={{
                    marginTop: '2rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#010bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Go to ManagerPage (Test Only)
            </button>

            <button
                onClick={() => navigate('/staff')}
                style={{
                    marginTop: '2rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#010bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Go to Staff (Test Only)
            </button>
            {/*end*/}
        </main>
    );
}
