import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../skin_web/AccountMenu.css';

export default function AccountMenu({ user, onLogout, className }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        onLogout && onLogout();
        // Chuyển về homepage
        navigate('/');
    };

    return (
        <div
            className={`account-menu-wrapper${className ? ' ' + className : ''}`}
            tabIndex={0}
            onBlur={() => setOpen(false)}
        >
            <div className="account-menu-trigger" onClick={() => setOpen(!open)}>
                <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'U')}`}
                    alt="avatar"
                    className="account-avatar"
                />
                <span className="account-username">{user?.username || 'Tài khoản'}</span>
            </div>
            {open && (
                <div className="account-menu-dropdown">
                    <div className="account-menu-item" onClick={() => { setOpen(false); navigate('/Profile'); }}>Tài Khoản Của Tôi</div>
                    <div className="account-menu-item" onClick={() => { setOpen(false); navigate('/orders'); }}>Lịch Sử Xét Nghiệm</div>
                    <div className="account-menu-item" onClick={handleLogout}>Đăng Xuất</div>
                </div>
            )}
        </div>
    );
} 