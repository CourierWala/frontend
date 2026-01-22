import React, { useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import { HiLocationMarker, HiOutlineCube } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";
import OlaAutocomplete from "../../components/common/OlaAutocomplete";

const NewShipment = () => {
  const [form, setForm] = useState({
    pickupLocation: null,
    deliveryLocation: null,
    pickupCity: "",
    deliveryCity: "",
    pickupHouseNo: "",
    pickupDate: "",
    deliveryHouseNo: "",
    packageSize: "",
    weight: "",
    serviceType: "",
    description: "",
  });

  const CITY_OPTIONS = ["Mumbai", "Pune", "Bangalore", "Delhi", "Chennai"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Shipment Booked Successfully!");
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-2">Create New Shipment</h1>
        <p className="text-gray-600 mb-8">
          Fill in the details to book your delivery
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* SECTION: PICKUP INFO */}
          <SectionCard
            icon={<HiLocationMarker className="text-orange-500 text-2xl" />}
            title="Pickup Information"
          >
            <TwoColumn>
              <OlaAutocomplete
                label="Pickup Address"
                value={form.pickupLocation?.address || ""}
                onSelect={(data) =>
                  setForm((prev) => ({ ...prev, pickupLocation: data }))
                }
              />
              <InputField
                label="House no."
                name="pickupHouseNo"
                value={form.pickupHouseNo}
                onChange={handleChange}
              />
            </TwoColumn>

            <TwoColumn>
              <SelectField
                label="Pickup City"
                name="pickupCity"
                options={CITY_OPTIONS}
                value={form.pickupCity}
                onChange={handleChange}
              />

              <InputField
                label="Pickup Date"
                name="pickupDate"
                type="date"
                value={form.pickupDate}
                onChange={handleChange}
              />
            </TwoColumn>
          </SectionCard>

          {/* SECTION: DELIVERY INFO */}
          <SectionCard
            icon={<MdLocalShipping className="text-orange-500 text-2xl" />}
            title="Delivery Information"
          >
            <TwoColumn>
              <OlaAutocomplete
                label="Delivery Address"
                value={form.deliveryLocation?.address || ""}
                onSelect={(data) =>
                  setForm((prev) => ({ ...prev, deliveryLocation: data }))
                }
              />
              <InputField
                label="House no."
                name="deliveryHouseNo"
                value={form.deliveryZip}
                onChange={handleChange}
              />
            </TwoColumn>

            <TwoColumn>
              <SelectField
                label="Delivery City"
                name="deliveryCity"
                options={CITY_OPTIONS}
                value={form.deliveryCity}
                onChange={handleChange}
              />
            </TwoColumn>
          </SectionCard>

          {/* SECTION: PACKAGE DETAILS */}
          <SectionCard
            icon={<HiOutlineCube className="text-orange-500 text-2xl" />}
            title="Package Details"
          >
            <TwoColumn>
              <SelectField
                label="Package Size"
                name="packageSize"
                options={["Small", "Medium", "Large"]}
                value={form.packageSize}
                onChange={handleChange}
              />
              <InputField
                label="Weight (kg)"
                name="weight"
                value={form.weight}
                onChange={handleChange}
              />
            </TwoColumn>

            <SelectField
              label="Service Type"
              name="serviceType"
              options={["Standard", "Express", "Same Day"]}
              value={form.serviceType}
              onChange={handleChange}
            />

            <TextareaField
              label="Package Description (Optional)"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the contents of your package..."
            />
          </SectionCard>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              className="px-6 py-3 border rounded-lg text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 shadow"
              onClick={handleSubmit}
            >
              Book Shipment →
            </button>
          </div>
        </form>
      </div>
    </CustomerLayout>
  );
};

export default NewShipment;

/******************************
 * REUSABLE COMPONENTS
 ******************************/

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    {/* TITLE */}
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>

    <div className="space-y-4">{children}</div>
  </div>
);

const TwoColumn = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const InputField = ({ label, name, type = "text", value, onChange }) => (
  <label className="block">
    <p className="text-gray-700 mb-1">{label}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-2 focus:ring focus:ring-orange-200"
    />
  </label>
);

const SelectField = ({ label, name, options, value, onChange }) => (
  <label className="block">
    <p className="text-gray-700 mb-1">{label}</p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-2 focus:ring focus:ring-orange-200 bg-white"
    >
      <option value="" disabled>
        Select {label.toLowerCase()}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <label className="block">
    <p className="text-gray-700 mb-1">{label}</p>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border rounded-lg p-2 h-24 resize-none focus:ring focus:ring-orange-200"
    />
  </label>
);

const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    pickupLocation: {
      address: form.pickupLocation.address,
      lat: form.pickupLocation.lat,
      lng: form.pickupLocation.lng,
    },
    deliveryLocation: {
      address: form.deliveryLocation.address,
      lat: form.deliveryLocation.lat,
      lng: form.deliveryLocation.lng,
    },
  };

  console.dir("FINAL PAYLOAD:\n", payload);
};

