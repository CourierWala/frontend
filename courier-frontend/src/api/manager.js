import axios from "axios";
import { config } from "./config";

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
