/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSignIn,
  useSignUp,
  useUser,
} from "@clerk/clerk-react";
import axios from "axios";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 🧩 FIX

  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { user } = useUser();

  if (!signInLoaded || !signUpLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading authentication...
      </div>
    );
  }

  // 📲 Send OTP
  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      // 🧩 FIX: Validate that phone number starts with +1 (US/Canada)
      if (!phoneNumber.startsWith("+1")) {
        setErrorMessage(
          "The Pawffy currently supports only US & Canadian phone numbers. Please use a +1 number."
        );
        setIsLoading(false);
        return;
      }

      if (isSignUp) {
        await signUp.create({ phoneNumber });
        await signUp.preparePhoneNumberVerification();
      } else {
        await signIn.create({ identifier: phoneNumber });
        await signIn.prepareFirstFactor({ strategy: "phone_code" });
      }

      setOtpSent(true);
      alert("OTP sent successfully !!");
    } catch (error) {
      console.error("OTP Error:", error);
      const message =
        error.errors?.[0]?.message ||
        "Failed to send OTP. Please check the phone number.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      let session = null;

      if (isSignUp) {
        const completeSignUp = await signUp.attemptPhoneNumberVerification({
          code: otp,
        });
        if (completeSignUp.status === "complete") {
          session = completeSignUp.createdSessionId;
        }
      } else {
        const completeSignIn = await signIn.attemptFirstFactor({
          strategy: "phone_code",
          code: otp,
        });
        if (completeSignIn.status === "complete") {
          session = completeSignIn.createdSessionId;
        }
      }

      if (session) {
        alert("Login successful!");

        // 🎟️ Get Clerk JWT
        const token = await user.getToken();

        // 🧠 Send token to backend
        await axios.post("http://localhost:5000/api/auth/clerk-login", { token });

        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Verification error:", error);
      const message = error.errors?.[0]?.message || "Invalid OTP. Try again.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchAuthMode = () => {
    setIsSignUp(!isSignUp);
    setPhoneNumber("");
    setOtp("");
    setOtpSent(false);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left-side Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:block lg:w-1/2 relative"
      >
        <img
          src="/images/Doggy.png"
          alt="Golden retriever with a flower"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* Right-side Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <AnimatePresence mode="wait">
            {!otpSent ? (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-center mb-6">
                  {isSignUp ? "Create a New Account" : "Welcome Back!"}
                </h1>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (US/Canada only)
                </label>
                <input
                  type="tel"
                  placeholder="+1XXXXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendOtp}
                  disabled={isLoading || !phoneNumber}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Sending OTP..." : "Send OTP"}
                </motion.button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <button
                    onClick={switchAuthMode}
                    className="text-orange-500 hover:text-orange-600 font-semibold"
                  >
                    {isSignUp ? "Login here" : "Sign up here"}
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-2xl font-bold text-center mb-6">Enter OTP</h1>

                <input
                  type="text"
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength={6}
                  className="w-full px-4 py-3 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent tracking-widest"
                />

                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </motion.button>

                <button
                  onClick={() => setOtpSent(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-800 mt-4"
                >
                  Change phone number
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
