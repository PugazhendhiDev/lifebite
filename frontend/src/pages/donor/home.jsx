import { useContext, useState } from "react";
import { UserContext } from "../../configuration/userContext";
import { CircleUserRound, Star, Trophy, Heart } from "lucide-react";

function Home() {
  const { user } = useContext(UserContext);
  const [profileError, setProfileError] = useState(false);

  // Example points and features
  const points = 320; // points earned by donor
  const features = [
    { id: 1, title: "Donations Made", icon: Heart, value: 12 },
    { id: 2, title: "People Fed", icon: Star, value: 320 },
    { id: 3, title: "Badges Earned", icon: Trophy, value: 3 },
    { id: 4, title: "Upcoming Events", icon: Trophy, value: 2 },
  ];

  return (
    <div className="w-full min-h-screen mb-20 py-10 flex flex-col justify-center items-center">
      {/* Profile Card */}
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
        <h2 className="text-xl text-center font-semibold">{user.displayName || "Donor Name"}</h2>
        <p className="text-gray-600 text-center">
          Points Earned: <span className="font-bold text-emerald-600">{points}</span>
        </p>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
          >
            <feature.icon size={32} className="text-emerald-500" />
            <span className="text-lg font-semibold">{feature.value}</span>
            <span className="text-gray-600 text-center">{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
