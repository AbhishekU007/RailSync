import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getTrainById, createBooking } from '../services/api';

const BookTicket = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [train, setTrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    passengerName: '',
    passengerAge: '',
    passengerGender: 'Male',
    numberOfSeats: 1,
    travelDate: searchParams.get('date') || '',
    travelClass: searchParams.get('class') || 'SLEEPER',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTrain();
  }, [trainId]);

  const fetchTrain = async () => {
    try {
      const response = await getTrainById(trainId);
      setTrain(response.data);
    } catch (err) {
      setError('Failed to load train details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const user = JSON.parse(localStorage.getItem('user'));
    
    try {
      await createBooking(formData, user.id, trainId);
      alert('Booking successful!');
      navigate('/my-bookings');
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!train) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">Train not found</div>
      </div>
    );
  }

  const pricePerSeat = getClassPrice(train, formData.travelClass);
  const availableSeats = getClassSeats(train, formData.travelClass);
  const totalPrice = pricePerSeat * formData.numberOfSeats;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Your Ticket</h1>

        <div className="bg-blue-50 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{train.trainName}</h2>
          <p className="text-gray-600">Train No: {train.trainNumber}</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Route</p>
              <p className="font-semibold">{train.source} → {train.destination}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Timings</p>
              <p className="font-semibold">{train.departureTime} - {train.arrivalTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Travel Date</p>
              <p className="font-semibold">{formData.travelDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="font-semibold text-blue-600">{getClassDisplayName(formData.travelClass)}</p>
            </div>
          </div>
          <p className="mt-4 text-lg">
            <span className="font-semibold">Price per seat:</span> ₹{pricePerSeat}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Passenger Details</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Passenger Name
              </label>
              <input
                type="text"
                name="passengerName"
                value={formData.passengerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="passengerAge"
                  value={formData.passengerAge}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Gender
                </label>
                <select
                  name="passengerGender"
                  value={formData.passengerGender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Number of Seats
              </label>
              <input
                type="number"
                name="numberOfSeats"
                value={formData.numberOfSeats}
                onChange={handleChange}
                min="1"
                max={availableSeats}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                Available seats: {availableSeats}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-blue-600">₹{totalPrice}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition duration-200"
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;