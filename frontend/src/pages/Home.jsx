import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelClass, setTravelClass] = useState('SLEEPER');

  const handleSearch = (e) => {
    e.preventDefault();
    if (source && destination && travelDate) {
      navigate(`/trains?source=${source}&destination=${destination}&date=${travelDate}&class=${travelClass}`);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Book Your Train Journey
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find and book train tickets across India with ease
          </p>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="block text-left text-gray-700 font-semibold mb-2">
                  From (Source)
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Enter source city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-gray-700 font-semibold mb-2">
                  To (Destination)
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-gray-700 font-semibold mb-2">
                  Date of Journey
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  min={today}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-left text-gray-700 font-semibold mb-2">
                  Travel Class
                </label>
                <select
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="GENERAL">General</option>
                  <option value="SLEEPER">Sleeper</option>
                  <option value="THIRD_AC">Third AC</option>
                  <option value="SECOND_AC">Second AC</option>
                  <option value="FIRST_AC">First AC</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Search Trains
              </button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-2">🎫</div>
              <h3 className="font-semibold text-gray-800">Easy Booking</h3>
              <p className="text-sm text-gray-600">Book tickets in minutes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-2">💺</div>
              <h3 className="font-semibold text-gray-800">Real-time Availability</h3>
              <p className="text-sm text-gray-600">Check live seat status</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800">Secure Payment</h3>
              <p className="text-sm text-gray-600">Safe and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;