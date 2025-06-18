import React from 'react';
import { Shield, Lock, Key, Fingerprint, Zap, CheckCircle, ArrowRight, Users, Globe, Sparkles } from 'lucide-react';

export default function SecureFlowHero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-purple-500 rounded-full opacity-15 blur-2xl animate-bounce"></div>
      </div>

      {/* Floating security icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-bounce delay-300">
          <Shield className="w-8 h-8 text-white/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-bounce delay-700">
          <Lock className="w-6 h-6 text-white/20" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 animate-bounce delay-1000">
          <Key className="w-7 h-7 text-white/20" />
        </div>
        <div className="absolute top-1/2 right-1/5 animate-bounce delay-500">
          <Fingerprint className="w-8 h-8 text-white/20" />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Main hero content */}
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full mb-8 group hover:bg-black/30 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Next-Gen Authentication</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6 leading-tight drop-shadow-2xl">
              Secure
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent"> Flow</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Enterprise-grade authentication that's lightning fast, unbreakably secure, and surprisingly simple
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 hover:scale-105">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-black/20 backdrop-blur-xl text-white font-semibold rounded-xl border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105">
                <Lock className="w-5 h-5" />
                View Demo
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group p-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-300">Sub-100ms authentication with global edge deployment</p>
            </div>

            <div className="group p-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Military Grade</h3>
              <p className="text-gray-300">Zero-trust architecture with end-to-end encryption</p>
            </div>

            <div className="group p-6 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-black/30 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Seamless UX</h3>
              <p className="text-gray-300">One-click authentication across all platforms</p>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-gray-400 mb-4">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Trusted by 10,000+ companies worldwide</span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>GDPR Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
}