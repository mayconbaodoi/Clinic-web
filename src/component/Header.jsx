import React from 'react';
import '../skin_web/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header-wrapper">
            <div className="header-top">
                <div className="header-logo-group">
                    <img className="header-logo-img" src="/picture/logo-genfamily.png" alt="GENFAMILY logo" />
                    <div className="header-slogan-group">
                        <span className="header-logo-text">GEN<span className="header-logo-family">FAMILY</span></span>
                        <div className="header-slogan">BELIEF CREATES THE ACTUAL FACT - NIỀM TIN CHO HIỆN TẠI</div>
                    </div>
                </div>
            </div>
            <nav className="header-nav">
                <Link to="/" className="nav-link">TRANG CHỦ</Link>
                <Link to="/about" className="nav-link">GIỚI THIỆU</Link>
                <div className="nav-link nav-dropdown">
                    DỊCH VỤ <span className="dropdown-arrow">▼</span>
                    <div className="dropdown-menu">
                        <Link to="/dich-vu/cha-con" className="dropdown-item">Xét nghiệm ADN cha con: Quy trình, chi phí & dịch vụ uy tín tại GenFamily</Link>
                        <Link to="/dich-vu/giay-khai-sinh" className="dropdown-item">Xét nghiệm ADN làm giấy khai sinh</Link>
                        <Link to="/dich-vu/thai-nhi" className="dropdown-item">Xét nghiệm ADN thai nhi không xâm lấn</Link>
                        <Link to="/dich-vu/nipt" className="dropdown-item">Xét Nghiệm NIPT</Link>
                        <Link to="/dich-vu/the-adn" className="dropdown-item">Xét nghiệm thẻ ADN cá nhân</Link>
                    </div>
                </div>
                <Link to="/guide" className="nav-link">HƯỚNG DẪN</Link>
                <Link to="/pricing" className="nav-link">BẢNG GIÁ</Link>
                <Link to="/health" className="nav-link">GÓC SỨC KHỎE</Link>
            </nav>
        </header>
    );
};
export default Header; 