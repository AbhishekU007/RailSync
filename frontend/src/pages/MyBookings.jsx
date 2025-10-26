import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserBookings, cancelBooking } from '../services/api';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings(user.id);
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await getUserBookings(userId);
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await cancelBooking(bookingId);
      alert('Booking cancelled successfully');
      const user = JSON.parse(localStorage.getItem('user'));
      fetchBookings(user.id);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to cancel booking');
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
        <div className="text-xl text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">
              You haven't made any bookings yet.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Book Your First Ticket
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {booking.train.trainName}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Train No: {booking.train.trainNumber}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Route</p>
                        <p className="font-semibold">
                          {booking.train.source} → {booking.train.destination}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Travel Date</p>
                        <p className="font-semibold">
                          {booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Travel Class</p>
                        <p className="font-semibold text-blue-600">
                          {getClassDisplayName(booking.travelClass)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Date</p>
                        <p className="font-semibold">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded">
                      <div>
                        <p className="text-sm text-gray-500">Passenger</p>
                        <p className="font-semibold">{booking.passengerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Age / Gender</p>
                        <p className="font-semibold">
                          {booking.passengerAge} / {booking.passengerGender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Seats</p>
                        <p className="font-semibold">{booking.numberOfSeats}</p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-8 text-right">
                    <p className="text-3xl font-bold text-blue-600">
                      ₹{booking.totalPrice}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Total Amount</p>
                    
                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
                      >
                        Cancel Booking
                      </button>
                    )}
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

export default MyBookings;