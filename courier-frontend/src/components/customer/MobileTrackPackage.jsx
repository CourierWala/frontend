import React from "react";
const MobileTrackPackage = () => {
  return (
    <div className="flex items-center justify-center h-[200px] px-4 mb-10 md:mb-0">
      <div
        className="
          bg-white/40 backdrop-blur-md
          w-full max-w-sm rounded-2xl shadow-xl border p-4
          flex flex-col items-center text-center gap-3
          [@media(min-width:430px)]:flex-row
          [@media(min-width:430px)]:text-left
        "
      >
        {/* IMAGE */}
        <img
          src="/images/courierMan2_1-removebg-preview.png"
          alt="Track Package"
          className="w-24 h-24 object-contain"
        />

        {/* CONTENT */}
        <div className="flex-1 w-full">
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            Track Your Package
          </h2>

          <p className="text-xs text-gray-600 mt-1">
            Live location & delivery updates
          </p>

          <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-orange-700 transition">
            Track Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileTrackPackage;
