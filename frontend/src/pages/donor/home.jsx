import { useContext, useState } from "react";
import { UserContext } from "../../configuration/userContext";
import { CircleUserRound } from "lucide-react";

function Home() {
  const { user } = useContext(UserContext);
  const [profileError, setProfileError] = useState(false);

  return (
    <>
      <div className="w-full h-screen bg-white py-10 flex justify-center items-center">
        <div className="w-72 gap-8 grid grid-cols-2 place-items-center">
          <div className="w-32 h-32 p-4 hover:scale-105 transition-transform cursor-pointer bg-white flex flex-col justify-center items-center shadow-md border-2 border-gray-300 rounded-2xl">
            {user.photoURL && !profileError ? <img className="w-20 rounded-full" src={user.photoURL} onError={setProfileError(true)} /> : <CircleUserRound size={100} />}
          </div>
          <div className="w-32 h-32 p-4 hover:scale-105 transition-transform cursor-pointer bg-white flex flex-col justify-center items-center shadow-md border-2 border-gray-300 rounded-2xl"></div>
          <div className="w-32 h-32 p-4 hover:scale-105 transition-transform cursor-pointer bg-white flex flex-col justify-center items-center shadow-md border-2 border-gray-300 rounded-2xl"></div>
          <div className="w-32 h-32 p-4 hover:scale-105 transition-transform cursor-pointer bg-white flex flex-col justify-center items-center shadow-md border-2 border-gray-300 rounded-2xl"></div>
        </div>
      </div>
    </>
  );
}

export default Home;