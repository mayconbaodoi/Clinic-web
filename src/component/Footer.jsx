import React from "react";
import "../skin_web/Footer.css";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-container">
                    {/* logo and descrip */}
                    <div className="footer-section">
                        <h2 className="logo">DNA Clinic</h2>
                        <p>Viện Nghiên Cứu Khoa Học Và Ứng Dụng Công Nghệ DNA Clinic</p>
                    </div>

                    {/* service */}
                    <div className="footer-section">
                        <h3>DỊCH VỤ</h3>
                        <ul>
                            <li>&gt; Xét nghiệm ADN huyết thống</li>
                            <li>&gt; Xét nghiệm sàng lọc NIPT</li>
                            <li>&gt; Xét nghiệm sinh hóa máu</li>
                            <li>&gt; Xét nghiệm sàng lọc ung thư</li>
                        </ul>
                    </div>

                    {/* contact */}
                    <div className="footer-section">
                        <h3>LIÊN HỆ</h3>
                        <p>
                            <i className="fas fa-map-marker-alt"></i> 38B đường 81, phường Tân
                            Quy, quận 7, TP. Hồ Chí Minh
                        </p>
                        <p>
                            <i className="fas fa-phone"></i> 0339 773 330 - 0338 773 330
                        </p>
                        <p>
                            <i className="fas fa-envelope"></i> vietcarelab@gmail.com
                        </p>
                        <p>
                            <i className="fas fa-clock"></i> Hỗ trợ tư vấn 24/7
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
