import React, { useEffect, useState } from "react";

const TrackPackagePopup = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 4000);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div
            className="
        absolute top-70 right-144.5 
        bg-transparent
        p-5 w-180 h-[300px]
        z-50 animate-popup
        rounded-xl
        pointer-events-auto
      "
        >
            {/* Title */}
            <h3 className="text-2xl font-extrabold text-white text-center mb-6">
                Track Your Package
            </h3>

            {/* Input + Button (50% width, centered) */}
            <div className="w-1/2 mx-auto">
                <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g., TRK-3099)"
                    className="
            w-full border border-gray-300 rounded-lg px-2 py-1
            focus:ring-2 focus:ring-orange-400 outline-none
            placeholder-white text-white bg-transparent
          "
                />

                <Button
                    className="
            w-full mt-3 bg-orange-600 hover:bg-orange-700 
            text-white py-2 rounded-lg text-sm
          "
                >
                    Track Now
                </Button>
            </div>
        </div>
    );
};

export default TrackPackagePopup;
