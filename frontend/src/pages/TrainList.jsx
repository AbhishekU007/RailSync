import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchTrains } from '../services/api';

const TrainList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const source = searchParams.get('source');
  const destination = searchParams.get('destination');
  const date = searchParams.get('date');
  const travelClass = searchParams.get('class');

  useEffect(() => {
    fetchTrains();
  }, [source, destination, date, travelClass]);

  const fetchTrains = async () => {
    try {
      setLoading(true);
      const response = await searchTrains(source, destination, date, travelClass);
      setTrains(response.data);
    } catch (err) {
      setError('Failed to fetch trains. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (trainId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to book tickets');
      navigate('/login');
      return;
    }
    navigate(`/book/${trainId}?date=${date}&class=${travelClass}`);
  };

  const getClassPrice = (train, className) => {
    switch (className) {
      case 'GENERAL':
        return train.generalPrice;
      case 'SLEEPER':
        return train.sleeperPrice;
      case 'THIRD_AC':
        return train.thirdAcPrice;
      case 'SECOND_AC':
        return train.secondAcPrice;
      case 'FIRST_AC':
        return train.firstAcPrice;
      default:
        return train.price;
    }
  };

  const getClassSeats = (train, className) => {
    switch (className) {
      case 'GENERAL':
        return train.availableGeneralSeats;
      case 'SLEEPER':
        return train.availableSleeperSeats;
      case 'THIRD_AC':
        return train.availableThirdAcSeats;
      case 'SECOND_AC':
        return train.availableSecondAcSeats;
      case 'FIRST_AC':
        return train.availableFirstAcSeats;
      default:
        return train.availableSeats;
    }
  };

  const getClassDisplayName = (className) => {
    switch (className) {
      case 'GENERAL':
        return 'General';
      case 'SLEEPER':
        return 'Sleeper';
      case 'THIRD_AC':
        return 'Third AC';
      case 'SECOND_AC':
        return 'Second AC';
      case 'FIRST_AC':
        return 'First AC';
      default:
        return className;
    }
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
            Found {trains.length} train(s) for {date} - {getClassDisplayName(travelClass)} Class
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
          <div className="space-y-4">
            {trains.map((train) => {
              const classPrice = getClassPrice(train, travelClass);
              const availableSeats = getClassSeats(train, travelClass);
              
              return (
                <div
                  key={train.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {train.trainName}
                      </h2>
                      <p className="text-gray-600">Train No: {train.trainNumber}</p>
                      
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Departure</p>
                          <p className="font-semibold">{train.departureTime}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Arrival</p>
                          <p className="font-semibold">{train.arrivalTime}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm text-gray-500">Class</p>
                        <p className="font-semibold text-blue-600">{getClassDisplayName(travelClass)}</p>
                      </div>
                    </div>

                    <div className="ml-8 text-right">
                      <p className="text-3xl font-bold text-blue-600">
                        ₹{classPrice}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {availableSeats} seats available
                      </p>
                      <button
                        onClick={() => handleBookNow(train.id)}
                        disabled={availableSeats === 0}
                        className="mt-4 bg-green-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                      >
                        {availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainList;