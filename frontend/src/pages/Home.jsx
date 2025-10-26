import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (source && destination && travelDate) {
      navigate(`/trains?source=${source}&destination=${destination}&date=${travelDate}`);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const popularRoutes = [
    { from: 'Delhi', to: 'Mumbai', time: '16h', price: '₹800' },
    { from: 'Bangalore', to: 'Chennai', time: '6h', price: '₹350' },
    { from: 'Kolkata', to: 'Delhi', time: '17h', price: '₹900' },
    { from: 'Mumbai', to: 'Goa', time: '12h', price: '₹450' },
  ];

  const features = [
    {
      icon: '🚄',
      title: 'Lightning Fast Booking',
      description: 'Book your tickets in under 60 seconds',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔐',
      title: 'Bank-Grade Security',
      description: 'Military-grade encryption for your safety',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '💳',
      title: 'Multiple Payments',
      description: 'UPI, Cards, Wallets - We support all',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: '📱',
      title: 'Instant E-Tickets',
      description: 'Tickets delivered via email & SMS instantly',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: '🎯',
      title: 'Real-Time Updates',
      description: 'Live seat availability across all classes',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: '🏆',
      title: '24/7 Support',
      description: 'Always here to help you travel better',
      gradient: 'from-pink-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16">
          {/* Logo & Title */}
          <div className="text-center mb-10">
            <div className="inline-block mb-3">
              <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                RailSync
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              India's Smartest Railway Booking Platform
            </h2>
            <p className="text-base md:text-lg text-blue-200 max-w-2xl mx-auto mb-6">
              Book tickets in seconds • Real-time seat availability • Instant confirmation across 5000+ routes
            </p>
            <div className="flex gap-8 justify-center items-center text-sm text-gray-300 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <span className="font-medium">10M+ Happy Travelers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400">★</span>
                </div>
                <span className="font-medium">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-purple-400">⚡</span>
                </div>
                <span className="font-medium">60 Sec Avg Booking</span>
              </div>
            </div>
          </div>

          {/* Search Card */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎫</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                  Find Your Perfect Journey
                </h3>
              </div>
              
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-blue-200 font-semibold mb-3 text-sm uppercase tracking-wide">
                      🚉 Departure Station
                    </label>
                    <input
                      type="text"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="e.g., New Delhi"
                      className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 font-medium text-lg"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-blue-200 font-semibold mb-3 text-sm uppercase tracking-wide">
                      🎯 Arrival Station
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="e.g., Mumbai Central"
                      className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-xl focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 font-medium text-lg"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-blue-200 font-semibold mb-3 text-sm uppercase tracking-wide">
                    📅 Journey Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    min={today}
                    className="w-full px-6 py-4 bg-white/90 border-2 border-transparent rounded-xl focus:ring-4 focus:ring-cyan-500/50 focus:border-cyan-400 focus:bg-white transition-all duration-300 text-gray-800 font-medium text-lg"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 text-white py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span>Search Trains</span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </form>

              {/* Popular Routes */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-blue-200 text-sm mb-4 font-semibold">✨ Popular Routes:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {popularRoutes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSource(route.from);
                        setDestination(route.to);
                      }}
                      className="px-4 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/40 hover:scale-105 text-left"
                    >
                      <div className="font-bold">{route.from} → {route.to}</div>
                      <div className="text-xs text-blue-300 mt-1">{route.time} • {route.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-16 max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Everything You Need in One Place
              </h3>
              <p className="text-blue-200 text-base max-w-2xl mx-auto">
                We've built the most comprehensive railway booking platform with features that make your travel planning effortless
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <span className="text-4xl">{feature.icon}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-blue-200 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-6xl mx-auto px-4 mb-16">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  10M+
                </div>
                <div className="text-blue-200 font-semibold">Happy Travelers</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  5000+
                </div>
                <div className="text-blue-200 font-semibold">Routes Covered</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-2">
                  99.9%
                </div>
                <div className="text-blue-200 font-semibold">Success Rate</div>
              </div>
              <div className="group hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-2">
                  24/7
                </div>
                <div className="text-blue-200 font-semibold">Support Available</div>
              </div>
            </div>
          </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Book Your Journey in 3 Simple Steps
              </h3>
              <p className="text-blue-200 text-base max-w-2xl mx-auto">
                Our streamlined process gets you from search to confirmation in under a minute
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                    1
                  </div>
                  <div className="text-5xl mb-4">🔍</div>
                  <h4 className="text-xl font-bold text-white mb-3">Search Trains</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Enter your source, destination, and travel date. Our smart search instantly finds all available trains with real-time seat availability across all classes.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                    2
                  </div>
                  <div className="text-5xl mb-4">🎫</div>
                  <h4 className="text-xl font-bold text-white mb-3">Select & Book</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Choose your preferred class, view live pricing, and book instantly. Compare General, Sleeper, 3AC, 2AC, and 1AC options side-by-side for the best choice.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                    3
                  </div>
                  <div className="text-5xl mb-4">✅</div>
                  <h4 className="text-xl font-bold text-white mb-3">Get Confirmed</h4>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Receive instant confirmation with e-tickets delivered via email and SMS. Access your bookings anytime from your dashboard for easy trip management.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mb-16 max-w-6xl mx-auto px-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-3">🔒</div>
                  <h4 className="text-white font-bold mb-2">100% Secure</h4>
                  <p className="text-blue-200 text-sm">SSL encrypted transactions with PCI-DSS compliance</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">⚡</div>
                  <h4 className="text-white font-bold mb-2">Instant Refunds</h4>
                  <p className="text-blue-200 text-sm">Hassle-free cancellations with instant refund processing</p>
                </div>
                <div>
                  <div className="text-4xl mb-3">💎</div>
                  <h4 className="text-white font-bold mb-2">Best Price Guarantee</h4>
                  <p className="text-blue-200 text-sm">Official railway rates with no hidden charges</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 shadow-2xl max-w-4xl">
              <h3 className="text-3xl font-bold text-white mb-3">
                Ready to Start Your Journey?
              </h3>
              <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                Join millions who trust RailSync for seamless railway bookings
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-white text-blue-600 rounded-xl font-bold text-base hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Create Free Account
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-base hover:bg-white/30 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/40"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 py-6">
          <div className="container mx-auto px-4 text-center text-blue-200">
            <p className="text-sm">
              © 2025 RailSync. Revolutionizing railway reservations across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;