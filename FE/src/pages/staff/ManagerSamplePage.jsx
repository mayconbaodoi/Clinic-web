import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../skin_web/staff/ManagerSamplePage.css";

function ManagerSamplePage() {
    const [samples, setSamples] = useState([]);
    const [formData, setFormData] = useState({
        Sample_Name: '',
        Received_At_Lab_Date: '',
        Collection_Date: '',
        Booking_ID: '',
        Booking_Status: '',
        ReceiveDate: ''
    });
    const [editId, setEditId] = useState(null);
    const [senderName, setSenderName] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const statusOptions = [
        "Chờ xác nhận",
        "Đã xác nhận",
        "Đã thu mẫu",
        "Đang xét nghiệm",
        "Hoàn tất",
        "Đã hủy"
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const decoded = jwtDecode(token);
        if (!["Staff", "Manager"].includes(decoded.role)) {
            alert("Không có quyền truy cập");
            return navigate("/");
        }

        fetchSamples(token);
    }, []);

    const fetchSamples = async (token) => {
        try {
            const res = await axios.get("http://localhost:3001/api/staff", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSamples(res.data);
        } catch (err) {
            alert("Không thể tải danh sách mẫu");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const url = `http://localhost:3001/api/staff/${editId}`;

        try {
            await axios.put(url, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEditId(null);
            setSenderName("");
            setFormData({
                Sample_Name: '',
                Received_At_Lab_Date: '',
                Collection_Date: '',
                Booking_ID: '',
                Booking_Status: '',
                ReceiveDate: ''
            });
            fetchSamples(token);
            setMessage("✅ Cập nhật mẫu thành công!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            alert("Không thể cập nhật mẫu");
        }
    };

    const handleEdit = (sample) => {
        setEditId(sample.Sample_ID);
        setSenderName(sample.Name_Information || "");
        setFormData({
            Sample_Name: sample.Sample_Name || '',
            Received_At_Lab_Date: sample.Received_At_Lab_Date?.split("T")[0] || '',
            Collection_Date: sample.Collection_Date?.split("T")[0] || '',
            Booking_ID: sample.Booking_ID,
            Booking_Status: sample.BookingStatus || '',
            ReceiveDate: '' // mặc định trống, cho staff điền khi chọn "Hoàn tất"
        });
        setMessage("");
    };

    return (
        <div className="staff-sample-page">
            <h2>Quản lý Mẫu Xét Nghiệm</h2>

            {message && <div className="success-message">{message}</div>}

            {editId && (
                <form onSubmit={handleSubmit} className="sample-form">
                    <h3>Cập nhật mẫu</h3>
                    <p><strong>Người gửi:</strong> {senderName || "Không rõ"}</p>

                    <label>Tên mẫu</label>
                    <input
                        type="text"
                        name="Sample_Name"
                        value={formData.Sample_Name}
                        onChange={handleChange}
                    />

                    <label>Ngày nhận tại phòng lab</label>
                    <input
                        type="date"
                        name="Received_At_Lab_Date"
                        value={formData.Received_At_Lab_Date}
                        onChange={handleChange}
                    />

                    <label>Ngày lấy mẫu</label>
                    <input
                        type="date"
                        name="Collection_Date"
                        value={formData.Collection_Date}
                        onChange={handleChange}
                    />

                    <label>Trạng thái đơn hàng</label>
                    <select
                        name="Booking_Status"
                        value={formData.Booking_Status}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn trạng thái --</option>
                        {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    {formData.Booking_Status === "Hoàn tất" && (
                        <>
                            <label>Ngày hoàn tất (ReceiveDate)</label>
                            <input
                                type="date"
                                name="ReceiveDate"
                                value={formData.ReceiveDate}
                                onChange={handleChange}
                            />
                        </>
                    )}

                    <label>Mã Booking</label>
                    <input
                        type="number"
                        name="Booking_ID"
                        value={formData.Booking_ID}
                        disabled
                    />

                    <div className="form-buttons">
                        <button type="submit">Lưu cập nhật</button>
                        <button
                            type="button"
                            onClick={() => {
                                setEditId(null);
                                setSenderName("");
                                setFormData({
                                    Sample_Name: '',
                                    Received_At_Lab_Date: '',
                                    Collection_Date: '',
                                    Booking_ID: '',
                                    Booking_Status: '',
                                    ReceiveDate: ''
                                });
                                setMessage("");
                            }}
                        >
                            Hủy
                        </button>
                    </div>
                </form>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Mã mẫu</th>
                        <th>Tên mẫu</th>
                        <th>Ngày nhận</th>
                        <th>Ngày lấy</th>
                        <th>Người gửi</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {samples.map((s) => (
                        <tr key={s.Sample_ID}>
                            <td>{s.Sample_ID}</td>
                            <td>{s.Sample_Name || "-"}</td>
                            <td>{s.Received_At_Lab_Date || "-"}</td>
                            <td>{s.Collection_Date || "-"}</td>
                            <td>{s.Name_Information}</td>
                            <td>{s.BookingStatus}</td>
                            <td>
                                <button onClick={() => handleEdit(s)}>Cập nhật</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagerSamplePage;
