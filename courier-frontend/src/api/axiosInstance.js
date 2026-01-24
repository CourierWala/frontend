import axios from "axios";
import { toast } from "react-toastify";
import { config } from "./config";

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  withCredentials: true,
});

// RESPONSE + ERROR INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    // Successful response → pass through
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      toast.error("Session expired. Please login again");

      // optional cleanup
      localStorage.clear();
      window.location.href = "/login";
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
