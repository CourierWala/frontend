import React, { useState } from "react";
import CustomerLayout from "../../layouts/CustomerLayout";
import { HiLocationMarker, HiOutlineCube } from "react-icons/hi";
import { MdLocalShipping } from "react-icons/md";
import OlaAutocomplete from "../../components/common/OlaAutocomplete";
import { toast } from "react-toastify";

const NewShipment = () => {
  const [form, setForm] = useState({
    pickupLocation: null,
    deliveryLocation: null,
    pickupCity: "",
    pickupPincode: "",
    pickupDate: "",
    deliveryAddress: "",
    deliveryCity: "",
    deliveryPincode: "",
    packageSize: "",
    weight: "",
    deliveryType: "",
    description: "",
    pickupLatitude: "",
    pickupLongitude: "",
    deliveryLatitude: "",
    deliveryLongitude: ""

  });

  const [pickupLocation, setPickupLocation] = useState({})
  const [deliveryLocation, setDeliveryLocation] = useState({})


  const isFutureOrToday = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pickupDate = new Date(dateStr);
    pickupDate.setHours(0, 0, 0, 0);

    return pickupDate >= today;
  };

  const isSameLocation = (p1, p2) => {
    const latDiff = Math.abs(p1.lat - p2.lat);
    const lngDiff = Math.abs(p1.lng - p2.lng);

    return latDiff < 0.0001 && lngDiff < 0.0001;
  };



  const validateForm = () => {
    if (!form.pickupAddress.trim()) {
      toast.error("Pickup address is required");
      return false;
    }

    if (isSameLocation(pickupLocation, deliveryLocation)) {
      toast.error("Pickup and delivery locations cannot be the same");
      return false;
    }


    if (!form.pickupCity.trim()) {
      toast.error("Pickup city is required");
      return false;
    }

    if (!form.pickupDate) {
      toast.error("Pickup date is required");
      return false;
    }

    if (!isFutureOrToday(form.pickupDate)) {
      toast.error("Pickup date must be today or a future date");
      return false;
    }


    if (!/^\d{6}$/.test(form.pickupPincode)) {
      toast.error("Pickup pincode must be 6 digits");
      return false;
    }

    if (!form.deliveryAddress.trim()) {
      toast.error("Delivery address is required");
      return false;
    }

    if (!form.deliveryCity.trim()) {
      toast.error("Delivery city is required");
      return false;
    }

    if (!/^\d{6}$/.test(form.deliveryPincode)) {
      toast.error("Delivery pincode must be 6 digits");
      return false;
    }

    if (!form.weight || form.weight <= 0) {
      toast.error("Weight must be greater than 0");
      return false;
    }

    if (!form.packageSize) {
      toast.error("Please select package size");
      return false;
    }

    if (!pickupLocation.lat || !pickupLocation.lng) {
      toast.error("Please select pickup location on map");
      return false;
    }

    if (!deliveryLocation.lat || !deliveryLocation.lng) {
      toast.error("Please select delivery location on map");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const shipmentData = {
      ...form,
      pickupLatitude: pickupLocation.lat,
      pickupLongitude: pickupLocation.lng,
      deliveryLatitude: deliveryLocation.lat,
      deliveryLongitude: deliveryLocation.lng,
    };

    console.log(shipmentData);

    // axios.post(...)
    toast.success("Shipment booked successfully 🚚");
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            <OlaAutocomplete
              placeholder="Pickup Location"
              setLocation={setPickupLocation}
            />
            <TwoColumn>
              <OlaAutocomplete
                label="Pickup Address"
                value={form.pickupLocation?.address || ""}
                onSelect={(data) =>
                  setForm((prev) => ({ ...prev, pickupLocation: data }))
                }
              />
              <InputField
                label="PIN Code"
                name="pickupPincode"
                value={form.pickupPincode}
                onChange={handleChange}
                isPin
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
            <OlaAutocomplete
              placeholder="Delivery Location"
              setLocation={setDeliveryLocation}
            />
            <TwoColumn>
              <OlaAutocomplete
                label="Delivery Address"
                value={form.deliveryLocation?.address || ""}
                onSelect={(data) =>
                  setForm((prev) => ({ ...prev, deliveryLocation: data }))
                }
              />
              <InputField
                label="PIN Code"
                name="deliveryPincode"
                value={form.deliveryPincode}
                onChange={handleChange}
                isPin
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
              label="Delivery Type"
              name="deliveryType"
              options={["Standard", "Express"]}
              value={form.deliveryType}
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

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  isPin = false
}) => (
  <label className="block">
    <p className="text-gray-700 mb-1">{label}</p>
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => {
        if (isPin) {
          const onlyDigits = e.target.value.replace(/\D/g, "");
          if (onlyDigits.length <= 6) {
            onChange({
              target: { name, value: onlyDigits }
            });
          }
        } else {
          onChange(e);
        }
      }}
      maxLength={isPin ? 6 : undefined}
      pattern={isPin ? "[1-9][0-9]{5}" : undefined}
      title={isPin ? "Enter a valid 6-digit PIN code" : undefined}
      required={isPin}
      inputMode={isPin ? "numeric" : undefined}
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

