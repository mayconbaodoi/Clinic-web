import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../skin_web/HomeSampling.css';

export default function HomeSampling() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        relationshipType: '',
        note: '',
        appointmentDate: '',
        appointmentHour: ''
    });

    const [userEmail, setUserEmail] = useState('');
    const [accountId, setAccountId] = useState(null);

    // Giải mã token khi component mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserEmail(decoded.email || decoded.username || '');
                setAccountId(decoded.id || decoded.AccountID);
            } catch (err) {
                console.error("Token không hợp lệ:", err);
            }
        }
    }, []);

    // Gọi API lấy thông tin người dùng
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
            alert("Bạn cần đăng nhập để đặt lịch.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/bookings/create', {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                relationshipType: formData.relationshipType,
                appointmentDate: formData.appointmentDate,
                appointmentHour: formData.appointmentHour,
                note: formData.note,
                email: userEmail,
                formType: 'HomeSampling',
            });

            if (response.data?.Booking_ID) {
                alert('Đặt lịch thành công! Mã: ' + response.data.Booking_ID);
                console.log("Booking created:", response.data);
            } else {
                alert('Đặt lịch thất bại: ' + (response.data?.message || 'Không rõ lỗi'));
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            alert("Không thể tạo lịch hẹn. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="home-sampling-container">
            <h2 className="form-title">XÉT NGHIỆM QUA NHÂN VIÊN LẤY MẪU</h2>
            <form className="home-sampling-form" onSubmit={handleSubmit}>
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

                <label>Ngày hẹn:</label>
                <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />

                <label>Giờ hẹn:</label>
                <select name="appointmentHour" value={formData.appointmentHour} onChange={handleChange} required >
                    <option value="">-- Chọn giờ hẹn --</option>
                    <option value="08:00:00">08:00 sáng</option>
                    <option value="09:00:00">09:00 sáng</option>
                    <option value="10:00:00">10:00 sáng</option>
                    <option value="14:00:00">14:00 chiều</option>
                    <option value="15:00:00">15:00 chiều</option>
                    <option value="16:00:00">16:00 chiều</option>
                </select>

                <label>Ghi chú thêm (nếu có):</label>
                <textarea name="note" value={formData.note} onChange={handleChange} />

                <button type="submit">Xác nhận đặt lịch</button>
            </form>
        </div>
    );
}
