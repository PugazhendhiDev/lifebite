import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import { Camera, Star, Trophy, ShieldCheck, MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Reverse geocoding function
async function getAddress(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    return data.display_name || "";
  } catch (err) {
    console.error(err);
    return "";
  }
}

// Component to select location on map
function LocationMarker({ position, setPosition, setAddress }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      const name = await getAddress(lat, lng);
      setAddress(name);
    }
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

function DonateFood() {
  const [foodType, setFoodType] = useState("Vegetarian");
  const [quantity, setQuantity] = useState("");
  const [allergens, setAllergens] = useState([]);
  const [preparedAt, setPreparedAt] = useState("");
  const [bestBefore, setBestBefore] = useState("");
  const [position, setPosition] = useState(null); // [lat, lon]
  const [address, setAddress] = useState(""); // Place name
  const [photo, setPhoto] = useState(null);

  const allergenOptions = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs"];

  // Use GPS to auto-fill location and address
  const useGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        setPosition([lat, lon]);
        const name = await getAddress(lat, lon);
        setAddress(name);
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  const handleAllergenChange = (allergen) => {
    if (allergens.includes(allergen)) {
      setAllergens(allergens.filter((a) => a !== allergen));
    } else {
      setAllergens([...allergens, allergen]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position) {
      alert("Please select a pickup location (GPS or manual)!");
      return;
    }
    console.log({
      foodType,
      quantity,
      allergens,
      preparedAt,
      bestBefore,
      latitude: position[0],
      longitude: position[1],
      address,
      photo
    });
    alert("Food listing posted!");
    // reset form
    setQuantity("");
    setAllergens([]);
    setPreparedAt("");
    setBestBefore("");
    setPosition(null);
    setAddress("");
    setPhoto(null);
  };

  return (
    <div className="w-full min-h-screen bg-white py-10 mb-20 flex flex-col items-center">
      <div className="w-full max-w-5xl px-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Donor Dashboard</h1>
        <p className="text-gray-600 mt-2">Post surplus food with safety details</p>
      </div>

      <div className="w-full max-w-5xl px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Food Listing Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Food Listing</h2>
            <form className="grid md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Food Type</label>
                <select
                  className="border rounded-xl px-3 py-2"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  <option>Vegetarian</option>
                  <option>Non‑Vegetarian</option>
                  <option>Packaged</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm">Quantity</label>
                <input
                  type="text"
                  className="border rounded-xl px-3 py-2"
                  placeholder="e.g., 20 plates"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm">Allergens</label>
                <div className="flex flex-wrap gap-2">
                  {allergenOptions.map((a) => (
                    <label
                      key={a}
                      className="inline-flex items-center gap-2 text-sm bg-gray-100 border rounded-xl px-3 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={allergens.includes(a)}
                        onChange={() => handleAllergenChange(a)}
                      />{" "}
                      {a}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm">Prepared at</label>
                <input
                  type="time"
                  className="border rounded-xl px-3 py-2"
                  value={preparedAt}
                  onChange={(e) => setPreparedAt(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm">Best before</label>
                <input
                  type="time"
                  className="border rounded-xl px-3 py-2"
                  value={bestBefore}
                  onChange={(e) => setBestBefore(e.target.value)}
                  required
                />
              </div>

              {/* Map Picker */}
              <div className="md:col-span-2 flex flex-col gap-2 relative">
                <div className="flex justify-between items-center relative z-20">
                  <label className="text-sm">Pickup Location</label>
                  <button
                    type="button"
                    onClick={useGPS}
                    className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1 rounded-md text-sm hover:bg-emerald-700 relative z-20"
                  >
                    <MapPin className="h-4 w-4" /> Use GPS
                  </button>
                </div>

                <div className="h-48 w-full mt-2 relative">
                  <MapContainer
                    center={position || [11.1271, 78.6569]}
                    zoom={position ? 13 : 4}
                    scrollWheelZoom={true}
                    className="absolute top-0 left-0 w-full h-full rounded-xl border z-0"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <LocationMarker
                      position={position}
                      setPosition={setPosition}
                      setAddress={setAddress}
                    />
                  </MapContainer>
                </div>

                {position && (
                  <span className="text-sm text-gray-600 relative z-20">
                    Selected: {address} (Lat {position[0].toFixed(4)}, Lon{" "}
                    {position[1].toFixed(4)})
                  </span>
                )}
              </div>

              <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
                  onClick={() => document.getElementById("photoInput").click()}
                >
                  <Camera className="h-4 w-4" /> Add image
                </button>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-xl text-sm">
                  AI freshness check enabled
                </span>
                <input
                  type="file"
                  id="photoInput"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl"
                >
                  Post Food
                </button>
              </div>
            </form>
          </div>

          {/* Impact Tracker */}
          <div className="bg-white p-6 h-full md:h-80 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Impact Tracker</h2>
            <p className="text-gray-600 mb-2">You have fed 320 people so far</p>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div className="bg-emerald-600 h-3 rounded-full w-2/3"></div>
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full inline-flex items-center gap-1 text-sm">
                <Star className="h-3 w-3" /> Food Hero
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-flex items-center gap-1 text-sm">
                <Trophy className="h-3 w-3" /> Zero Waste Champ
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              Safety tip: seal hot food and add allergen labels.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonateFood;
