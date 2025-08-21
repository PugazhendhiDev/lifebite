import React, { useContext, useState } from 'react';
import { UserContext } from "../../configuration/userContext";
import { CircleUserRound } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, signOut } from 'firebase/auth';

function Profile() {
    const { user } = useContext(UserContext);
    const [profileError, setProfileError] = useState(false);
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            toast.error('Error signing out:', error.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="w-full h-screen flex flex-col gap-4 justify-center items-center pt-10 p-4">
                {user.photoURL && !profileError ? <img className="w-32 h-32 border-2 border-white rounded-full" src={user.photoURL} onError={setProfileError(true)} /> : <CircleUserRound className="w-32 h-32" color="#059669" />}
                <h1>{user.displayName}</h1>
                <p className="text-neutral-400">{user.email}</p>
                <div
                    className="flex justify-center items-center text-center rounded-lg px-4 py-4 w-40 h-12 bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                    onClick={handleLogout}
                >
                    Logout
                </div>
            </div>
        </>
    );
}

export default Profile;