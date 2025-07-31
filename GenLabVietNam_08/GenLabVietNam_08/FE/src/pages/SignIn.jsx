import React, { useState } from "react";
import "../skin_web/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function SignIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/login",
                formData
            );

            const { token, user } = response.data;

            if (user.status !== "on") {
                setError("Tài khoản đã bị vô hiệu hóa.");
                return;
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "Manager") {
                navigate("/manager");
            } else if (user.role === "Admin") {
                navigate("/admin");
            } else if (user.role === "Staff") {
                navigate("/staff");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(
                err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại."
            );
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(
                "http://localhost:3001/api/auth/google-login",
                {
                    credential: credentialResponse.credential,
                }
            );
            const { token, user } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "Manager") {
                navigate("/manager");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Đăng nhập Google thất bại. Vui lòng thử lại."
            );
        }
    };

    const handleGoogleError = () => {
        setError("Đăng nhập Google thất bại. Vui lòng thử lại.");
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="signin-form">
                <label>
                    Username
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>

                <div className="forgot-password-link">
                    <Link to="/reset-password" className="forgot-password-btn">
                        Quên mật khẩu?
                    </Link>
                </div>

                <button type="submit">Sign In</button>

                <div className="google-login-container">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        useOneTap
                    />
                </div>

                <p className="switch-auth">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </form>
        </div>
    );
}
