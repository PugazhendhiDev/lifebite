import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../configuration/firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import Logo from "../assets/logo.png";
import GoogleIcon from "../assets/google.svg";
import { ToastContainer, toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

import "./styles/auth.css"; // <-- copy your index.html CSS into this file

function AuthPage() {
    const [isActive, setIsActive] = useState(false); // toggle between login/register
    const [isSubmit, setIsSubmit] = useState(false);
    const [value, setValue] = useState({
        email: "",
        password: "",
        userType: "Donor",
    });

    const navigate = useNavigate();

    // 🔹 Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmit(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                value.email,
                value.password
            );
            const user = userCredential.user;

            if (!user.emailVerified) {
                await sendEmailVerification(user);
                await signOut(auth);
                toast.error("Please verify your email before logging in. Verification email sent.");
                setIsSubmit(false);
                return;
            }

            localStorage.setItem("userType", value.userType);
            navigate("/", { replace: true });
        } catch (err) {
            toast.error(err.message);
        }
        setIsSubmit(false);
    };

    // 🔹 Handle Register
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmit(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                value.email,
                value.password
            );
            const user = userCredential.user;

            await sendEmailVerification(user);
            toast.success("Registration successful! Please check your email for verification.");
            setIsActive(false); // switch back to login form
        } catch (err) {
            toast.error(err.message);
        }
        setIsSubmit(false);
    };

    // 🔹 Handle Google Sign In
    const handleGoogleSignup = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await user.getIdToken();

            localStorage.setItem("userType", value.userType);
            navigate("/", { replace: true });
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div
                className={`container ${isActive ? "active" : ""}`}
                style={{ fontFamily: "Poppins, sans-serif" }}
            >
                <ToastContainer />

                {/* LOGIN FORM */}
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>

                        {/* UserType Dropdown */}
                        <select
                            value={value.userType}
                            onChange={(e) => setValue({ ...value, userType: e.target.value })}
                            className="input-box border-2 border-emerald-400 w-full px-2 py-4 rounded-md"
                        >
                            <option value="Donor">Donor</option>
                            <option value="NGO">NGO</option>
                            <option value="Pickup Person">Pickup Person</option>
                        </select>

                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                value={value.email}
                                onChange={(e) => setValue({ ...value, email: e.target.value })}
                                required
                            />
                            <i className="bx bxs-user"></i>
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={value.password}
                                onChange={(e) => setValue({ ...value, password: e.target.value })}
                                required
                            />
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        <Link to="/forgot-password" className="forgot-link">
                            Forgot Password?
                        </Link>

                        <button
                            type="submit"
                            disabled={isSubmit}
                            className="btn mt-4 mb-4"
                        >
                            {isSubmit ? <PulseLoader size={8} color="#fff" /> : "Login"}
                        </button>

                        <p>or login with social platforms</p>
                        <div className="social-icons">
                            <img
                                src={GoogleIcon}
                                alt="Google"
                                onClick={handleGoogleSignup}
                                className="w-8 h-8 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>

                {/* REGISTER FORM */}
                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Registration</h1>

                        <select
                            value={value.userType}
                            onChange={(e) => setValue({ ...value, userType: e.target.value })}
                            className="input-box border-2 border-emerald-400 w-full px-2 py-4 rounded-md"
                        >
                            <option value="Donor">Donor</option>
                            <option value="NGO">NGO</option>
                            <option value="Pickup Person">Pickup Person</option>
                        </select>

                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                value={value.email}
                                onChange={(e) => setValue({ ...value, email: e.target.value })}
                                required
                            />
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                value={value.password}
                                onChange={(e) => setValue({ ...value, password: e.target.value })}
                                required
                            />
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        <button type="submit" disabled={isSubmit} className="btn">
                            {isSubmit ? <PulseLoader size={8} color="#fff" /> : "Register"}
                        </button>

                        <p>or register with social platforms</p>
                        <div className="social-icons">
                            <img
                                src={GoogleIcon}
                                alt="Google"
                                onClick={handleGoogleSignup}
                                className="w-8 h-8 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>

                {/* TOGGLE PANELS */}
                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <img className="w-40 bg-white mb-4 p-2 shadow-md rounded-md" src={Logo} />
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button
                            type="button"
                            className="btn register-btn"
                            onClick={() => setIsActive(true)}
                        >
                            Register
                        </button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <img className="w-40 bg-white mb-4 p-2 shadow-md rounded-md" src={Logo} />
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button
                            type="button"
                            className="btn login-btn"
                            onClick={() => setIsActive(false)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage;
