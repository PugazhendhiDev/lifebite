import React, { useEffect, useState } from "react";

const mockHistory = [
  {
    id: 1,
    pickup: "12, Relief Street, Chennai",
    pickupLoc: [13.0827, 80.2707],
    dest: "5, Green Park, Chennai",
    destLoc: [13.0358, 80.2367],
    date: "2025-08-22",
    status: "Delivered",
  },
  {
    id: 2,
    pickup: "34, Main Road, Chennai",
    pickupLoc: [13.048, 80.250],
    dest: "23, Lakeview, Chennai",
    destLoc: [13.065, 80.220],
    date: "2025-08-21",
    status: "Delivered",
  },
  {
    id: 3,
    pickup: "8, MG Street, Chennai",
    pickupLoc: [13.060, 80.230],
    dest: "18, Sunrise Apartments, Chennai",
    destLoc: [13.070, 80.215],
    date: "2025-08-20",
    status: "Delivered",
  },
  {
    id: 4,
    pickup: "77, Anna Nagar, Chennai",
    pickupLoc: [13.0655, 80.2360],
    dest: "102, Marina Beach Road, Chennai",
    destLoc: [13.0525, 80.2825],
    date: "2025-08-19",
    status: "Delivered",
  },
  {
    id: 5,
    pickup: "45, T Nagar, Chennai",
    pickupLoc: [13.0405, 80.2305],
    dest: "12, Royapettah, Chennai",
    destLoc: [13.0415, 80.2505],
    date: "2025-08-18",
    status: "Delivered",
  },
  {
    id: 6,
    pickup: "23, Velachery Main Road, Chennai",
    pickupLoc: [13.0180, 80.2200],
    dest: "56, Adyar, Chennai",
    destLoc: [13.0250, 80.2650],
    date: "2025-08-17",
    status: "Delivered",
  },
];

function DeliveryHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(mockHistory);
    }, []);

    return (
        <div className="w-full min-h-screen bg-white py-10 mb-20 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-emerald-600 mb-6 text-center">
                Delivery History
            </h1>

            <div className="space-y-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full">
                            <div>
                                <p className="text-gray-600 text-sm">Pickup:</p>
                                <p className="font-semibold">{item.pickup}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Destination:</p>
                                <p className="font-semibold">{item.dest}</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm">Date:</p>
                                <p className="font-semibold">{item.date}</p>
                            </div>
                        </div>
                        <div className="mt-2 sm:mt-0">
                            <span
                                className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${item.status === "Delivered"
                                    ? "bg-emerald-600"
                                    : "bg-orange-500"
                                    }`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {history.length === 0 && (
                <p className="text-center text-gray-500 mt-6">
                    No delivery history found.
                </p>
            )}
        </div>
    );
}

export default DeliveryHistory;
