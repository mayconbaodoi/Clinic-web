// src/pages/HomePage.jsx
import React from 'react';

export default function HomePage() {
    return (
        <main className="main-content">
            <section id="about">
                <h2>Giới thiệu</h2>
                <p>
                    Chúng tôi là đơn vị hàng đầu trong lĩnh vực giám định ADN tại Việt Nam, với đội ngũ chuyên gia giàu kinh nghiệm và thiết bị hiện đại.
                </p>
            </section>

            <section id="achievements">
                <h2>Thành tựu</h2>
                <ul>
                    <li>Giải thưởng Khoa học Y tế Quốc gia 2023</li>
                    <li>Hơn 10,000 ca giám định thành công</li>
                    <li>Hợp tác cùng nhiều bệnh viện lớn trong cả nước</li>
                </ul>
            </section>

            <section id="services">
                <h2>Dịch vụ ADN</h2>
                <ul>
                    <li>Giám định huyết thống cha - con</li>
                    <li>Xác minh ADN hành chính & dân sự</li>
                    <li>Giám định ADN cá thể (hài cốt, vụ án...)</li>
                </ul>
            </section>
        </main>
    );
}
