import React, { useEffect, useState } from "react";
import {
  getPricingConfig,
  updatePricingConfig,
} from "../../api/admin";

export default function AdminPricing() {
  const [formData, setFormData] = useState({
    basePrice: "",
    pricePerKm: "",
    pricePerKg: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔄 Fetch pricing config
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await getPricingConfig(); // ✅ await + already data
        setFormData({
          basePrice: data.basePrice,
          pricePerKm: data.pricePerKm,
          pricePerKg: data.pricePerKg,
        });
      } catch (err) {
        console.error("Failed to load pricing config", err);
        alert("Failed to load pricing config");
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await updatePricingConfig({
        basePrice: Number(formData.basePrice),
        pricePerKm: Number(formData.pricePerKm),
        pricePerKg: Number(formData.pricePerKg),
      });

      alert("Price updated successfully");
    } catch (err) {
      console.error("Failed to update pricing", err);
      alert("Failed to update pricing");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading pricing...</p>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-xl font-semibold">Pricing Control</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-600 text-sm">Base Price (₹)</label>
            <input
              type="number"
              name="basePrice"
              value={formData.basePrice}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Price per KM (₹)</label>
            <input
              type="number"
              name="pricePerKm"
              value={formData.pricePerKm}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Price per KG (₹)</label>
            <input
              type="number"
              name="pricePerKg"
              value={formData.pricePerKg}
              onChange={handleChange}
              className="w-full border p-2 rounded-md"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          Update Pricing
        </button>
      </div>
    </div>
  );
}
