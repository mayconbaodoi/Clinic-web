import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Thêm lại import
import { useNavigate } from "react-router-dom";
import "../../skin_web/manager/ManagerServicePage.css";

// API_URL này trỏ đến managerRoutes.js, là đúng
const API_URL = "http://localhost:3001/api/manager/service";

function ManagerServicePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    Service_name: "",
    Description: "",
    Sample_Method: "",
    Estimated_Time: "",
    Price: "",
    Status: "ON",
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // === FIX: Khôi phục lại logic kiểm tra phân quyền ở frontend ===
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      // Chỉ Manager và Admin mới có quyền truy cập
      if (decoded.role !== "Manager" && decoded.role !== "Admin") {
        alert("Bạn không có quyền truy cập trang này.");
        navigate("/"); // Chuyển hướng về trang chủ
      } else {
        fetchServices(token); // Nếu có quyền, tải dữ liệu
      }
    } catch (err) {
      console.error("Token không hợp lệ hoặc đã hết hạn", err);
      navigate("/login"); // Nếu token lỗi, chuyển về trang đăng nhập
    }
  }, [navigate]);

  const fetchServices = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
      setError("");
    } catch (err) {
      setError("Không thể tải danh sách dịch vụ.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setError("");
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
      handleCancelEdit();
      fetchServices(token);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể lưu dịch vụ.");
    }
  };

  const handleEdit = (service) => {
    setFormData({
      Service_name: service.Service_name,
      Description: service.Description,
      Sample_Method: service.Sample_Method || "",
      Estimated_Time: service.Estimated_Time || "",
      Price: service.Price,
      Status: service.Status,
    });
    setEditId(service.Service_ID);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn vô hiệu hóa dịch vụ này?"))
      return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices(token);
    } catch (err) {
      setError("Không thể vô hiệu hóa dịch vụ.");
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      Service_name: "",
      Description: "",
      Sample_Method: "",
      Estimated_Time: "",
      Price: "",
      Status: "ON",
    });
    setEditId(null);
    setError("");
  };

  return (
    <div className="manager-service-page">
      <h2>Quản lý Dịch vụ & Giá</h2>
      <div className="manager-content">
        <form className="service-form" onSubmit={handleFormSubmit}>
          <h3>{editId ? "Cập nhật dịch vụ" : "Thêm dịch vụ mới"}</h3>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            name="Service_name"
            placeholder="Tên dịch vụ (*)"
            value={formData.Service_name}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="Description"
            placeholder="Mô tả"
            value={formData.Description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Sample_Method"
            placeholder="Phương pháp lấy mẫu"
            value={formData.Sample_Method}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="Estimated_Time"
            placeholder="Thời gian ước tính"
            value={formData.Estimated_Time}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="Price"
            placeholder="Giá dịch vụ (*)"
            value={formData.Price}
            onChange={handleInputChange}
            required
          />
          <select
            name="Status"
            value={formData.Status}
            onChange={handleInputChange}
          >
            <option value="ON">Bật</option>
            <option value="OFF">Tắt</option>
          </select>
          <div className="form-buttons">
            <button type="submit">{editId ? "Cập nhật" : "Thêm mới"}</button>
            {editId && (
              <button type="button" onClick={handleCancelEdit}>
                Hủy
              </button>
            )}
          </div>
        </form>

        <div className="service-table-wrapper">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <table className="service-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên dịch vụ</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.Service_ID}>
                    <td>{service.Service_ID}</td>
                    <td>{service.Service_name}</td>
                    <td>{parseFloat(service.Price).toLocaleString()} đ</td>
                    <td>{service.Status === "ON" ? "Bật" : "Tắt"}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(service)}>Sửa</button>
                        {service.Status === "ON" && (
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(service.Service_ID)}
                          >
                            Vô hiệu hóa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
export default ManagerServicePage;
