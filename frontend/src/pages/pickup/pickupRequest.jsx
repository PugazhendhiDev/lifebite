import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const PickupRequest = () => {
  const mapRef = useRef(null);
  const routingRef = useRef(null);

  const [driverLoc, setDriverLoc] = useState(null);
  const [status, setStatus] = useState("assigned"); // assigned -> toPickup -> toDest -> delivered
  const [addresses, setAddresses] = useState({ driver: "", pickup: "", dest: "" });

  // Mock pickup & destination locations
  const pickupLoc = [13.0827, 80.2707];
  const destLoc = [13.034, 80.211];

  const createIcon = (color) =>
    new L.Icon({
      iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
      iconSize: [35, 50],
      iconAnchor: [17, 45],
    });

  // Reverse geocode function
  const reverseGeocode = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      return data.display_name;
    } catch {
      return `${lat.toFixed(5)}, ${lon.toFixed(5)}`;
    }
  };

  // Track driver location
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(async (pos) => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      setDriverLoc(coords);

      const addr = await reverseGeocode(coords[0], coords[1]);
      setAddresses((prev) => ({ ...prev, driver: addr }));

      if (mapRef.current && routingRef.current) {
        if (status === "toPickup") routingRef.current.setWaypoints([coords, pickupLoc]);
        if (status === "toDest") routingRef.current.setWaypoints([coords, destLoc]);
      }
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [status]);

  // Get pickup & dest addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      const pickupAddr = await reverseGeocode(pickupLoc[0], pickupLoc[1]);
      const destAddr = await reverseGeocode(destLoc[0], destLoc[1]);
      setAddresses((prev) => ({ ...prev, pickup: pickupAddr, dest: destAddr }));
    };
    fetchAddresses();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!driverLoc || mapRef.current) return;

    mapRef.current = L.map("map", { zoomControl: true }).setView(driverLoc, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(mapRef.current);

    routingRef.current = L.Routing.control({
      waypoints: [driverLoc, pickupLoc],
      lineOptions: { styles: [{ color: "#059669", weight: 6 }] },
      createMarker: function (i, wp) {
        const icon = i === 0 ? createIcon("00cc44") : createIcon("ff9900");
        return L.marker(wp.latLng, { icon });
      },
      draggableWaypoints: false,
      addWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(mapRef.current);
  }, [driverLoc]);

  // Update route when status changes
  useEffect(() => {
    if (routingRef.current && driverLoc) {
      if (status === "toPickup") routingRef.current.setWaypoints([driverLoc, pickupLoc]);
      if (status === "toDest") routingRef.current.setWaypoints([driverLoc, destLoc]);
    }
  }, [status, driverLoc]);

  return (
    <div className="relative w-full h-screen">
      <div id="map" className="absolute inset-0 z-0"></div>

      {/* Bottom fixed buttons */}
      {status !== "assigned" && status !== "delivered" && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center z-10 px-4">
          {status === "toPickup" && (
            <button
              onClick={() => setStatus("toDest")}
              className="bg-orange-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-orange-700 w-full max-w-md"
            >
              Picked Up
            </button>
          )}
          {status === "toDest" && (
            <button
              onClick={() => setStatus("delivered")}
              className="bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-green-700 w-full max-w-md"
            >
              Delivered
            </button>
          )}
        </div>
      )}

      {/* Accept / Cancel instructions */}
      {status === "assigned" && (
        <div className="absolute top-4 left-0 right-0 z-10 flex flex-col items-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-indigo-600 mb-4 text-center">New Pickup Request</h2>
            <p className="mb-2"><b>Pickup:</b> {addresses.pickup || "Loading..."}</p>
            <p className="mb-2"><b>Destination:</b> {addresses.dest || "Loading..."}</p>
            <p className="mb-2"><b>Your Current Location:</b> {addresses.driver || "Loading..."}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStatus("toPickup")}
                className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => alert("Order Cancelled")}
                className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupRequest;
