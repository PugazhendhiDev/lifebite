import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from "react-router";
import { House, SquarePlus, GalleryVerticalEnd, User, Salad, Truck, Map } from "lucide-react";
import { UserContext } from "../configuration/userContext";

function Navbar() {
    const [index, setIndex] = useState(0);
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [userType, setUserType] = useState(null);
    const [profileError, SetProfileError] = useState(false);


    useEffect(() => {
        if (location.pathname === "/") return setIndex(0);
        else if (location.pathname === "/donate-food" || location.pathname === "/search-food" || location.pathname === "/pickup-request") return setIndex(1);
        else if (location.pathname === "/my-donation" || location.pathname === "/track-request" || location.pathname === "/delivery-history") return setIndex(2);
        else if (location.pathname === "/profile") return setIndex(3);
        else return setIndex(-1);
    }, [location.pathname]);

    useEffect(() => {
        const userType = localStorage.getItem("userType");

        if (userType) {
            setUserType(userType);
        }
    }, []);
    return (
        <div className="w-full h-20 fixed bottom-2 z-50 flex justify-center items-center">
            <div className="pt-4 pb-4 pl-4 pr-1 h-12 bg-white flex justify-center items-center gap-6 border-2 border-gray-300 shadow-md rounded-full">
                <Link to="/"><House className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 0 ? "text-emerald-600" : "text-neutral-400"}`} /></Link>
                {userType === "Donor" ? <Link to="/donate-food"><SquarePlus className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 1 ? "text-emerald-600" : "text-neutral-400"}`} /></Link> : userType === "NGO" ? <Link to="/search-food"><Salad className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 1 ? "text-emerald-600" : "text-neutral-400"}`} /></Link> : <Link to="/pickup-request"><Map className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 1 ? "text-emerald-600" : "text-neutral-400"}`} /></Link>}
                {userType === "Donor" ? <Link to="/my-donation"><GalleryVerticalEnd className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 2 ? "text-emerald-600" : "text-neutral-400"}`} /></Link> : userType === "NGO" ? <Link to="/track-request"><Truck className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 2 ? "text-emerald-600" : "text-neutral-400"}`} /></Link> : <Link to="/delivery-history"><GalleryVerticalEnd className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform ${index == 2 ? "text-emerald-600" : "text-neutral-400"}`} /></Link>}
                <Link to="/profile">{user.photoURL && !profileError ? <img className={`w-9 hover:scale-125 transition-transform rounded-full ${index == 3 && "border-2 border-gray-300"}`} src={user.photoURL} onError={() => SetProfileError(true)} /> : <User className={`cursor-pointer hover:text-emerald-700 hover:scale-125 transition-transform mr-3 ${index == 3 ? "text-emerald-600" : "text-neutral-400"}`} />}</Link>
            </div>
        </div>
    );
}

export default Navbar;