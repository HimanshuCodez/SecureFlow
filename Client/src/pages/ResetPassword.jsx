import axios from "axios";
import { Lock, Eye, EyeOff, Check, X, Shield, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthDetails, setStrengthDetails] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Password strength calculation
  useEffect(() => {
    const checkPasswordStrength = () => {
      const details = {
        length: newPassword.length >= 8,
        uppercase: /[A-Z]/.test(newPassword),
        lowercase: /[a-z]/.test(newPassword),
        number: /\d/.test(newPassword),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
      };
      
      setStrengthDetails(details);
      
      const score = Object.values(details).filter(Boolean).length;
      setPasswordStrength(score);
    };

    if (newPassword) {
      checkPasswordStrength();
    } else {
      setPasswordStrength(0);
      setStrengthDetails({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
      });
    }
  }, [newPassword]);

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const getStrengthIcon = () => {
    if (passwordStrength <= 2) return <AlertTriangle className="w-4 h-4 text-red-500" />;
    if (passwordStrength <= 3) return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    if (passwordStrength <= 4) return <Shield className="w-4 h-4 text-blue-500" />;
    return <Shield className="w-4 h-4 text-green-500" />;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Enhanced validation
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setError("Please choose a stronger password.");
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const {data} = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`,{email,otp, newPassword});

      
      console.log("Reset password to:", newPassword);
      setSuccess("Password reset successful! You can now login with your new password.");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md relative z-10 transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Reset Password
          </h2>
          <p className="text-gray-600 mt-2">Create a new secure password</p>
        </div>

        <div className="space-y-6">
          {/* New Password */}
          <div className="space-y-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex items-center border-2 border-gray-200 rounded-lg px-4 py-3 bg-white focus-within:border-indigo-500 transition-all duration-300">
                <Lock className="text-gray-400 mr-3 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full outline-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-3 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center space-x-2">
                  {getStrengthIcon()}
                  <span className="text-sm font-medium">Password Strength: {getStrengthText()}</span>
                </div>
                
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                        i < passwordStrength 
                          ? getStrengthColor() + " animate-pulse" 
                          : "bg-gray-200"
                      }`}
                    ></div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { key: 'length', label: '8+ characters' },
                    { key: 'uppercase', label: 'Uppercase' },
                    { key: 'lowercase', label: 'Lowercase' },
                    { key: 'number', label: 'Number' },
                    { key: 'special', label: 'Special char' }
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center space-x-1">
                      {strengthDetails[key] ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <X className="w-3 h-3 text-gray-400" />
                      )}
                      <span className={strengthDetails[key] ? 'text-green-600' : 'text-gray-500'}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative flex items-center border-2 border-gray-200 rounded-lg px-4 py-3 bg-white focus-within:border-indigo-500 transition-all duration-300">
              <Lock className="text-gray-400 mr-3 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full outline-none text-sm"
              />
              {confirmPassword && (
                <div className="ml-3">
                  {newPassword === confirmPassword ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Error / Success Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
              <Check className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || passwordStrength < 3}
            className={`w-full relative overflow-hidden rounded-lg py-3 px-4 font-semibold text-white transition-all duration-300 transform ${
              isLoading || passwordStrength < 3
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Resetting...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Reset Password</span>
                </>
              )}
            </div>
            
            {!isLoading && passwordStrength >= 3 && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            )}
          </button>
        </div>

        {/* Security tip */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-xs text-blue-700 font-medium">Security Tip</p>
              <p className="text-xs text-blue-600 mt-1">
                Use a unique password that you haven't used elsewhere. Consider using a password manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}