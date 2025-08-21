import { useContext, useState } from "react";
import { UserContext } from "../../configuration/userContext";
import { CircleUserRound, MapPin, Truck, CheckCircle2, Calendar } from "lucide-react";

function PickupHome() {
  const { user } = useContext(UserContext);
  const [profileError, setProfileError] = useState(false);

  // Example stats for Pickup Person
  const stats = [
    { id: 1, title: "Assigned Pickups", icon: MapPin, value: 4 },
    { id: 2, title: "In Progress", icon: Truck, value: 2 },
    { id: 3, title: "Completed Pickups", icon: CheckCircle2, value: 36 },
    { id: 4, title: "Upcoming Schedule", icon: Calendar, value: 1 },
  ];

  return (
    <div className="w-full min-h-screen mb-20 py-10 flex flex-col justify-center items-center">
      {/* Pickup Person Profile Card */}
      <div className="w-72 md:w-80 bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-4">
        <div className="w-28 h-28 rounded-full overflow-hidden flex justify-center items-center border-2 border-gray-300">
          {user.photoURL && !profileError ? (
            <img
              className="w-full h-full object-cover"
              src={user.photoURL}
              alt="profile"
              onError={() => setProfileError(true)}
            />
          ) : (
            <CircleUserRound size={100} className="text-gray-400 m-auto" color="#059669" />
          )}
        </div>
        <h2 className="text-xl text-center font-semibold">{user.displayName || "Pickup Person"}</h2>
        <p className="text-gray-600 text-center">
          Collecting food donations and delivering them safely
        </p>
      </div>

      {/* Stats Grid */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
          >
            <stat.icon size={32} className="text-emerald-500" />
            <span className="text-lg font-semibold">{stat.value}</span>
            <span className="text-gray-600 text-center">{stat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PickupHome;
