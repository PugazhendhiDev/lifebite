import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import bg from "../assets/bg.png";
import a from "../assets/1.jpg";
import b from "../assets/2.jpg";
import c from "../assets/3.jpg";
import d from "../assets/4.jpg";
import e from "../assets/5.jpg";
import f from "../assets/6.jpg";

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
      {children}
    </span>
  );
}

function Stat({ label, value }) {
  return (
    <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
      <div className="text-2xl md:text-3xl font-extrabold text-emerald-700">
        {value}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function Intro() {
  const [amount, setAmount] = useState(250);
  const tiers = [
    { r: 50, m: "1 meal" },
    { r: 250, m: "5 meals" },
    { r: 500, m: "10 meals" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="w-16" src={Logo} />
            <Pill>Every Bite Gives Life</Pill>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="px-4 py-2 rounded-xl hover:bg-emerald-50 font-semibold">
              Home
            </Link>
            <Link to="/auth" className="px-4 py-2 rounded-xl hover:bg-emerald-50 font-semibold">
              Donate
            </Link>
            <Link to="/auth" className="px-4 py-2 rounded-xl hover:bg-emerald-50 font-semibold">
              NGO
            </Link>
            <Link to="/auth" className="px-4 py-2 rounded-xl hover:bg-emerald-50 font-semibold">
              Volunteer
            </Link>
          </div>
          <div className="flex gap-2">
            <Link to="/auth" className="px-4 py-2 border rounded-xl">Sign In</Link>
            <Link to="/auth" className="px-4 py-2 bg-emerald-600 text-white rounded-xl">
              Donate
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-5">
          <div className="flex gap-2 flex-wrap">
            <Pill>✅ Safe & Allergen-aware</Pill>
            <Pill>🌱 Zero Waste</Pill>
            <Pill>📍 Last-mile Logistics</Pill>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Every Bite Gives Life
          </h2>
          <p className="text-gray-700 leading-relaxed">
            LifeBite connects surplus food from restaurants, events and homes to
            nearby NGOs and shelters with real-time verification, freshness
            checks, and volunteer support.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/auth" className="px-6 py-3 bg-emerald-600 text-white rounded-xl">
              🍲 Donate Food
            </Link>
            <Link to="/auth" className="px-6 py-3 border rounded-xl">🔍 Find NGO</Link>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4">
            <Stat label="Meals Rescued" value="12,000+" />
            <Stat label="People Fed" value="8,500+" />
            <Stat label="Waste Averted" value="2.5t" />
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-2xl">
          <img
            alt="meal"
            className="rounded-2xl w-full object-cover h-[320px]"
            src={bg}
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="relative w-full h-[500px] flex justify-center items-center overflow-hidden">
          <div className="flex w-max h-56 gap-4 animate-scroll">
            {/* Repeat images twice for smooth infinite loop */}
            {[...Array(2)].map((_, i) => (
              <>
                <div className="flex flex-col justify-start items-center w-72 h-80 shadow-md rounded-md overflow-hidden"><img key={`img1-${i}`} src={a} className="w-72 h-56 shadow-md rounded-md" /><h1 className="pt-2 p-4">Taj Hotels (IHCL) crossed 1 million meals distributed to healthcare workers and migrant workers across Mumbai, Bangalore, New Delhi, Coimbatore, and Agra.</h1></div>
                <div className="flex flex-col justify-start items-center w-72 h-80 shadow-md rounded-md overflow-hidden"><img key={`img1-${i}`} src={b} className="w-72 h-56 shadow-md rounded-md" /><h1 className="pt-2 p-4">Foodlink’s ‘Share a Meal’ campaign launched in Mumbai, providing over 5,000 meals per month to orphanages, homeless communities, and women’s welfare.</h1></div>
                <div className="flex flex-col justify-start items-center w-72 h-80 shadow-md rounded-md overflow-hidden"><img key={`img1-${i}`} src={d} className="w-72 h-56 shadow-md rounded-md" /><h1 className="pt-2 p-4">No Food Waste (Coimbatore) collects surplus food from weddings and banquets—averaging 600 plates daily—redistributing them to those in need.</h1></div>
                <div className="flex flex-col justify-start items-center w-72 h-80 shadow-md rounded-md overflow-hidden"><img key={`img1-${i}`} src={c} className="w-72 h-56 shadow-md rounded-md" /><h1 className="pt-2 p-4">SupplyNote’s ‘Feed the Hunger 5.0’ campaign fed over 1,500 underprivileged children through healthy meal packs along with multiple restaurant partners.</h1></div>
                <div className="flex flex-col justify-start items-center w-72 h-80 shadow-md rounded-md overflow-hidden"><img key={`img1-${i}`} src={e} className="w-72 h-56 shadow-md rounded-md" /><h1 className="pt-2 p-4">AWB Food Bank in Delhi collects excess food from hotels such as The Ashok, ITC Maurya, and The Oberoi scaling from feeding 50 children daily to serving 1,000 children.</h1></div>
                <div className="flex flex-col justify-start items-center w-72 h-80 shadow-md rounded-md overflow-hidden"><img key={`img1-${i}`} src={f} className="w-72 h-56 shadow-md rounded-md" /><h1 className="pt-2 p-4">Chennai, No Food Waste works with hotels like Savera and others, rescuing banquet leftovers over 2.5 million meals served so far to daily wage workers and slums.</h1></div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Money Donate Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Feed the Homeless</h2>
        <p className="text-sm text-gray-500 mb-6">
          No food? Sponsor meals via trusted kitchens & NGOs.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.r}
              className={`p-4 border rounded-2xl ${amount === t.r ? "border-emerald-500" : ""
                }`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold">₹ {t.r}</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {t.m}
                </span>
              </div>
              <button
                onClick={() => setAmount(t.r)}
                className="w-full py-2 bg-emerald-600 text-white rounded-xl"
              >
                Select
              </button>
            </div>
          ))}
          <div className="p-4 border rounded-2xl">
            <h3 className="font-bold mb-2">Custom Amount</h3>
            <input
              type="number"
              min={10}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value || 0))}
              className="w-full border rounded-xl px-3 py-2 mb-2"
            />
            <button className="w-full py-2 bg-emerald-600 text-white rounded-xl">
              Donate ₹{amount}
            </button>
          </div>
        </div>
      </section>

      {/* Donor Dashboard */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Donor Dashboard</h2>
        <p className="text-sm text-gray-500 mb-6">
          Post surplus food with safety details
        </p>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 p-4 border rounded-2xl bg-white">
            <h3 className="font-semibold mb-4">Add Food Listing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Food Type (Veg/Non-Veg)"
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Quantity (e.g., 20 plates)"
              />
              <textarea
                className="border rounded-xl px-3 py-2 md:col-span-2"
                placeholder="Pickup Address"
              ></textarea>
              <input type="time" className="border rounded-xl px-3 py-2" />
              <input type="time" className="border rounded-xl px-3 py-2" />
              <button className="md:col-span-2 py-2 bg-emerald-600 text-white rounded-xl">
                Post Food
              </button>
            </div>
          </div>
          <div className="p-4 border rounded-2xl bg-white">
            <h3 className="font-semibold mb-3">Impact Tracker</h3>
            <p className="text-sm text-gray-600">You have fed 320 people so far</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: "64%" }}
              ></div>
            </div>
            <p className="mt-3 text-sm bg-emerald-50 p-2 rounded-xl">
              ✅ Safety tip: Seal hot food and add allergen labels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Intro;
