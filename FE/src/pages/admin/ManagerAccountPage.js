// ManagerAccountPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../../skin_web/admin/ManagerAccountPage.css";

const API_URL = "http://localhost:3001/api/admin/account";

function ManagerAccountPage() {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "Customer",
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
      if (decoded.role !== "Admin") {
        alert("Bạn không có quyền truy cập trang này.");
        navigate("/");
      } else {
        fetchAccounts(token);
      }
    } catch (err) {
      console.error("Token lỗi:", err);
      navigate("/login");
    }
  }, [navigate]);

  const fetchAccounts = async (token) => {
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(res.data);
    } catch (err) {
      setError("Không thể tải danh sách tài khoản.");
    }
  };

  const handleToggleStatus = async (accountId, currentStatus) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${API_URL}/${accountId}/status`,
        { status: currentStatus === "on" ? "off" : "on" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchAccounts(token);
    } catch (err) {
      setError("Không thể cập nhật trạng thái.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
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
      setFormData({
        username: "",
        password: "",
        email: "",
        role: "Customer",
        name: "",
        gender: "Nam",
        dob: "",
        address: "",
        phone: "",
        cccd: "",
      });
      setEditId(null);
      fetchAccounts(token);
    } catch (err) {
      setError("Không thể lưu tài khoản.");
    }
  };

  const handleEdit = (acc) => {
    setFormData({
      username: acc.UserName,
      password: acc.Password,
      email: acc.Email,
      role: acc.Role,
      name: acc.INFORMATION?.Name_Information || "",
      gender: acc.INFORMATION?.Gender || "Nam",
      dob: acc.INFORMATION?.Date_Of_Birth || "",
      address: acc.INFORMATION?.Address || "",
      phone: acc.INFORMATION?.Phone || "",
      cccd: acc.INFORMATION?.CCCD || "",
    });
    setEditId(acc.AccountID);
  };

  const handleCancelEdit = () => {
    setFormData({
      username: "",
      password: "",
      email: "",
      role: "Customer",
      name: "",
      gender: "Nam",
      dob: "",
      address: "",
      phone: "",
      cccd: "",
    });
    setEditId(null);
  };

  return (
    <div className="manager-account-page">
      <h2>Quản lý Tài khoản</h2>
      {error && <p className="error">{error}</p>}

      <form className="account-form" onSubmit={handleFormSubmit}>
        <label>
          Username
          <input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            type="password"
          />
        </label>
        <label>
          Email
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            type="email"
          />
        </label>
        <label>
          Role
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="Customer">Customer</option>
            <option value="Staff">Staff</option>
            <option value="Manage">Manage</option>
            <option value="Admin">Admin</option>
          </select>
        </label>
        <label>
          Họ tên
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Họ tên"
            required
          />
        </label>
        <label>
          Giới tính
          <input
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            placeholder="Giới tính"
            required
          />
        </label>
        <label>
          Ngày sinh
          <input
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            placeholder="Ngày sinh"
            type="date"
            required
          />
        </label>
        <label>
          Địa chỉ
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Địa chỉ"
            required
          />
        </label>
        <label>
          SĐT
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="SĐT"
            required
          />
        </label>
        <label>
          CCCD
          <input
            name="cccd"
            value={formData.cccd}
            onChange={handleInputChange}
            placeholder="CCCD"
            required
          />
        </label>
        <div className="form-buttons">
          <button type="submit">{editId ? "Cập nhật" : "Thêm mới"}</button>
          {editId && (
            <button type="button" onClick={handleCancelEdit}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <table className="account-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Họ tên</th>
            <th>SĐT</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => (
            <tr key={acc.AccountID}>
              <td>{acc.UserName}</td>
              <td>{acc.Email}</td>
              <td>{acc.Role}</td>
              <td>{acc.INFORMATION?.Name_Information || "—"}</td>
              <td>{acc.INFORMATION?.Phone || "—"}</td>
              <td>{acc.Status === "on" ? "Hoạt động" : "Đã khóa"}</td>
              <td>
                <button onClick={() => handleEdit(acc)}>Sửa</button>
                <button
                  className={acc.Status === "on" ? "lock" : ""}
                  onClick={() => handleToggleStatus(acc.AccountID, acc.Status)}
                >
                  {acc.Status === "on" ? "Khóa" : "Mở khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagerAccountPage;
