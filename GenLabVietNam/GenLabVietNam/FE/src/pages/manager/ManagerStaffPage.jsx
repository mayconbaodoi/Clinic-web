import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../skin_web/manager/ManagerStaffPage.css";

const API_URL = "http://localhost:3001/api/manager/staff";

function ManagerStaffPage() {
    const [staffs, setStaffs] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        gender: "Nam",
        dob: "",
        address: "",
        phone: "",
        cccd: "",
    });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.role !== "Manager") {
                alert("Bạn không có quyền truy cập trang này.");
                navigate("/");
            } else {
                fetchStaffs(token);
            }
        } catch (err) {
            console.error("Token không hợp lệ", err);
            navigate("/login");
        }
    }, [navigate]);

    const fetchStaffs = async (token) => {
        try {
            const res = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStaffs(res.data);
        } catch (err) {
            setError("Không thể tải danh sách nhân viên.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post(API_URL, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            fetchStaffs(token);
            setFormData({
                username: "",
                password: "",
                email: "",
                name: "",
                gender: "Nam",
                dob: "",
                address: "",
                phone: "",
                cccd: "",
            });
            setEditId(null);
        } catch (err) {
            setError("Không thể lưu thông tin nhân viên.");
        }
    };

    const handleEdit = (staff) => {
        setEditId(staff.AccountID);
        setFormData({
            username: staff.UserName,
            password: staff.Password,
            email: staff.Email,
            name: staff.INFORMATION?.Name_Information || "",
            gender: staff.INFORMATION?.Gender || "Nam",
            dob: staff.INFORMATION?.Date_Of_Birth || "",
            address: staff.INFORMATION?.Address || "",
            phone: staff.INFORMATION?.Phone || "",
            cccd: staff.INFORMATION?.CCCD || "",
        });
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (window.confirm("Xác nhận xoá nhân viên này?")) {
            await axios.delete(`${API_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchStaffs(token);
        }
    };

    return (
        <div className="staff-container">
            <h2>Quản lý nhân viên</h2>
            {error && <p className="error">{error}</p>}
            <form className="staff-form" onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="name"
                    placeholder="Họ tên"
                    value={formData.name}
                    onChange={handleChange}
                />
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
                <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                />
                <input
                    name="address"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    name="phone"
                    placeholder="SĐT"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <input
                    name="cccd"
                    placeholder="CCCD"
                    value={formData.cccd}
                    onChange={handleChange}
                />
                <button type="submit">{editId ? "Cập nhật" : "Thêm mới"}</button>
            </form>

            <table className="staff-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên đăng nhập</th>
                        <th>Email</th>
                        <th>Họ tên</th>
                        <th>SĐT</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {staffs.map((s) => (
                        <tr key={s.AccountID}>
                            <td>{s.AccountID}</td>
                            <td>{s.UserName}</td>
                            <td>{s.Email}</td>
                            <td>{s.INFORMATION?.Name_Information}</td>
                            <td>{s.INFORMATION?.Phone}</td>
                            <td>{s.INFORMATION?.Gender}</td>
                            <td>{s.INFORMATION?.Date_Of_Birth}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(s)}>
                                    Sửa
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(s.AccountID)}
                                >
                                    Xoá
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagerStaffPage;
