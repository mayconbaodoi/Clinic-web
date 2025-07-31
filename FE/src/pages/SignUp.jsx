import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../skin_web/SignUp.css";

export default function RegisterForm() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        gender: "",
        dob: "",
        address: "",
        phone: "",
        cccd: ""
    });

    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastType, setToastType] = useState("success"); // 'success' | 'error'
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/api/auth/register", form);
            setMessage(res.data.message || "Đăng ký thành công!");
            setToastType("success");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate("/signin");
            }, 2000);
        } catch (err) {
            const errorMsg = err.response?.data?.message || "Đăng ký thất bại";
            setMessage(errorMsg);
            setToastType("error");
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }
    };

    return (
        <div className="signup-container">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" name="username" placeholder="Tên đăng nhập" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="text" name="name" placeholder="Họ tên" onChange={handleChange} required />
                <select name="gender" onChange={handleChange} required>
                    <option value="">Giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                </select>
                <input type="date" name="dob" placeholder="Ngày sinh" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Địa chỉ" onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Số điện thoại" onChange={handleChange} required />
                <input type="text" name="cccd" placeholder="CCCD" onChange={handleChange} required />
                <button type="submit">Đăng ký</button>
            </form>
            {message && !showToast && <p>{message}</p>}
            {showToast && (
                <div className={`toast-success${toastType === "error" ? " toast-error" : ""}`}>
                    {message}
                </div>
            )}
        </div>
    );
}
