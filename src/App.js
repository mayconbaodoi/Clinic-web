import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp'; 
import SignIn from './pages/SignIn';

function App() {
    return (
        <Router>
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn /> } />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
