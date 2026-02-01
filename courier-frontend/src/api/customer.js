import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";





export const createShipment = (shipmentData) => {
  return axiosInstance.post("/customer/shipments", shipmentData);
};

export const callShipmentHistory = () => {
  return axiosInstance.get("/customer/shipments");
}

export const callOlaAutoCompleteApi = (query) => {

  const res = axiosInstance.get(
    "/customer/location/autocomplete",
    {
      params: { input: query },
    });
  return res;
}

export const getUserData = () => {
  return axiosInstance.get("/customer/profile")
}

export const updateUserProfile = (body) => {
  return axiosInstance.put("/customer/profile", body)
}