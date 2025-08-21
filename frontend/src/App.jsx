import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./configuration/firebase";
import "./App.css";
import { ScaleLoader } from "react-spinners";

import Signin from "./auth/signin";
import Signup from "./auth/signup";
import ForgotPassword from "./auth/forgotPassword";
import ResetPassword from "./auth/resetPassword";
import EmailSent from "./auth/emailSent";
import Navbar from "./components/navbar";

import Intro from "./pages/intro";

import Home from "./pages/donor/home";
import Profile from "./pages/donor/profile";
import DonateFood from "./pages/donor/donateFood";
import MyDonation from "./pages/donor/myDonation";

import NgoHome from "./pages/ngo/home";
import SearchFood from "./pages/ngo/searchFood";
import TrackRequest from "./pages/ngo/trackRequest";

import PickupHome from "./pages/pickup/home";
import PickupRequest from "./pages/pickup/pickupRequest";
import DeliveryHistory from "./pages/pickup/deliveryHistory";

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const startTime = Date.now();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const updatedUser = auth.currentUser;

        if (updatedUser?.emailVerified) {
          if (!localStorage.getItem("email_verified")) {
            await updatedUser.getIdToken(true);
            localStorage.setItem("email_verified", true);
            setUser(auth.currentUser);
          } else {
            setUser(updatedUser);
          }
        } else {
          setUser(false);
        }
      } else {
        setUser(false);
      }

      const elapsed = Date.now() - startTime;
      const delay = Math.max(1000 - elapsed, 0);
      setTimeout(() => setLoading(false), delay);
    });

    return () => unsubscribe();
  }, [location]);

  useEffect(() => {
    const userType = localStorage.getItem("userType");

    if (userType) {
      setUserType(userType);
    }
  }, [location.pathname]);

  useEffect(() => {
    setRouteLoading(true);
    const timeout = setTimeout(() => setRouteLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  if (loading || routeLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <ScaleLoader color="#059669" />
      </div>
    );
  }

  return (
    <>
      {user && user.emailVerified && <Navbar />}
      <Routes>
        <Route
          index
          element={user && user.emailVerified ? userType === "Donor" ? <Home /> : userType === "NGO" ? <NgoHome /> : <PickupHome /> : <Intro />}
        />
        <Route
          path="/signin"
          element={
            user && user.emailVerified ? <Navigate to="/" replace /> : <Signin />
          }
        />
        <Route
          path="/signup"
          element={
            user && user.emailVerified ? <Navigate to="/" replace /> : <Signup />
          }
        />
        <Route
          path="/forgot-password"
          element={
            user && user.emailVerified ? (
              <Navigate to="/" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            user && user.emailVerified ? (
              <ResetPassword />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/email-sent"
          element={
            user && user.emailVerified ? (
              <Navigate to="/" replace />
            ) : (
              <EmailSent />
            )
          }
        />

        <Route
          path="/donate-food"
          element={
            user && user.emailVerified && userType === "Donor" ? (
              <DonateFood />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/my-donation"
          element={
            user && user.emailVerified && userType === "Donor" ? (
              <MyDonation />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user && user.emailVerified ? (
              <Profile />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/search-food"
          element={
            user && user.emailVerified && userType === "NGO" ? (
              <SearchFood />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/track-request"
          element={
            user && user.emailVerified && userType === "NGO" ? (
              <TrackRequest />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/pickup-request"
          element={
            user && user.emailVerified && userType === "Pickup Person" ? (
              <PickupRequest />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/delivery-history"
          element={
            user && user.emailVerified && userType === "Pickup Person" ? (
              <DeliveryHistory />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;