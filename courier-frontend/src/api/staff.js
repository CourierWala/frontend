import axios from "axios";
import { config } from "./config";

export async function save(firstName,lastName,email,phone,vehicleType,vehicleNumber) {
  try {
    const url = `${config.server}/staff/profile/save`
    console.log(firstName,lastName,email,phone,vehicleType,vehicleNumber);

    const body = {firstName,lastName,email,phone,vehicleType,vehicleNumber};
    
    const response = await axios.post(url,body);
    
    return response.data
  } catch (ex){

    console.log(`exception: `, ex);
  }
}
export async function fetchOrders(){
  try {
    const url = `${config.server}/staff/dashboard`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
};

export async function pickupOrder(orderId){
    try {
        const url = `${config.server}/staff/dashboard/order/pickup`;
        const body ={orderId} 
        const response = await axios.post(url,body);
        return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
}

export async function handoverOrder(orderId){
    try {
        const url = `${config.server}/staff/dashboard/order/handover`;
        const body ={orderId} 
        const response = await axios.post(url,body);
        return response.data;
  } catch (error) {
    console.error("Error fetching orders", error);
  }
}


export async function fetchShipmentHistory() {
  try {
    const url = `${config.server}/staff/StaffShipmentHistory`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipment history", error);
  }
}

export async function changePassword(staffid,currentPassword,newPassword){
  try {
        const url = `${config.server}/staff/Profile/changepassword`;
        const body ={staffid,currentPassword,newPassword} 
        const response = await axios.post(url,body);
        return response.data;
  } catch (error){
    console.error("Error in changing password", error);
  }

}

