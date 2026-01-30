import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";

export const fetchStaffProfile = async () => {
  return (await axiosInstance.get(`/staff/profile`)).data;
};

export const saveStaffProfile = async (staffProfile) => {
  return (await axiosInstance.patch(`/staff/profile`, staffProfile));
};

export const changePassword = async (body) => {
  return (await axiosInstance.post(`/staff/profile/changepassword`, body)).data;
};

export const staff_signup = async (
  name,
  email,
  phone,
  password,
  vehicleType,
  vehicleNumber,
  licenseNumber,
  hubId,
) => {
  const body = {
    name,
    email,
    phone,
    password,
    vehicleType,
    vehicleNumber,
    licenseNumber,
    hubId,
  };
  // const body = {currentPassword, newPassword };
  return await axiosInstance.post(`/staff/applyforjob`, body);
};

export const getAvailableOrders = async () => {
  return (await axiosInstance.get(`/staff/dashboard`)).data;
};

export const getAcceptedOrders = async () => {
  return (await axiosInstance.get(`/staff/accepted-orders`)).data;
};

export const getcurrentOrders = async () => {
  return (await axiosInstance.get(`/staff/current-orders`)).data;
};

export const getDeliveredOrders = async () => {
  return (await axiosInstance.get("/staff/delivered-orders")).data;
};


export const AcceptCustomerOrders = async ( orderid) => {
  
  return (await axiosInstance.patch(`/staff/dashboard/customer/${orderid}`)).data;
};


export const AcceptHubOrders = async ( orderid) =>{
  return (await axiosInstance.patch(`/staff/dashboard/Hub/${orderid}`)).data;
};

export const pickupCustomerOrders = async (orderid) =>{
  return (await axiosInstance.patch(`/staff/accepted-orders/${orderid}`)).data;
};

export const DeliverCustomerOrders = async ( orderid) =>{
  return (await axiosInstance.patch(`/staff/Current-Orders/customer/${orderid}`)).data;
};
export const DeliverHubOrders = async ( orderid) =>{
  return (await axiosInstance.patch(`/staff/Current-Orders/Hub/${orderid}`)).data;
};
export const fetchWeeklyEarnings = async (staffId) => {
  return (await axiosInstance.get(`/staff/earnings/${staffId}/weekly`)).data;
};
