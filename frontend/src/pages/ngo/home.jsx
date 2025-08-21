import { useContext, useState } from "react";
import { UserContext } from "../../configuration/userContext";
import { CircleUserRound, Truck, Utensils, CheckCircle2, Calendar } from "lucide-react";

function NgoHome() {
  const { user } = useContext(UserContext);
  const [profileError, setProfileError] = useState(false);

  // Example data
  const stats = [
    { id: 1, title: "Active Requests", icon: Utensils, value: 5 },
    { id: 2, title: "Pickups in Progress", icon: Truck, value: 3 },
    { id: 3, title: "Completed Donations", icon: CheckCircle2, value: 42 },
    { id: 4, title: "Upcoming Events", icon: Calendar, value: 2 },
  ];

  return (
    <div className="w-full min-h-screen mb-20 py-10 flex flex-col justify-center items-center">
      {/* NGO Profile Card */}
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
        <h2 className="text-xl text-center font-semibold">{user.displayName || "NGO Name"}</h2>
        <p className="text-gray-600 text-center">
          Helping communities through food collection & distribution
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

export default NgoHome;
