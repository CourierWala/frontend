import axios from "axios";
import { config } from "./config";
import axiosInstance from "./axiosInstance";



export const userLogin = (email, password) => {
  const body = { email, password }
  return axiosInstance.post("/auth/login", body);
};

export const customerSignup = (body) => {
  return axiosInstance.post("/auth/signup", body);
}

