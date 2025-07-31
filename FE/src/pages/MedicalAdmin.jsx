import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function AdminFacility() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        testType: '',
        note: ''
    });

    const [userEmail, setUserEmail] = useState("");
    const [accountId, setAccountId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserEmail(decoded.email || decoded.username || "");
                setAccountId(decoded.id || decoded.AccountID);
            } catch (err) {
                console.error("Token không hợp lệ:", err);
            }
        }
    }, []);

    // Gọi API lấy thông tin hồ sơ từ DB
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!accountId) return;
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3001/api/profile/${accountId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const { information } = res.data;
                if (information) {
                    setFormData(prev => ({
                        ...prev,
                        name: information.Name_Information || '',
                        phone: information.Phone || ''
                    }));
                }
            } catch (err) {
                console.error("Không thể lấy thông tin hồ sơ:", err);
            }
        };

        fetchUserInfo();
    }, [accountId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail) {
            alert("Bạn cần đăng nhập để đặt lịch.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/bookings/create', {
                name: formData.name,
                phone: formData.phone,
                email: userEmail,
                relationshipType: formData.testType,
                note: formData.note,
                formType: 'AdminFacility' // Xác định Service_ID = 4
            });

            if (response.data?.Booking_ID) {
                alert('Đặt lịch thành công! Mã lịch hẹn: ' + response.data.Booking_ID);
                console.log("Booking created:", response.data);
            } else if (response.data?.message) {
                alert('Đặt lịch thất bại: ' + response.data.message);
            } else {
                alert('Đặt lịch thất bại: Lỗi không xác định');
            }

        } catch (error) {
            console.error("Lỗi khi đặt lịch:", error);
            alert("Không thể tạo lịch hẹn. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="medical-container">
            <h2 className="medical-title">XÉT NGHIỆM HÀNH CHÍNH</h2>

            <div className="alert-box">
                <p><strong>⚠ Lưu ý quan trọng:</strong> Khi đến cơ sở y tế để làm xét nghiệm, bạn cần:</p>
                <ul>
                    <li>Đem theo <strong>giấy tờ tùy thân</strong> (CMND/CCCD, hộ chiếu,...)</li>
                    <li>Đối với trường hợp pháp lý: cần có <strong>giấy tờ pháp lý liên quan</strong> (công văn, quyết định,...)</li>
                    <li>Tải và điền sẵn mẫu đơn tại đây:
                        <a href="/files/Form.docx" download style={{ color: '#0077cc', marginLeft: '5px' }}>
                            [Tải Mẫu Đơn]
                        </a>
                    </li>
                </ul>
            </div>

            <form className="medical-form" onSubmit={handleSubmit}>
                <label>Họ và tên người đăng ký:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Số điện thoại liên hệ:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Loại xét nghiệm:</label>
                <select name="testType" value={formData.testType} onChange={handleChange} required>
                    <option value="">-- Chọn loại xét nghiệm --</option>
                    <option value="Father - Child">Cha - Con</option>
                    <option value="Siblings">Anh/Chị/Em ruột</option>
                    <option value="Paternity (Grandparent)">Ông/Bà - Cháu</option>
                    <option value="Remains">Hài cốt</option>
                    <option value="Others">Khác</option>
                </select>

                <label>Ghi chú thêm (nếu có):</label>
                <textarea name="note" value={formData.note} onChange={handleChange} />

                <button type="submit">Xác nhận đặt lịch</button>
            </form>
        </div>
    );
}
