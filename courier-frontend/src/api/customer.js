import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";

export async function customer_signup(name, email, phone, password) {
  try {
    const url = `${config.server}/customer/signup`
    console.log(name, email, phone, password);

    const body = { name, email, phone, password };

    const response = await axios.post(url, body);

    return response.data
  } catch (ex) {

    console.log(`exception: `, ex);
  }
}

export async function customer_login(email, password) {
  try {
    const url = `${config.server}/customer/login`
    console.log(name, email, phone, password);

    const body = { email, password };
    const response = await axios.post(url, body);

    return response.data
  } catch (ex) {

    console.log(`exception: `, ex);
  }
}

export const createShipment = (shipmentData) => {
  return axiosInstance.post("/customer/shipments", shipmentData);
};