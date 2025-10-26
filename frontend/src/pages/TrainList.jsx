import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchTrains, getTrainAvailability } from '../services/api';

const TrainList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [trainAvailability, setTrainAvailability] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const source = searchParams.get('source');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');

  useEffect(() => {
    fetchTrains();
  }, [source, destination, date]);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const response = await searchTrains(source, destination, date);
      setTrains(response.data);
      
      // Fetch availability for each train and class
      const availabilityData = {};
      for (const train of response.data) {
        availabilityData[train.id] = {};
        const classes = ['GENERAL', 'SLEEPER', 'THIRD_AC', 'SECOND_AC', 'FIRST_AC'];
        
        for (const travelClass of classes) {
          try {
            const availResponse = await getTrainAvailability(train.id, date, travelClass);
            availabilityData[train.id][travelClass] = availResponse.data.availableSeats;
          } catch (err) {
            // If error, fall back to train's default seats
            availabilityData[train.id][travelClass] = getClassSeats(train, travelClass);
          }
        }
      }
      
      setTrainAvailability(availabilityData);
    } catch (err) {
      setError('Failed to fetch trains. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getClassSeats = (train, className) => {
    switch (className) {
      case 'GENERAL':
        return train.generalSeats || 0;
      case 'SLEEPER':
        return train.sleeperSeats || 0;
      case 'THIRD_AC':
        return train.thirdAcSeats || 0;
      case 'SECOND_AC':
        return train.secondAcSeats || 0;
      case 'FIRST_AC':
        return train.firstAcSeats || 0;
      default:
        return 0;
    }
  };

  const getAvailableSeats = (trainId, travelClass) => {
    return trainAvailability[trainId]?.[travelClass] ?? 0;
  };

  const handleBookNow = (trainId, travelClass) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }
    navigate(`/book/${trainId}?date=${date}&class=${travelClass}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading trains...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Trains from {source} to {destination}
          </h1>
          <p className="text-gray-600 mt-2">
            Found {trains.length} train(s) for {date}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {trains.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-xl text-gray-600">
              No trains found for this route.
            </p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Search Again
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {trains.map((train) => (
              <div
                key={train.id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {train.trainName}
                    </h2>
                    <p className="text-gray-600">Train No: {train.trainNumber}</p>
                  </div>
                  
                  <div className="flex gap-8 text-right">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="font-semibold text-lg">{train.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="font-semibold text-lg">{train.arrivalTime}</p>
                    </div>
                  </div>
                </div>

                {/* All Classes Display */}
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Available Classes:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {/* General Class */}
                    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">General</p>
                          <p className="text-2xl font-bold text-blue-600">₹{train.generalPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {getAvailableSeats(train.id, 'GENERAL')} seats available
                      </p>
                      <button
                        onClick={() => handleBookNow(train.id, 'GENERAL')}
                        disabled={getAvailableSeats(train.id, 'GENERAL') === 0}
                        className="w-full bg-blue-600 text-white py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {getAvailableSeats(train.id, 'GENERAL') === 0 ? 'Sold Out' : 'Book'}
                      </button>
                    </div>

                    {/* Sleeper Class */}
                    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Sleeper</p>
                          <p className="text-2xl font-bold text-blue-600">₹{train.sleeperPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {getAvailableSeats(train.id, 'SLEEPER')} seats available
                      </p>
                      <button
                        onClick={() => handleBookNow(train.id, 'SLEEPER')}
                        disabled={getAvailableSeats(train.id, 'SLEEPER') === 0}
                        className="w-full bg-blue-600 text-white py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {getAvailableSeats(train.id, 'SLEEPER') === 0 ? 'Sold Out' : 'Book'}
                      </button>
                    </div>

                    {/* Third AC Class */}
                    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Third AC</p>
                          <p className="text-2xl font-bold text-blue-600">₹{train.thirdAcPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {getAvailableSeats(train.id, 'THIRD_AC')} seats available
                      </p>
                      <button
                        onClick={() => handleBookNow(train.id, 'THIRD_AC')}
                        disabled={getAvailableSeats(train.id, 'THIRD_AC') === 0}
                        className="w-full bg-blue-600 text-white py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {getAvailableSeats(train.id, 'THIRD_AC') === 0 ? 'Sold Out' : 'Book'}
                      </button>
                    </div>

                    {/* Second AC Class */}
                    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">Second AC</p>
                          <p className="text-2xl font-bold text-blue-600">₹{train.secondAcPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {getAvailableSeats(train.id, 'SECOND_AC')} seats available
                      </p>
                      <button
                        onClick={() => handleBookNow(train.id, 'SECOND_AC')}
                        disabled={getAvailableSeats(train.id, 'SECOND_AC') === 0}
                        className="w-full bg-blue-600 text-white py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {getAvailableSeats(train.id, 'SECOND_AC') === 0 ? 'Sold Out' : 'Book'}
                      </button>
                    </div>

                    {/* First AC Class */}
                    <div className="border border-gray-200 rounded-lg p-3 hover:border-blue-500 hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-700">First AC</p>
                          <p className="text-2xl font-bold text-blue-600">₹{train.firstAcPrice}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        {getAvailableSeats(train.id, 'FIRST_AC')} seats available
                      </p>
                      <button
                        onClick={() => handleBookNow(train.id, 'FIRST_AC')}
                        disabled={getAvailableSeats(train.id, 'FIRST_AC') === 0}
                        className="w-full bg-blue-600 text-white py-1.5 rounded text-sm font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {getAvailableSeats(train.id, 'FIRST_AC') === 0 ? 'Sold Out' : 'Book'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainList;