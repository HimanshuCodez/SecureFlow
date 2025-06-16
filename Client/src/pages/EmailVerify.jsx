import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmailVerify() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <CheckCircle className="mx-auto text-green-500" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email. Please check your inbox
          and follow the instructions to activate your account.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
        >
          Go to Login
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Didn't receive the email?{" "}
          <span className="text-indigo-600 hover:underline cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
