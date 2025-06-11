import React from 'react';
import { ArrowLeft, Home, Search, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-[200px] md:text-[300px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 leading-none animate-pulse">
            404
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-20 left-1/3 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full animate-bounce">
            <AlertTriangle className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry, it happens to the best of us!
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg max-w-lg mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-500 mb-4">
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">What you can do:</span>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Check the URL for any typos</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>Go back to the previous page</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span>Return to our homepage</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoBack}
            className="group flex items-center space-x-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={handleGoHome}
            className="group flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 transform"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Go Home</span>
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-sm text-gray-500">
          <p>Still having trouble? 
            <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 ml-1 font-medium hover:underline transition-colors duration-200">
              Contact Support
            </a>
          </p>
        </div>

        {/* Decorative Bottom Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30"></div>
      </div>
    </div>
  );
};

export default NotFound;