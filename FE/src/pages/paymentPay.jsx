import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../skin_web/paymentPage.css";

export default function PaymentPage() {
    const location = useLocation();
    const bookingId = location.state?.bookingId;
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Lấy thông tin booking để lấy số tiền cần thanh toán
        const fetchBooking = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3001/api/bookings/${bookingId}`
                );
                setAmount(res.data?.Price || 1000000); 
                setLoading(false);
            } catch (err) {
                setError("Không thể lấy thông tin đơn hàng.");
                setLoading(false);
            }
        };
        if (bookingId) fetchBooking();
        else {
            setError("Không tìm thấy mã đơn hàng.");
            setLoading(false);
        }
    }, [bookingId]);

    const handleVNPay = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/api/vnpay/create_payment_url",
                {
                    amount: amount,
                    orderInfo: `Thanh toán đơn hàng #${bookingId}`,
                }
            );
            window.location.href = res.data.paymentUrl;
        } catch (err) {
            setError("Không thể tạo link thanh toán VNPay.");
        }
    };

    if (loading) return <div className="payment-container">Đang tải...</div>;
    if (error) return <div className="payment-container error">{error}</div>;

    return (
        <div className="payment-container">
            <h2>Thanh toán đơn hàng #{bookingId}</h2>
            <div className="payment-info">
                <p>Số tiền cần thanh toán:</p>
                <div className="payment-amount">{amount.toLocaleString()} đ</div>
            </div>
            <button className="vnpay-btn" onClick={handleVNPay}>
                Thanh toán VNPay
            </button>
        </div>
    );
}
