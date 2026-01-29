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

  //Get Email from session object later
  const email = "omkarmane8603@gmail.com";

  if (verifyResponse.status == 200) {
    const emailResponse = await axios.post(
      "http://localhost:3000/api/email/send",
      {
        to: `${email}`,
        subject: "Payment to CourierWala - SuccessFull !!",
        message: `Payment Successfull!! Pyment ID: ${res.razorpay_payment_id}`,
      },
    );
    console.log(emailResponse);
  } else {
    toast.warning("Payment Failed");
  }
  return verifyResponse;
};
