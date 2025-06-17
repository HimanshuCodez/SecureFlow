import { useEffect, useContext, useState, useRef, use } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { MailCheck, Send, TimerReset, Loader2 } from "lucide-react";

export default function EmailVerify() {
  const { backendUrl,isLoggedIn,userData,getUserData } = useContext(AppContent);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(600);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

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

  useEffect(() => {
    if (isLoggedIn && userData ) {
      toast.error("You are already logged in. Redirecting to home page.");
      navigate("/");
    } 
  }, [isLoggedIn,userData ]);
  useEffect(() => {
    const sendOtp = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {
          email,
        });
        if (data.success) {
          toast.success("OTP sent to your email.");
          setTimer(600);
          setResendDisabled(true);
        } else {
          toast.error("Failed to send OTP.");
        }
      } catch (error) {
        console.error("Send OTP error:", error);
        toast.error("Something went wrong while sending OTP.");
      }
    };

    if (email) sendOtp();
    else toast.error("Email not found. Please try signing up again.");
  }, [email, backendUrl]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP.");

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, {
        
        otp
      });

      if (data.success) {
        toast.success("Email verified successfully!");
        getUserData()
        navigate("/login");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      toast.error(err?.response?.data?.message || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
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

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const newDigits = [...otpDigits];
      newDigits[index - 1] = "";
      setOtpDigits(newDigits);
      inputRefs.current[index - 1]?.focus();
    }
  };
const handlePaste = (e) => {
  e.preventDefault();
  const pastedValue = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
  if (!/^\d{1,6}$/.test(pastedValue)) return;

  const newDigits = Array(6).fill("");
  for (let i = 0; i < pastedValue.length; i++) {
    newDigits[i] = pastedValue[i];
  }

  setOtpDigits(newDigits);

  const nextIndex = newDigits.findIndex((d) => d === "");
  inputRefs.current[nextIndex === -1 ? 5 : nextIndex]?.focus();
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

        <p className="text-center text-gray-600 text-sm mb-6">
          We’ve sent a 6-digit OTP to <span className="font-medium">{email}</span>.<br />
          Enter it below to verify your email address.
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-between gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onPaste={handlePaste}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Send className="mr-2" size={18} />}
            {loading ? "Verifying..." : "Verify Email"}
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
