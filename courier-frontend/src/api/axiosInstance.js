import axios from "axios";
import { toast } from "react-toastify";
import { config } from "./config";

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

// /* REQUEST INTERCEPTOR - FOR JWT Tokens */
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     config.headers["Content-Type"] = "application/json";
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// RESPONSE + ERROR INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    // Successful response → pass through
    return response;
  },
  (error) => {
    if (!error.response) {
      toast.error("Network error. Backend not reachable");
      return Promise.reject(error);
    }


    const status = error.response?.status;


    if (status === 401) {
      toast.error("Session expired. Please login again");

      // optional cleanup
      // localStorage.clear();
      // window.location.href = "/login";
    }

    if (status === 403) {
      toast.error("You are not authorized");
    }

    if (status === 500) {
      toast.error("Server error. Try again later");
    }

    // IMPORTANT: rethrow error so component can handle if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;
