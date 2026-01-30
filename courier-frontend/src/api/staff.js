import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";

export const fetchStaffProfile = async (staff_id) => {
  return (await axiosInstance.get(`/staff/profile/${staff_id}`)).data;
};

export const saveStaffProfile = async (staff_id, staffProfile) => {
  return (await axiosInstance.post(`/staff/profile/${staff_id}`, staffProfile));
};

export const changePassword = async (staffId, body) => {
  // const body = {currentPassword, newPassword };
  return (await axiosInstance.post(`/staff/profile/changepassword/${staffId}`,body)).data;
};

export async function save(
  firstName,
  lastName,
  email,
  phone,
  vehicleType,
  vehicleNumber,
) {
  try {
    const url = `${config.server}/staff/profile/save`;
    console.log(firstName, lastName, email, phone, vehicleType, vehicleNumber);

    const body = {
      firstName,
      lastName,
      email,
      phone,
      vehicleType,
      vehicleNumber,
    };

    const response = await axios.post(url, body);

    return response.data;
  } catch (ex) {
    console.log(`exception: `, ex);
  }
}
export async function fetchOrders() {
  try {
    // staff id from seession
    const url = `${config.server}/staff/dashboard`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
}

export async function pickupOrder(orderId) {
  try {
    const url = `${config.server}/staff/order/pickup`;
    const body = { orderId };
    const response = await axios.patch(url, body);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
}

export async function handoverOrder(orderId) {
  try {
    const url = `${config.server}/staff/order/handover`;
    const body = { orderId };
    const response = await axios.patch(url, body);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
}

export async function getOrderDetails(orderId) {
  try {
    const url = `${config.server}/staff/orderDetails`;
    //orderId as path varaible
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
}

export async function fetchShipmentHistory() {
  try {
    const url = `${config.server}/staff/StaffShipmentHistory`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipment history", error);
  }
}


export const staff_signup = async (

  name,
  email,
  phone,
  vehicleType,
  vehicleNumber,
  licenseNumber,
  hubId,
) => {
  const body = {
      name,
      email,
      phone,
      vehicleType,
      vehicleNumber,
      licenseNumber,
      hubId,
    };
  // const body = {currentPassword, newPassword };
  return (await axiosInstance.post(`/staff/applyforjob`,body));
};

export const getAvailableOrders = async () => {
  
  return (await axiosInstance.get(`/staff/dashboard`)).data;
};

export const getAcceptedOrders = async () => {
  let staffid = 1;
  return (await axiosInstance.get(`/staff/accepted-orders/${staffid}`)).data;
};

export const getcurrentOrders = async () => {
  let staffid = 1;
  return (await axiosInstance.get(`/staff/current-orders/${staffid}`)).data;
};


export const AcceptCustomerOrders = async ( orderid) => {
  
  return (await axiosInstance.put(`/staff/dashboard/customer/${orderid}`)).data;
};


export const AcceptHubOrders = async ( orderid) =>{
  return (await axiosInstance.put(`/staff/dashboard/Hub/${orderid}`)).data;
};






