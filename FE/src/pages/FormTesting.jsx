
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import '../skin_web/FormTesting.css';

// Map serviceName to service_ID (the same as in backend SQL)
const serviceIdMap = {
    "Xét nghiệm ADN tại cơ sở y tế": 1,
    "Xét nghiệm ADN tự lấy mẫu tại nhà": 2,
    "Nhân viên y tế đến nhà lấy mẫu": 3,
    "Hành chính (tại CSYT)": 4,
    "Tư vấn": 5
};

export default function BookingForm({ formType }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        relationshipType: '',
        note: '',
        receiveResult: '',
        appointmentDate: '',
        appointmentHour: '',
        serviceName: ''
    });

    const [accountId, setAccountId] = useState(null);
    const navigate = useNavigate();

    const serviceNameMap = {
        MedicalFacility: "Xét nghiệm ADN tại cơ sở y tế",
        SendSampling: "Xét nghiệm ADN tự lấy mẫu tại nhà",
        HomeSampling: "Nhân viên y tế đến nhà lấy mẫu",
        AdminFacility: "Hành chính (tại CSYT)"
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const id = decoded.id?.toString() || decoded.Account_ID?.toString();
            console.log("✅ accountId decoded:", id);

            setAccountId(id);
            setFormData(prev => ({
                ...prev,
                email: decoded.email || decoded.username || ""
            }));

            const fetchProfile = async () => {
                try {
                    const res = await axios.get(`http://localhost:3001/api/profile/${id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const { information } = res.data;
                    console.log("📦 Thông tin người dùng từ API:", information);
                    if (!information) {
                        console.warn("Không tìm thấy hồ sơ người dùng.");
                        return;
                    }

                    setFormData(prev => ({
                        ...prev,
                        name: prev.name || information.Name_Information || '',
                        phone: prev.phone || information.Phone || '',
                        address: prev.address || information.Address || ''
                    }));
                } catch (err) {
                    console.error("❌ Không thể lấy thông tin hồ sơ:", err);
                }
            };

            fetchProfile();

        } catch (err) {
            console.error("❌ Token không hợp lệ:", err);
        }
    }, []);

    useEffect(() => {
        // Nếu formType hợp lệ thì set serviceName, nếu không thì lấy serviceName đầu tiên mặc định
        if (formType && serviceNameMap[formType]) {
            setFormData(prev => ({
                ...prev,
                serviceName: serviceNameMap[formType]
            }));
        } else if (!formData.serviceName) {
            // fallback: lấy serviceName đầu tiên trong map nếu chưa có
            const firstServiceName = Object.values(serviceNameMap)[0];
            setFormData(prev => ({
                ...prev,
                serviceName: firstServiceName
            }));
        }
    }, [formType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`✏ Thay đổi ${name}:`, value);
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getCateName = (code) => {
        const map = {
            C001: "Quan hệ cha-con",
            C002: "Quan hệ mẹ-con",
            C003: "Quan hệ ông-cháu nội",
            C004: "Quan hệ anh-em ruột"
        };
        return map[code] || '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            alert("Bạn cần đăng nhập để đặt lịch.");
            return;
        }

        // Lấy service_ID từ map
        const service_ID = serviceIdMap[formData.serviceName] || null;

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            note: formData.note,
            relationshipType: formData.relationshipType,
            receiveResult: formData.receiveResult,
            appointmentDate: formData.appointmentDate,
            appointmentHour: formData.appointmentHour,
            serviceName: formData.serviceName,
            cateName: getCateName(formData.relationshipType),
            service_ID
        };

        console.log("🚀 Payload gửi backend:", payload);

        if (!payload.serviceName || !payload.cateName || !payload.service_ID) {
            console.warn("⚠ Thiếu serviceName, cateName hoặc service_ID trong payload!");
        }

        try {
            const response = await axios.post('http://localhost:3001/api/booking/create', payload);

            if (response.data?.Booking_ID) {
                if (formType === 'AdminFacility') {
                    navigate("/payment", {
                        state: { bookingId: response.data.Booking_ID },
                    });
                }
                alert('Đặt lịch thành công! Mã: ' + response.data.Booking_ID);
            } else {
                alert('Đặt lịch thất bại: ' + (response.data?.message || 'Không rõ lỗi'));
            }
        } catch (error) {
            console.error("❌ Lỗi khi gửi yêu cầu:", error);
            alert("Không thể tạo lịch hẹn. Vui lòng thử lại sau.");
        }
    };

    const renderFormFields = () => (
        <>
            <label>Họ và tên người đăng ký:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />

            <label>Số điện thoại liên hệ:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

            {(formData.serviceName === 'Xét nghiệm ADN tự lấy mẫu tại nhà' || formData.serviceName === 'Nhân viên y tế đến nhà lấy mẫu') && (
                <>
                    <label>Địa chỉ:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </>
            )}

            <label>Loại xét nghiệm:</label>
            <select name="relationshipType" value={formData.relationshipType} onChange={handleChange} required>
                <option value="">-- Chọn loại xét nghiệm --</option>
                <option value="C001">Quan hệ cha-con</option>
                <option value="C002">Quan hệ mẹ-con</option>
                <option value="C003">Quan hệ ông-cháu nội</option>
                <option value="C004">Quan hệ anh-em ruột</option>
            </select>

            {formType !== 'SendSampling' && (
                <>
                    <label>Ngày hẹn:</label>
                    <input type="date" name="appointmentDate" value={formData.appointmentDate || ''} onChange={handleChange} required />

                    <label>Giờ hẹn:</label>
                    <select name="appointmentHour" value={formData.appointmentHour} onChange={handleChange} required>
                        <option value="">-- Chọn giờ hẹn --</option>
                        <option value="08:00:00">08:00 sáng</option>
                        <option value="09:00:00">09:00 sáng</option>
                        <option value="10:00:00">10:00 sáng</option>
                        <option value="14:00:00">14:00 chiều</option>
                        <option value="15:00:00">15:00 chiều</option>
                        <option value="16:00:00">16:00 chiều</option>
                    </select>
                </>
            )}

            <label>Ghi chú thêm (nếu có):</label>
            <textarea name="note" value={formData.note} onChange={handleChange} />

            {(formType === 'AdminFacility' || formType === 'MedicalFacility') && (
                <>
                    <label>Phương thức nhận kết quả:</label>
                    <select name="receiveResult" value={formData.receiveResult} onChange={handleChange} required>
                        <option value="">-- Chọn phương thức --</option>
                        <option value="Tại cơ sở">Tại cơ sở</option>
                        <option value="Gửi về địa chỉ">Gửi về địa chỉ</option>
                    </select>
                </>
            )}
        </>
    );

    const getTitle = () => {
        switch (formType) {
            case 'SendSampling': return 'XÉT NGHIỆM QUA GỬI MẪU';
            case 'HomeSampling': return 'XÉT NGHIỆM QUA NHÂN VIÊN LẤY MẪU';
            case 'MedicalFacility': return 'XÉT NGHIỆM DÂN SỰ';
            case 'AdminFacility': return 'XÉT NGHIỆM HÀNH CHÍNH';
            default: return 'ĐẶT LỊCH XÉT NGHIỆM';
        }
    };

    return (
        <div className={formType === 'HomeSampling' ? 'home-sampling-container' : 'medical-container'}>
            <h2 className="form-title">{getTitle()}</h2>

            {formType === 'AdminFacility' && (
                <div className="alert-box">
                    <p><strong>⚠ Lưu ý quan trọng:</strong> Khi đến cơ sở y tế để làm xét nghiệm, bạn cần:</p>
                    <ul>
                        <li>Đem theo <strong>giấy tờ tùy thân</strong> (CMND/CCCD, hộ chiếu,...)</li>
                        <li>Trường hợp pháp lý: cần có <strong>giấy tờ liên quan</strong> (công văn, quyết định,...)</li>
                        <li>Tải và điền sẵn mẫu đơn tại đây:
                            <a href="/files/Form.docx" download style={{ color: '#0077cc', marginLeft: '5px' }}>
                                [Tải Mẫu Đơn]
                            </a>
                        </li>
                    </ul>
                </div>
            )}

            <form className={formType === 'HomeSampling' ? 'home-sampling-form' : 'medical-form'} onSubmit={handleSubmit}>
                {renderFormFields()}
                <button type="submit" style={{ marginTop: '1rem' }}>Xác nhận đặt lịch</button>
            </form>
        </div>
    );
}
