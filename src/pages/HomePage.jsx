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
        <div className="homepage-container">
            {/* Banner đầu trang */}
            <section className="banner-section">
                <div className="banner-left">
                    <img className="logo" src="/picture/p1.jpg" alt="GENFAMILY logo" />
                    <div className="hotline">08.777.999.44</div>
                    <h1 className="slogan">GENFAMILY</h1>
                    <p className="subtitle">CUNG CẤP DỊCH VỤ PHÂN TÍCH ADN & NIPT CHÍNH XÁC NHẤT</p>
                </div>
                <div className="banner-right">
                    <img className="doctor-img" src="/picture/p3.jpg" alt="Doctor" />
                    <div className="service-icons">
                        <img src="/picture/icon-genfamily-small.png" alt="24/7" />
                        <img src="/picture/icon-genfamily-small.png" alt="Consult" />
                        <img src="/picture/icon-genfamily-small.png" alt="Lab" />
                        <img src="/picture/icon-genfamily-small.png" alt="Result" />
                    </div>
                </div>
            </section>

            {/* Giới thiệu trung tâm - Về chúng tôi */}
            <section className="about-section about-section-custom">
                <div className="about-img-col">
                    <img className="about-main-img" src="/picture/nu-nhan-vien-trung-tam-xet-nghiem-adn-GENFAMILY-cover.jpg" alt="Nhân viên trung tâm" />
                </div>
                <div className="about-content-col">
                    <div className="about-title-group">
                        <span className="about-label">VỀ CHÚNG TÔI</span>
                        <h2>TRUNG TÂM XÉT NGHIỆM GENFAMILY</h2>
                    </div>
                    <div className="about-boxes-custom">
                        <div className="about-box-custom"><img src="/picture/icon-genfamily-small.png" alt="icon" />Hệ thống phòng xét nghiệm và quy trình chuẩn Quốc tế, GENFAMILY cam kết độ chính xác tuyệt đối 99,99%.</div>
                        <div className="about-box-custom"><img src="/picture/icon-genfamily-small.png" alt="icon" />Đạt chứng nhận ISO 13485 – Tiêu chuẩn Quốc Tế về xét nghiệm ADN duy nhất tại Việt Nam.</div>
                        <div className="about-box-custom"><img src="/picture/icon-genfamily-small.png" alt="icon" />Hỗ trợ thu mẫu tận nơi MIỄN PHÍ (Kể cả ngoài giờ hành chính) – áp dụng toàn quốc.</div>
                        <div className="about-box-custom"><img src="/picture/icon-genfamily-small.png" alt="icon" />Trả kết quả nhanh chỉ sau 6 giờ. Gửi trực tiếp cho người đăng ký, cam kết bảo mật thông tin 100%.</div>
                        <div className="about-box-custom"><img src="/picture/icon-genfamily-small.png" alt="icon" />Là đơn vị DUY NHẤT trên thị trường làm xét nghiệm lần 2 hoàn toàn MIỄN PHÍ.</div>
                    </div>
                </div>
            </section>

            {/* Bảng giá dịch vụ */}
            <section className="pricing-section">
                <h2>BẢNG GIÁ</h2>
                <div className="pricing-cards">
                    <div className="pricing-card">
                        <div className="price">1.500.000đ</div>
                        <div className="old-price">1.999.000đ/mẫu</div>
                        <div className="title">GÓI XÉT NGHIỆM ADN TỰ NGUYỆN</div>
                        <div className="desc">"Là xét nghiệm ADN dân sự, tự nguyện với mục đích giải tỏa nghi ngờ, xác định mối quan hệ giữa các cá nhân"</div>
                        <ul>
                            <li>Trả kết quả sau 2 - 3 ngày.</li>
                            <li>Chính xác 99,99999998%.</li>
                            <li className="fail">Không dùng cho mục đích pháp lý.</li>
                            <li>Thủ tục đơn giản / dễ thực hiện.</li>
                            <li>Thu mẫu tại nhà / trung tâm.</li>
                            <li>Bảo mật bằng hệ thống mã vạch.</li>
                            <li>Thanh toán tiện lợi.</li>
                            <li>Bảo hiểm kết quả giá trị cao.</li>
                            <li>Tổng đài hỗ trợ 24/7.</li>
                        </ul>
                        <button className="more-btn">XEM THÊM</button>
                    </div>
                    <div className="pricing-card highlight">
                        <div className="price">2.000.000đ</div>
                        <div className="old-price">2.499.000đ/mẫu</div>
                        <div className="title">GÓI XÉT NGHIỆM ADN HÀNH CHÍNH</div>
                        <div className="desc">"Được bảo hộ về mặt pháp lý trong các thủ tục hành chính: nhận cha con, giấy khai sinh, nhập tịch, thừa kế, cấp visa,..."</div>
                        <ul>
                            <li>Trả kết quả sau 2 - 3 ngày.</li>
                            <li>Chính xác 99,99999998%.</li>
                            <li>Có giá trị pháp lý (dùng mãi mãi).</li>
                            <li>Thủ tục đơn giản / dễ thực hiện.</li>
                            <li>Thu mẫu tại nhà / trung tâm.</li>
                            <li>Bảo mật bằng hệ thống mã vạch.</li>
                            <li>Thanh toán tiện lợi.</li>
                            <li>Bảo hiểm kết quả giá trị cao.</li>
                            <li>Tổng đài hỗ trợ 24/7.</li>
                        </ul>
                        <button className="more-btn highlight">XEM THÊM</button>
                    </div>
                    <div className="pricing-card">
                        <div className="price">20.000.000đ</div>
                        <div className="old-price">23.999.000đ/gói</div>
                        <div className="title">GÓI XÉT NGHIỆM ADN THAI NHI</div>
                        <div className="desc">"Giúp xác định được mối quan hệ cha con từ khi còn trong bụng mẹ, không xâm lấn nên rất an toàn cho mẹ bầu"</div>
                        <ul>
                            <li>Trả kết quả sau 5 - 7 ngày.</li>
                            <li>Chính xác &gt;99,9999%.</li>
                            <li>Thực hiện từ tuần thai thứ 7.</li>
                            <li>Thủ tục đơn giản / dễ thực hiện.</li>
                            <li>Thu mẫu tại nhà / trung tâm.</li>
                            <li>Bảo mật bằng hệ thống mã vạch.</li>
                            <li>Thanh toán tiện lợi.</li>
                            <li>Bảo hiểm kết quả giá trị cao.</li>
                            <li>Tổng đài hỗ trợ 24/7.</li>
                        </ul>
                        <button className="more-btn">XEM THÊM</button>
                    </div>
                </div>
            </section>

            {/* Loại mẫu xét nghiệm */}
            <section className="sample-section">
                <h2>LÀM XÉT NGHIỆM ADN HUYẾT THỐNG</h2>
                <div className="sample-types">
                    <div className="sample-group">
                        <div className="sample-label">MẪU THÔNG THƯỜNG</div>
                        <div className="sample-list">
                            <div className="sample-item"><img src="/picture/mau-mau.png" alt="Máu khô" /><span>Máu khô</span></div>
                            <div className="sample-item"><img src="/picture/mau-niem-mac-mieng.png" alt="Niêm mạc miệng" /><span>Niêm mạc miệng</span></div>
                        </div>
                    </div>
                    <div className="sample-group">
                        <div className="sample-label">MẪU ĐẶC BIỆT</div>
                        <div className="sample-list">
                            <div className="sample-item"><img src="/picture/toc-co-chan.png" alt="Tóc có chân" /><span>Tóc có chân</span></div>
                            <div className="sample-item"><img src="/picture/mong-tay-chan.png" alt="Móng tay chân" /><span>Móng tay chân</span></div>
                            <div className="sample-item"><img src="/picture/cuong-ron.png" alt="Cuống rốn" /><span>Cuống rốn</span></div>
                            <div className="sample-item"><img src="/picture/nuoc-oi.png" alt="Nước ối" /><span>Nước ối</span></div>
                            <div className="sample-item"><img src="/picture/ban-chai-danh-rang.png" alt="Bàn chải đánh răng" /><span>Bàn chải đánh răng</span></div>
                            <div className="sample-item"><img src="/picture/dau-loc-thuoc-la.png" alt="Đầu lọc thuốc lá" /><span>Đầu lọc thuốc lá</span></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chứng nhận */}
            <section className="certificate-section">
                <h2>TRUNG TÂM XÉT NGHIỆM ĐẠT CHUẨN</h2>
                <div className="certificates">
                    <img src="/picture/chung-chi-1.jpg" alt="ISO 1" />
                    <img src="/picture/chung-chi-2.jpg" alt="ISO 2" />
                    <img src="/picture/chung-chi-3.jpg" alt="ISO 3" />
                </div>
            </section>

            {/* Phan nay de test page */}
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
        </div>
    );
}
