import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";

export async function save(firstName,lastName,email,phone,vehicleType,vehicleNumber) {
  try {
    const url = `${config.server}/manager/profile/save`
    console.log(firstName,lastName,email,phone,vehicleType,vehicleNumber);

    const body = {firstName,lastName,email,phone,vehicleType,vehicleNumber};
    
    const response = await axios.post(url,body);
    
    return response.data
  } catch (ex){

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
