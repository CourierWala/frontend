import axiosInstance from "./axiosInstance";

/**
 * Download admin report
 * @param {string} type - monthly | quarterly | yearly
 * @param {string} format - pdf | excel
 */
export const downloadAdminReport = async (type, format) => {
  return axiosInstance.get(`/admin/reports/${type}`, {
    params: { format },
    responseType: "blob", // Binary Large Object REQUIRED
  });
};
