import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Shield, Lock, Zap, Globe, ArrowRight } from 'lucide-react';

const SecureFlowChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm SecureBot 🛡️ How can I help you with SecureFlow today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common questions
  const responses = {
    // Greetings
    'hello': "Hello! Welcome to SecureFlow! 👋 I'm here to help you with any questions about our security solutions.",
    'hi': "Hi there! Great to see you exploring SecureFlow! How can I assist you today?",
    'hey': "Hey! Thanks for checking out SecureFlow! What would you like to know?",
    
    // About SecureFlow
    'what is secureflow': "SecureFlow is a comprehensive security platform built on the MERN stack that provides advanced threat protection, real-time monitoring, and seamless security management for modern applications! 🚀",
    'about': "SecureFlow offers cutting-edge security solutions including data encryption, threat detection, access control, and compliance management - all in one powerful platform! 🛡️",
    'features': "Our key features include:\n• 🔒 Advanced Encryption\n• 🔍 Real-time Threat Detection\n• 👥 Identity Management\n• 📊 Security Analytics\n• 🌐 API Security\n• ⚡ Lightning-fast Performance",
    
    // Pricing
    'price': "We offer flexible pricing plans starting from $29/month for small teams to enterprise solutions. Would you like me to connect you with our sales team for a custom quote? 💰",
    'pricing': "Our pricing is designed to scale with your needs! Basic plans start at $29/month. For detailed pricing, I can arrange a demo call! 📞",
    'cost': "SecureFlow is competitively priced with transparent billing. Basic protection starts at $29/month. Enterprise solutions are custom-priced based on your requirements! 💼",
    
    // Technical
    'how it works': "SecureFlow integrates seamlessly with your existing infrastructure through our REST APIs and SDKs. Our AI-powered engine monitors, analyzes, and protects your applications 24/7! ⚙️",
    'integration': "Integration is super easy! We support REST APIs, webhooks, and have SDKs for popular frameworks. Most setups are complete in under 30 minutes! 🔧",
    'api': "Our RESTful API is fully documented and developer-friendly. We provide comprehensive endpoints for all security operations with excellent rate limits! 📚",
    
    // Support
    'support': "Our support team is available 24/7! You can reach us via live chat, email at support@secureflow.com, or phone. Premium customers get priority support! 🎧",
    'help': "I'm here to help! For technical issues, our docs are comprehensive. For account questions, our support team responds within 2 hours! 🤝",
    'contact': "You can reach us at:\n📧 support@secureflow.com\n📞 1-800-SECURE-1\n💬 Live chat (bottom right)\n🏢 Visit our office in San Francisco!",
    
    // Security specific
    'security': "Security is our DNA! We use military-grade encryption, zero-trust architecture, SOC 2 compliance, and regular penetration testing. Your data is fortress-level protected! 🏰",
    'encryption': "We use AES-256 encryption for data at rest and TLS 1.3 for data in transit. All keys are managed through our secure HSM infrastructure! 🔐",
    'compliance': "SecureFlow is SOC 2 Type II, GDPR, HIPAA, and ISO 27001 compliant. We help you meet your regulatory requirements effortlessly! ✅",
    
    // Demo/Trial
    'demo': "I'd love to show you SecureFlow in action! We offer a free 14-day trial with full features. Shall I set up a personalized demo for you? 🎬",
    'trial': "Start your free 14-day trial instantly! No credit card required. Full access to all features. Ready to begin your security journey? 🚀",
    'free': "Yes! We offer a 14-day free trial with complete access to SecureFlow. Perfect for testing with your applications! 🎁"
  };

  const quickActions = [
    { text: "What is SecureFlow?", icon: Shield },
    { text: "Features", icon: Zap },
    { text: "Pricing", icon: ArrowRight },
    { text: "Free Trial", icon: Globe }
  ];

  const findBestResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Direct matches
    for (const [key, response] of Object.entries(responses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    // Fallback responses
    const fallbacks = [
      "That's a great question! While I don't have that specific information, our team would love to help you personally. Try contacting support@secureflow.com! 📧",
      "I'm still learning! For detailed questions like this, our expert team at support@secureflow.com can provide you with comprehensive answers! 🤓",
      "Interesting question! While I cover the basics, our sales team can dive deeper into specifics. Would you like me to connect you? 🔗"
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickActions(false);

    // Simulate typing delay
    setTimeout(() => {
      const response = findBestResponse(inputText);
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (text) => {
    setInputText(text);
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 h-96 bg-gradient-to-br from-slate-900 via-sky-500-900 to-slate-900 rounded-2xl shadow-2xl border border-purple-500/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">SecureFlow Bot</h3>
                <p className="text-purple-100 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-3 duration-300`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-3 h-3 text-white" />
                    ) : (
                      <User className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.isBot 
                      ? 'bg-slate-800 text-slate-100 rounded-bl-sm' 
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start animate-in slide-in-from-bottom-3 duration-300">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {showQuickActions && messages.length === 1 && (
              <div className="space-y-2 animate-in slide-in-from-bottom-3 duration-500">
                <p className="text-slate-400 text-xs text-center">Quick questions:</p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputText(action.text);
                      setTimeout(() => handleSendMessage(), 100);
                    }}
                    className="w-full p-2 text-left text-sm bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <action.icon className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-300">{action.text}</span>
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-slate-800 text-white placeholder-slate-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" text-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
           <img
        src="https://i.pinimg.com/originals/10/58/c9/1058c9f739ea6feebdb361cb138bea6e.gif" // Replace with your actual path
        alt="Bot Assistant"
        className="w-16 h-16 rounded-full group-hover:scale-110 transition-transform"
      />
            {/* Notification pulse */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default SecureFlowChatbot;