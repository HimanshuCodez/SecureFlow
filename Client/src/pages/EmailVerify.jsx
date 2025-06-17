import { useEffect, useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MailCheck, Send, TimerReset } from "lucide-react";

export default function EmailVerify() {
  const { backendUrl } = useContext(AppContent);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(600); // 10 minutes = 600 seconds
  const [resendDisabled, setResendDisabled] = useState(true);
  const navigate = useNavigate();

  // Format seconds into MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Countdown effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Send OTP when mounted
  useEffect(() => {
    const sendVerificationOtp = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
          email,
        });
        if (data.success) {
          toast.success("OTP sent to your email");
          setTimer(600); // reset timer
          setResendDisabled(true);
        } else {
          toast.error("Failed to send OTP");
        }
      } catch (error) {
        console.error("Send OTP error:", error);
        toast.error("Something went wrong while sending OTP.");
      }
    };

    if (email) sendVerificationOtp();
    else toast.error("Email not found. Please try signing up again.");
  }, [email, backendUrl]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, {
        email,
        otp,
      });

      if (data.success) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      toast.error(err?.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
        email,
      });

      if (data.success) {
        toast.success("OTP resent successfully!");
        setTimer(600);
        setResendDisabled(true);
      } else {
        toast.error(data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Resend OTP Error:", err);
      toast.error("Error sending OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-4">
          <MailCheck className="text-indigo-600" size={42} />
        </div>
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-3">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-600 text-sm mb-4">
          We’ve sent a 6-digit OTP to <span className="font-medium">{email}</span>.
          <br />
          Please enter it below to verify your email address.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition flex items-center justify-center"
          >
            <Send className="mr-2" size={18} />
            Verify Email
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Didn't receive the OTP?{" "}
          <button
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`ml-1 font-medium transition ${
              resendDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-indigo-600 hover:underline"
            }`}
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-2 flex items-center justify-center text-gray-500 text-sm">
          <TimerReset className="mr-1" size={16} />
          OTP valid for:{" "}
          <span className="ml-1 font-medium text-gray-800">{formatTime(timer)}</span>
        </div>
      </div>
    </div>
  );
}
