import React, { useState, useEffect } from 'react';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "James Sterling",
      role: "CTO, TechCorp",
      avatar: "JS",
      rating: 5,
      content: "SecureFlow's implementation reduced our security incidents by 95%. The ROI was immediate and the peace of mind is priceless.",
      gradient: "from-blue-600 to-cyan-600",
      cardGradient: "from-blue-900/30 to-cyan-900/30",
      borderColor: "border-blue-500/20 hover:border-blue-400/40",
      textColor: "text-cyan-400"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "CISO, DataVault Inc",
      avatar: "MR",
      rating: 5,
      content: "The most comprehensive security solution we've ever deployed. SecureFlow's AI-driven approach is revolutionary.",
      gradient: "from-purple-600 to-pink-600",
      cardGradient: "from-purple-900/30 to-pink-900/30",
      borderColor: "border-purple-500/20 hover:border-purple-400/40",
      textColor: "text-purple-400"
    },
    {
      id: 3,
      name: "David Liu",
      role: "CEO, CloudSecure",
      avatar: "DL",
      rating: 5,
      content: "SecureFlow transformed our entire security posture. Our compliance audits now pass with flying colors.",
      gradient: "from-green-600 to-teal-600",
      cardGradient: "from-green-900/30 to-teal-900/30",
      borderColor: "border-green-500/20 hover:border-green-400/40",
      textColor: "text-green-400"
    },
    {
      id: 4,
      name: "Sarah Kim",
      role: "Head of IT, MegaBank",
      avatar: "SK",
      rating: 5,
      content: "Outstanding support and unmatched security capabilities. SecureFlow is essential for any enterprise.",
      gradient: "from-orange-600 to-red-600",
      cardGradient: "from-orange-900/30 to-red-900/30",
      borderColor: "border-orange-500/20 hover:border-orange-400/40",
      textColor: "text-orange-400"
    },
    {
      id: 5,
      name: "Robert Taylor",
      role: "VP Security, FinTech Pro",
      avatar: "RT",
      rating: 5,
      content: "The analytics dashboard alone is worth the investment. Real-time threat intelligence at its finest.",
      gradient: "from-indigo-600 to-blue-600",
      cardGradient: "from-indigo-900/30 to-blue-900/30",
      borderColor: "border-indigo-500/20 hover:border-indigo-400/40",
      textColor: "text-indigo-400"
    },
    {
      id: 6,
      name: "Anna Lopez",
      role: "Director, GlobalTech",
      avatar: "AL",
      rating: 5,
      content: "SecureFlow's proactive approach prevented three major attacks last quarter. It's our digital guardian angel.",
      gradient: "from-teal-600 to-cyan-600",
      cardGradient: "from-teal-900/30 to-cyan-900/30",
      borderColor: "border-teal-500/20 hover:border-teal-400/40",
      textColor: "text-teal-400"
    }
  ];

  const stats = [
    { value: "500+", label: "Satisfied Clients" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Expert Support" }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10s
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="text-yellow-400 text-xl">★</span>
    ));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-white/5 rounde

      <div className="relative z-10 flex items-center justify-center min-h-screen py-16 px-4">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Client <span className="text-yellow-300">Success</span> Stories
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Discover how SecureFlow has transformed businesses worldwide with cutting-edge security solutions
            </p>
            <div className="mt-8 w-24 h-1 bg-yellow-300 mx-auto rounded-full shadow-lg shadow-yellow-300/50"></div>
          </div>

          {/* Main Testimonials Slider */}
          <div className="relative mb-16">
            <div className="overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 p-6"
                  >
                    <div className={`bg-gradient-to-br ${testimonial.cardGradient} rounded-2xl p-8 border ${testimonial.borderColor} backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-2xl transform hover:-translate-y-2 group h-full`}>
                      {/* Profile */}
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                          <p className={`${testimonial.textColor} text-sm`}>{testimonial.role}</p>
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      
                      {/* Content */}
                      <p className="text-gray-300 text-lg leading-relaxed italic">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 z-10"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 z-10"
            >
              →
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <div className="text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-white/70 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;