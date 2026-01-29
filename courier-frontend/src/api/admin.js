import { config } from "./config";
import axiosInstance from "./axiosInstance";

/* =====================================================
   MANAGER – ADMIN APIs
===================================================== */

/* ---------- GET ---------- */

// Get all managers
export const getAllManagers = () => {
  try {
    const response = axiosInstance.get("/admin/managers");
    return response;
  } catch (ex) {
    console.error("Exception in GET all managers in admin.js");
  }
};

// Get manager by ID
export const getManagerById = (managerId) => {
  // Currently Search functionality NOT required- NOT implemented
  try {
    const response = axiosInstance.get(`/admin/manager/${managerId}`);
    return response.data;
  } catch (ex) {
    console.error(
      `Exception in GET manager by ID in admin.js => manager ID - ${managerId}`,
    );
  }
};

/* ---------- POST ---------- */

// Create new manager
export const createManager = (data) => {
  try {
    const response = axiosInstance.post("/admin/manager", data);
    console.dir("From axios : " + response);
    return response;
  } catch (ex) {
    console.error(
      `Exception in POST creating NEW manager in admin.js\n Received data is : \n`,
    );
    console.dir(data);
  }
};

/* ---------- PUT ---------- */

// Update manager (full update)
export const updateManager = (managerId, data) => {
  try {
    const response = axiosInstance.put(`/admin/manager/${managerId}`, data);
    return response;
  } catch (ex) {
    console.error(
      `Exception in PUT updating manager by ID (${managerId}) in admin.js\n Received data is : \n`,
    );
    console.dir(data);
  }
};

/* ---------- PATCH ---------- */

// Update manager status (ACTIVE / INACTIVE)
export const updateManagerStatus = (managerId, status) => {
  // Currently this functionality NOT required- NOT implemented
  try {
    return axiosInstance.patch(`/admin/manager/${managerId}/status`, {
      status,
    });
  } catch (ex) {
    console.error(
      `Exception in PATCH updating manager's STATUS by ID (${managerId} with ${status}) in admin.js\n`,
    );
  }
};

/* =====================================================
   HUB – ADMIN APIs
===================================================== */

/* ---------- GET ---------- */

// Get all hubs
export const getAllHubs = () => {
  try {
    const response = axiosInstance.get("/admin/hubs");
    return response;
  } catch (ex) {
    console.error(`Exception in GET all hubs in admin.js\n`);
  }
};

// Get hub by ID
export const getHubById = (hubId) => {
  // Currently SEARCH functionality NOT required- NOT implemented
  try {
    const response = axiosInstance.get(`/admin/hub/${hubId}`);
    return response.data;
  } catch (ex) {
    console.error(`Exception in GET hub by ID in admin.js\n`);
  }
};

/* ---------- POST ---------- */

// Create hub
export const createHub = (data) => {
  try {
    const response = axiosInstance.post("/admin/hub", data);
    return response.data;
  } catch (ex) {
    console.error(`Exception in POST create NEW hub in admin.js\n`);
  }
};

/* ---------- PUT ---------- */

// Update hub
export const updateHub = (hubId, data) => {
  try {
    axiosInstance.put(`/admin/hub/${hubId}`, data);
  } catch (ex) {
    console.error(`Exception in PUT updating hub by ID in admin.js\n`);
  }
};

/* ---------- PATCH ---------- */

// Update hub status
export const updateHubStatus = (hubId, status) => {
  // Currently this functionality NOT required- NOT implemented
  try {
    const response = axiosInstance.patch(`/admin/hub/${hubId}/status`, {
      status,
    });
    return response.data;
  } catch (ex) {
    console.error(
      `Exception in PATCH changing status (${status}) of hub by ID (${hubId}) in admin.js\n`,
    );
  }
};

/* =====================================================
   ADMIN DASHBOARD APIs
===================================================== */

/* ---------- GET ---------- */

// Get revenue & expenses per hub
export const getFinanceByHub = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard/finance");
    return response.data;
  } catch (ex) {
    console.error("Exception in GET finance data for admin dashboard");
  }
};

// Get parcel delivery status ratio
export const getParcelDeliveryStats = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard/parcel-status");
    return response.data;
  } catch (ex) {
    console.error("Exception in GET parcel delivery stats for admin dashboard");
  }
};

// Get employees count per hub
export const getEmployeesByHub = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard/employees");
    return response.data;
  } catch (ex) {
    console.error("Exception in GET employees by hub for admin dashboard");
  }
};

// Get admin dashboard summary metrics
export const getAdminDashboardSummary = async () => {
  try {
    const response = await axiosInstance.get("/admin/dashboard/summary");
    return response.data;
  } catch (ex) {
    console.error("Exception in GET admin dashboard summary metrics");
  }
};
