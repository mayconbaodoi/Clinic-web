import React from 'react';
import '../skin_web/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-section">
                <Link to="/">
                    <img src="/picture/p1.jpg" alt="Logo BV" className="logo" />
                </Link>
                <h1>DNA Clinic</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/about">Introduction</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/signin">Sign In</Link></li>
                </ul>
            </nav>
        </header>
    );
};
export default Header; 