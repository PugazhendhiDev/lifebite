import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import { auth } from "../configuration/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);
    }
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      toast.error("Error: " + error.message);
    }

    setIsSubmit(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-400 text-black">
      <ToastContainer />
      <form
        onSubmit={handleReset}
        className="flex flex-col gap-5 bg-white justify-center items-center p-4 w-72 md:w-80 shadow-md rounded-md"
      >
        <div>
          <img src={Logo} alt="Logo" className="w-24 h-24 rounded-lg" />
        </div>

        <div className="flex flex-col gap-5 w-full">
          {auth.currentUser && (
            <input
              type="email"
              value={email}
              readOnly
              className="px-4 py-3 bg-gray-100 border-2 border-neutral-300 rounded-lg placeholder-neutral-500 cursor-not-allowed text-black"
            />
          )}

          <button
            type="submit"
            disabled={isSubmit}
            className={`flex justify-center items-center text-center rounded-lg px-4 py-4 w-full h-12 ${
              isSubmit
                ? "bg-neutral-300 cursor-not-allowed text-black"
                : "bg-black text-white hover:bg-neutral-800"
            }`}
          >
            {isSubmit ? (
              <PulseLoader size={8} color="#ffffff" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </div>

        <div className="text-center text-sm text-neutral-600">
          <p>
            <Link to="/" className="text-black hover:text-neutral-600">
              Terms of Use
            </Link>{" "}
            |{" "}
            <Link to="/" className="text-black hover:text-neutral-600">
              Privacy Policy
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
