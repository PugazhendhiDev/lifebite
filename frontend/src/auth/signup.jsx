import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../configuration/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import Logo from "../assets/vite.svg";
import GoogleIcon from "../assets/google.svg";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

function Signup() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    retypePassword: "",
    userType: "Donor", // default
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (value.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setIsSubmit(false);
      return;
    }
    if (value.password !== value.retypePassword) {
      toast.error("Passwords don't match.");
      setIsSubmit(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      await sendEmailVerification(userCredential.user);

      // Save userType to localStorage
      localStorage.setItem("userType", value.userType);

      setIsSubmit(false);
      setValue({
        email: "",
        password: "",
        retypePassword: "",
        userType: "Donor",
      });
      navigate("/email-sent", { replace: true });
    } catch (err) {
      toast.error(err.message);
      setIsSubmit(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log("Token:", token);

      // Save userType to localStorage if needed
      localStorage.setItem("userType", value.userType);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-black">
      <ToastContainer />
      <form
        onSubmit={handleSignup}
        className="flex flex-col gap-5 justify-center items-center p-4 w-72"
      >
        <div>
          <img src={Logo} alt="Logo" className="w-24 h-24 rounded-lg" />
        </div>

        <div className="flex flex-col gap-5 w-full">
          {/* User Type Dropdown */}
          <select
            value={value.userType}
            onChange={(e) =>
              setValue({ ...value, userType: e.target.value })
            }
            className="px-4 py-3 border-2 border-neutral-300 rounded-lg bg-white focus:outline-none focus:border-neutral-500"
          >
            <option value="Donor">Donor</option>
            <option value="NGO">NGO</option>
            <option value="Pickup Person">Pickup Person</option>
          </select>

          <input
            type="email"
            name="email"
            required
            value={value.email}
            onChange={(e) =>
              setValue({
                ...value,
                email: e.target.value,
              })
            }
            placeholder="Enter your email"
            className="px-4 py-3 bg-white border-2 border-neutral-300 rounded-lg placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <input
            type="password"
            name="password"
            required
            value={value.password}
            onChange={(e) =>
              setValue({
                ...value,
                password: e.target.value,
              })
            }
            placeholder="Enter your password"
            className="px-4 py-3 bg-white border-2 border-neutral-300 rounded-lg placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          <input
            type="password"
            name="retypePassword"
            required
            value={value.retypePassword}
            onChange={(e) =>
              setValue({
                ...value,
                retypePassword: e.target.value,
              })
            }
            placeholder="Retype password"
            className="px-4 py-3 bg-white border-2 border-neutral-300 rounded-lg placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />

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
              "Signup"
            )}
          </button>
        </div>

        <img
          src={GoogleIcon}
          alt="Sign up with Google"
          onClick={handleGoogleSignup}
          className="w-8 h-8 cursor-pointer hover:scale-105 transition-transform"
        />

        <div className="text-center text-sm text-neutral-600 flex flex-col gap-1">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-black hover:text-neutral-600">
              Login
            </Link>
          </p>
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

export default Signup;
