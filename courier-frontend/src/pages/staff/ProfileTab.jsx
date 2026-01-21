


import React, { useState } from "react";
import { save } from "../../api/staff";

export default function ProfileTab(){

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicleType ,setVehicleType] = useState('')
  const [vehicleNumber ,setVehicleNumber] = useState('')

  const savechanges = async()=>{
    window.alert("save changes sucessfully");
    // const response = await save(firstName,lastName,email,phone,vehicleType,vehicleNumber);

    // if (response['status'] === 'success') {
        

    //     window.alert("save changes sucessfully");
    //   }

  }

  return (
    
      <div className="grid md:grid-cols-1 gap-6 ">
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <div className="flex items-center gap-4">
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                First Name
              </label>
              <input  onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                defaultValue=""
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Last Name
              </label>
              <input  onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                defaultValue=""
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Email
              </label>
              <input  onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                defaultValue=""
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Phone Number
              </label>
              <input  onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                defaultValue=""
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-500 mb-1">
                Address
              </label>
              <input  onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                defaultValue=""
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Vehicle Type
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm"
                 value={vehicleType}
                 onChange={(e) => setVehicleType(e.target.value)}
              >
                <option>Van</option>
                <option>Bike</option>
                <option>Car</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Vehicle Number
              </label>
              <input  onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                defaultValue=""
              />
            </div>
          </div>

          <button className="mt-4 px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-medium" onClick={savechanges}>
            Save Changes
          </button>
        </div>

        
      </div>
   
  );
}