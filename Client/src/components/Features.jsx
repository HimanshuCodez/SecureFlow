import React, { useState, useEffect } from 'react';
import { Shield, Lock, Key, Eye, EyeOff, Fingerprint, Smartphone, CheckCircle, AlertTriangle, Zap, Users, Globe, Database } from 'lucide-react';

const SecureFlowFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authSteps, setAuthSteps] = useState([false, false, false]);
  const [securityLevel, setSecurityLevel] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Multi-Factor Authentication",
      description: "Bank-grade security with biometric verification",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Fingerprint,
      title: "Biometric Security",
      description: "Fingerprint and facial recognition technology",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Key,
      title: "Zero-Knowledge Encryption",
      description: "End-to-end encryption with zero-knowledge architecture",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Zap,
      title: "Instant Authentication",
      description: "Lightning-fast verification in under 200ms",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setIsScanning(true);
      setTimeout(() => setIsScanning(false), 2000);
    }, 5000);
    return () => clearInterval(scanInterval);
  }, []);

  useEffect(() => {
    const authInterval = setInterval(() => {
      setAuthSteps([false, false, false]);
      setTimeout(() => setAuthSteps([true, false, false]), 500);
      setTimeout(() => setAuthSteps([true, true, false]), 1000);
      setTimeout(() => setAuthSteps([true, true, true]), 1500);
      setTimeout(() => {
        setSecurityLevel((prev) => (prev + 1) % 4);
      }, 2000);
    }, 4000);
    return () => clearInterval(authInterval);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      {/* Animated Security Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0">
        {[Shield, Lock, Key, Fingerprint].map((Icon, index) => (
          <Icon
            key={index}
            className="absolute w-8 h-8 text-blue-400/20 animate-pulse"
            style={{
              left: `${20 + index * 20}%`,
              top: `${10 + index * 15}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-500/20 mb-6">
            <Shield className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm text-blue-400 font-medium">Enterprise Security</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
            Fortress-Level
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Authentication
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Protect your digital assets with military-grade security protocols and cutting-edge authentication technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Security Dashboard */}
          <div className="relative">
            {/* Main Security Console */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">SecureFlow Console</span>
                </div>
                <div className="text-green-400 text-sm font-mono">ACTIVE</div>
              </div>

              {/* Biometric Scanner */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Biometric Verification</h4>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isScanning ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {isScanning ? 'SCANNING...' : 'VERIFIED'}
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-32 bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden">
                    <Fingerprint className="w-16 h-16 text-gray-500" />
                    {isScanning && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
                    )}
                    {isScanning && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Authentication Steps */}
              <div className="mb-8">
                <h4 className="text-white font-medium mb-4">Authentication Flow</h4>
                <div className="space-y-3">
                  {[
                    { icon: Smartphone, label: "Device Verification", step: 0 },
                    { icon: Key, label: "Credential Validation", step: 1 },
                    { icon: Shield, label: "Security Clearance", step: 2 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        authSteps[item.step] 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-700 text-gray-400'
                      }`}>
                        {authSteps[item.step] ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <item.icon className="w-4 h-4" />
                        )}
                      </div>
                      <span className={`transition-colors duration-500 ${
                        authSteps[item.step] ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Level Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Security Level</span>
                  <span className="text-green-400 font-mono">{securityLevel}/3</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(securityLevel / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Password Field Demo */}
              <div className="border-t border-gray-700 pt-6">
                <label className="block text-white font-medium mb-2">Secure Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value="SecureP@ssw0rd123!"
                    readOnly
                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white font-mono"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Security Badges */}
            <div className="absolute -top-4 -right-4 bg-green-500/20 backdrop-blur-sm rounded-full p-4 border border-green-500/30">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500/20 backdrop-blur-sm rounded-full p-4 border border-blue-500/30">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer ${
                  activeFeature === index
                    ? 'bg-gray-800/80 border-gray-600 shadow-2xl transform scale-105'
                    : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} p-3 flex items-center justify-center ${
                    activeFeature === index ? 'animate-pulse' : ''
                  }`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                
                {activeFeature === index && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full"></div>
                )}
              </div>
            ))}

            {/* Security Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">99.99%</div>
                    <div className="text-sm text-gray-400">Uptime SLA</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <div className="flex items-center space-x-3 mb-3">
                  <Database className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">256-bit</div>
                    <div className="text-sm text-gray-400">Encryption</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
            <span className="flex items-center justify-center">
              <Shield className="mr-2 w-5 h-5" />
              Start Securing Your Platform
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecureFlowFeatures;