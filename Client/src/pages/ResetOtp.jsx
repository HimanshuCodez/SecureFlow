import { useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { ShieldCheck, Loader2, Send } from "lucide-react";

export default function ResetOtp() {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...otpDigits];
    updated[index] = value;
    setOtpDigits(updated);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const updated = [...otpDigits];
      updated[index - 1] = "";
      setOtpDigits(updated);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const value = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const arr = Array.from(value).concat(Array(6).fill("")).slice(0, 6);
    setOtpDigits(arr);

    const next = arr.findIndex((d) => d === "");
    inputRefs.current[next === -1 ? 5 : next]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP.");

 
    navigate("/reset-password", { state: { email, otp } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-4">
          <ShieldCheck className="text-indigo-600" size={42} />
        </div>

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-3">
          Enter Reset OTP
        </h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          We’ve sent a 6-digit OTP to <span className="font-medium">{email}</span>.
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <div className="flex justify-between gap-2">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                inputMode="numeric"
                className="w-10 h-12 text-center text-xl border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" />}
            {loading ? "Submiting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
