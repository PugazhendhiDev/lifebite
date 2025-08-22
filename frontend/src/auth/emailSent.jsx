import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function EmailSent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-emerald-400 text-black">
      <div className="flex flex-col gap-5 bg-white justify-center items-center p-4 w-72 md:w-80 shadow-md rounded-md">
        <div>
          <img src={Logo} alt="Logo" className="w-24 h-24 rounded-lg" />
        </div>

        <div className="flex flex-col gap-5 w-full">
          <p className="text-center text-neutral-600">
            After verifying, click the refresh button.
          </p>
          <Link
            to="/"
            replace
            className="flex justify-center items-center rounded-lg px-4 py-4 bg-black text-white hover:bg-neutral-800 w-full h-12"
          >
            Refresh the page
          </Link>
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
      </div>
    </div>
  );
}

export default EmailSent;
