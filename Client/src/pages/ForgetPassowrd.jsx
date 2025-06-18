import { useState, useContext } from "react";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const { backendUrl } = useContext(AppContent);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendResetOtp = async (e) => {
    e.preventDefault();
        axios.defaults.withCredentials = true;
    try {
     const {data} = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
     if(data.success) {
     toast.success("OTP sent to your email!");
      navigate("/reset-otp", { state: { email } });
      } else {
      toast.error("Failed to send OTP. Please try again.");
    }
    } catch (error) {
      console.error("Error sending reset OTP:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-4">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your registered email to receive a password reset OTP.
        </p>

        <form onSubmit={handleSendResetOtp} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-3 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="text-gray-500 mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none bg-transparent text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-md shadow-md"
          >
            Send OTP
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer font-medium"
            onClick={() => navigate("/login")}
          >
            Go back to login
          </span>
        </p>
      </div>
    </div>
  );
}
