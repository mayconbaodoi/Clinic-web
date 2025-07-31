import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../skin_web/SendSampling.css';

export default function SendSampling() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        relationshipType: '',
        sampleType: '',
        note: ''
    });

    const [userEmail, setUserEmail] = useState('');
    const [accountId, setAccountId] = useState(null);

    // Lấy thông tin từ JWT token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserEmail(decoded.email || decoded.username || '');
                setAccountId(decoded.id || decoded.AccountID); // Trường hợp token có AccountID
            } catch (err) {
                console.error("Token không hợp lệ:", err);
            }
        }
    }, []);

    // Gọi API để lấy thông tin người dùng (INFORMATION table)
    useEffect(() => {
        const fetchInfo = async () => {
            if (!accountId) return;
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3001/api/profile/${accountId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const { information } = res.data;
                if (information) {
                    setFormData(prev => ({
                        ...prev,
                        name: information.Name_Information || '',
                        phone: information.Phone || '',
                        address: information.Address || ''
                    }));
                }
            } catch (err) {
                console.error("Không thể lấy thông tin hồ sơ:", err);
            }
        };

        fetchInfo();
    }, [accountId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail) {
            alert("Bạn cần đăng nhập để gửi thông tin.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/booking/create', {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                relationshipType: formData.relationshipType,
                note: formData.note,
                email: userEmail,
                formType: 'SendSampling'
            });

            if (response.data?.Booking_ID) {
                alert('Đặt lịch thành công! Mã: ' + response.data.Booking_ID);
                console.log("Booking created:", response.data);
            } else if (response.data?.message) {
                alert('Đặt lịch thất bại: ' + response.data.message);
            } else {
                alert('Đặt lịch thất bại: Lỗi không xác định');
            }

        } catch (error) {
            console.error("Lỗi khi gửi lịch hẹn:", error);
            alert("Không thể tạo lịch hẹn. Kiểm tra console để biết thêm.");
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="form-title">XÉT NGHIỆM QUA GỬI MẪU</h2>
            <form onSubmit={handleSubmit}>
                <label>Họ và tên người đăng ký:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Số điện thoại liên hệ:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Loại xét nghiệm:</label>
                <select name="relationshipType" value={formData.relationshipType} onChange={handleChange} required>
                    <option value="">-- Chọn loại xét nghiệm --</option>
                    <option value="Father - Child">Cha - Con</option>
                    <option value="Siblings">Anh/Chị/Em ruột</option>
                    <option value="Paternity (Grandparent)">Ông/Bà - Cháu</option>
                    <option value="Remains">Hài cốt</option>
                    <option value="Others">Khác</option>
                </select>

                <label>Địa chỉ:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                <label>Ghi chú thêm (nếu có):</label>
                <textarea name="note" value={formData.note} onChange={handleChange} />

                <button type="submit" style={{ marginTop: '1rem' }}>Xác nhận gửi mẫu</button>
            </form>
        </div>
    );
}
