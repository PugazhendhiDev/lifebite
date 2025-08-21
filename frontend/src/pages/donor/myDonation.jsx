import React from "react";
import { Camera, Star, MapPin } from "lucide-react";

function MyDonation() {
  // Example donations data
  const donations = [
    {
      id: 1,
      foodType: "Vegetarian",
      quantity: "20 plates",
      allergens: ["Gluten", "Dairy"],
      preparedAt: "12:00",
      bestBefore: "14:00",
      pickupAddress: "123 Main Street, City",
      latitude: 11.1271,
      longitude: 78.6569,
      address: "123 Main Street, City",
      photo: null,
      peopleFed: 10,
    },
    {
      id: 2,
      foodType: "Non‑Vegetarian",
      quantity: "15 plates",
      allergens: ["Nuts"],
      preparedAt: "10:30",
      bestBefore: "13:00",
      pickupAddress: "456 Park Avenue, City",
      latitude: 11.1300,
      longitude: 78.6600,
      address: "456 Park Avenue, City",
      photo: null,
      peopleFed: 8,
    },
    {
      id: 3,
      foodType: "Packaged",
      quantity: "30 packs",
      allergens: ["Soy"],
      preparedAt: "09:00",
      bestBefore: "18:00",
      pickupAddress: "789 Oak Road, City",
      latitude: 11.1350,
      longitude: 78.6650,
      address: "789 Oak Road, City",
      photo: null,
      peopleFed: 25,
    },
    {
      id: 4,
      foodType: "Vegetarian",
      quantity: "10 plates",
      allergens: [],
      preparedAt: "14:00",
      bestBefore: "16:00",
      pickupAddress: "321 Pine Street, City",
      latitude: 11.1400,
      longitude: 78.6700,
      address: "321 Pine Street, City",
      photo: null,
      peopleFed: 12,
    },
    {
      id: 5,
      foodType: "Non‑Vegetarian",
      quantity: "25 plates",
      allergens: ["Eggs"],
      preparedAt: "11:30",
      bestBefore: "14:30",
      pickupAddress: "654 Maple Avenue, City",
      latitude: 11.1450,
      longitude: 78.6750,
      address: "654 Maple Avenue, City",
      photo: null,
      peopleFed: 20,
    },
    {
      id: 6,
      foodType: "Packaged",
      quantity: "50 packs",
      allergens: ["Dairy", "Gluten"],
      preparedAt: "08:00",
      bestBefore: "20:00",
      pickupAddress: "987 Birch Lane, City",
      latitude: 11.1500,
      longitude: 78.6800,
      address: "987 Birch Lane, City",
      photo: null,
      peopleFed: 40,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 mb-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Donations</h1>

      {donations.length === 0 ? (
        <p className="text-gray-600">You have not posted any donations yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">{donation.foodType}</span>
                <span className="text-sm text-gray-500">{donation.quantity}</span>
              </div>

              <div>
                <span className="font-medium text-sm">Allergens:</span>{" "}
                {donation.allergens.length > 0
                  ? donation.allergens.join(", ")
                  : "None"}
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Prepared at: {donation.preparedAt}</span>
                <span>Best before: {donation.bestBefore}</span>
              </div>

              <div>
                <span className="font-medium text-sm">Pickup Address:</span>
                <p className="text-gray-700">{donation.pickupAddress}</p>
                <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>
                    {donation.address} (Lat: {donation.latitude.toFixed(4)}, Lon:{" "}
                    {donation.longitude.toFixed(4)})
                  </span>
                </div>
              </div>

              {donation.photo && (
                <img
                  src={URL.createObjectURL(donation.photo)}
                  alt="donation"
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}

              <div className="flex items-center gap-2 mt-2 text-sm">
                <Star className="h-4 w-4 text-amber-500" />
                <span>{donation.peopleFed} people fed</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonation;
