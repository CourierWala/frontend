import { Link } from "react-router-dom";
import NavBar from "../../components/common/NavBar";
import React, { useEffect } from "react";
import { FiTruck, FiShield, FiActivity, FiStar } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";


import TruckScene from "../../components/Three Fiber/truckScene" // 🚚 your 3D truck component

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-in-out" });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FFF7EE] overflow-hidden">
      {/* Navbar */}
      <NavBar />

      {/* 🚚 BACKGROUND TRUCK ANIMATION */}
      <div className="absolute hidden md:block top-28 right-0 w-full h-[200px] mb-20 opacity-90 pointer-events-none">
        <TruckScene />
      </div>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="flex flex-col pt-10 md:flex-row items-center justify-between px-10 md:px-20 mt-28 relative z-10">
        {/* LEFT TEXT */}
        <div className="max-w-xl" data-aos="fade-right">
          <h1 className="text-6xl font-extrabold leading-tight text-gray-900">
            Fast. Secure. <br />
            <span className="text-orange-600">Swift Deliveries.</span>
          </h1>

          <p className="text-gray-700 mt-4 text-lg leading-relaxed">
            Courier wala ensures safe and lightning-fast delivery with real-time
            tracking and seamless customer experience.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/login"
              className="px-6 py-3 bg-orange-600 text-white rounded-lg text-lg hover:bg-orange-700 shadow-md"
            >
              Get Started →
            </Link>

            <Link
              to="/signup"
              className="px-6 py-3 border border-orange-600 text-orange-600 rounded-lg text-lg hover:bg-orange-100 shadow-md"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="mt-24 px-10  md:px-20 ">
        <h2
          className="text-4xl font-bold text-center text-gray-900"
          data-aos="fade-up"
        >
          Why Choose <span className="text-orange-600">Courier Wala?</span>
        </h2>

        <p className="text-gray-600 text-center mt-2" data-aos="fade-up">
          Experience best-in-class courier service crafted for speed and safety.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-14">
          <Feature
            icon={<FiActivity size={36} />}
            title="Real-Time Tracking"
            desc="Track every shipment down to the second with live GPS updates."
            animation="fade-up"
          />

          <Feature
            icon={<FiTruck size={36} />}
            title="Fast Delivery"
            desc="Optimized routes to ensure your package arrives without delays."
            animation="fade-up"
          />

          <Feature
            icon={<FiShield size={36} />}
            title="Secure Handling"
            desc="Every parcel is handled with extreme safety & care."
            animation="fade-up"
          />
        </div>
      </section>

      {/* ---------------- TESTIMONIALS SECTION ---------------- */}
      <section className="mt-28 px-10 md:px-20">
        <h2
          className="text-4xl font-bold text-center text-gray-900"
          data-aos="zoom-in"
        >
          What Our Customers Say
        </h2>

        <p className="text-gray-600 text-center mt-2" data-aos="zoom-in">
          Trusted by thousands across India for reliability & speed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <Testimonial
            name="Rohit Sharma"
            role="E-commerce Seller"
            review="Courier wala delivers faster than any courier I’ve tried. My customers love the speed!"
            animation="fade-right"
          />

          <Testimonial
            name="Priya Kapoor"
            role="Student"
            review="Tracking is super accurate. I always know exactly where my parcel is!"
            animation="fade-up"
          />

          <Testimonial
            name="Aman Verma"
            role="Business Owner"
            review="Very secure packaging and reliable service. Highly recommended!"
            animation="fade-left"
          />
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="mt-20 py-6 bg-black text-center text-gray-300">
        © {new Date().getFullYear()}{" "}
        <span className="text-orange-500">Courier wala</span>. All rights reserved.
      </footer>
    </div>
  );
};

/* ---------------- Feature Card ---------------- */
const Feature = ({ icon, title, desc, animation }) => (
  <div
    data-aos={animation}
    className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition text-center"
  >
    <div className="text-orange-600 mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-600 mt-2">{desc}</p>
  </div>
);

/* ---------------- Testimonial Card ---------------- */
const Testimonial = ({ name, role, review, animation }) => (
  <div
    data-aos={animation}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100"
  >
    <div className="flex justify-center mb-3 text-orange-500">
      <FiStar size={22} />
      <FiStar size={22} />
      <FiStar size={22} />
      <FiStar size={22} />
      <FiStar size={22} />
    </div>

    <p className="text-gray-700 italic text-center mb-4">“{review}”</p>

    <h4 className="font-semibold text-gray-900 text-center">{name}</h4>
    <p className="text-gray-500 text-sm text-center">{role}</p>
  </div>
);

export default LandingPage;
