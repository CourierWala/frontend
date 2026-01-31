import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";

export async function save(firstName, lastName, email, phone, vehicleType, vehicleNumber) {
  try {
    const url = `${config.server}/manager/profile/save`
    console.log(firstName, lastName, email, phone, vehicleType, vehicleNumber);

    const body = { firstName, lastName, email, phone, vehicleType, vehicleNumber };

    const response = await axios.post(url, body);

    return response.data
  } catch (ex) {

    console.log(`exception: `, ex);
  }
}

export const getAllCurrentStaff = async () => {
  return (await axiosInstance.get(`/manager/current-staff`));
}

export const getAllJobApplications = async () => {
  return (await axiosInstance.get(`/manager/applications`));
}

export const acceptStaff = async (applicationId) => {
  return (await axiosInstance.get(`/manager/acceptStaff/${applicationId}`));
}

export const rejectStaff = async (rejectedId) => {
  return (await axiosInstance.get(`/manager/rejectStaff/${rejectedId}`));
}

// ===== ORDERS BY STATUS =====
export const getManagerOrderStatus = async () => {
  return (await axiosInstance.get(`/manager/dashboard/order-status`)).data;
};

// ===== VEHICLE TYPE RATIO (PIE) =====
export const getVehicleTypeRatio = async () => {
  return (await axiosInstance.get(`/manager/dashboard/vehicle-ratio`)).data;
};

// ===== DISPATCH TREND (LAST 7 DAYS) =====
export const getDispatchTrend = async () => {
  return (await axiosInstance.get(`/manager/dashboard/dispatch-trend`)).data;
};

// ===== DELIVERY STAFF LOAD =====
export const getStaffLoad = async () => {
  return (await axiosInstance.get(`/manager/dashboard/staff-load`)).data;
};
