import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const { user } = useAuth();
// console.log(user);
export const createPaymentOrder = (amount, order_id) => {
  return axiosInstance.post("/payments/create", null, {
    params: { amount: amount, order_id: order_id },
  });
};

export const handlePaymentResponse = async (res) => {
  const verifyResponse = await axiosInstance.post("/payments/verify", {
    razorpayOrderId: res.razorpay_order_id,
    razorpayPaymentId: res.razorpay_payment_id,
    razorpaySignature: res.razorpay_signature,
  });
  if (verifyResponse.status == 200) {
    toast.success("Payment Verified");
  } else {
    toast.warning("Payment Failed");
  }
  return verifyResponse;
};
