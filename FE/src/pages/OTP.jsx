import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function OTPVerify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastType, setToastType] = useState("success");
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy email từ location state hoặc query param
  const email = location.state?.email || new URLSearchParams(window.location.search).get("email") || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !email) {
      setMessage("Vui lòng nhập đầy đủ OTP và email.");
      setToastType("error");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/api/auth/verify-register-otp", { email, otp });
      setMessage(res.data.message || "Xác thực thành công!");
      setToastType("success");
      // Đăng nhập tự động sau khi xác thực thành công
      const loginRes = await axios.post("http://localhost:3001/api/auth/login", {
        username: email,
        password: location.state?.password || ""
      });
      // Lưu token và user info nếu cần
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Xác thực thất bại");
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Xác thực OTP</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <input
          type="text"
          name="otp"
          placeholder="Nhập mã OTP"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>{loading ? "Đang xác thực..." : "Xác thực"}</button>
      </form>
      {message && (
        <div className={`toast-success${toastType === "error" ? " toast-error" : ""}`}>{message}</div>
      )}
    </div>
  );
}
