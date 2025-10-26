import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrains, addTrain, deleteTrain } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [trains, setTrains] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    trainName: '',
    trainNumber: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    totalSeats: '',
    price: '',
    generalPrice: '',
    sleeperPrice: '',
    thirdAcPrice: '',
    secondAcPrice: '',
    firstAcPrice: '',
    generalSeats: '',
    sleeperSeats: '',
    thirdAcSeats: '',
    secondAcSeats: '',
    firstAcSeats: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'ADMIN') {
      alert('Access denied. Admin only.');
      navigate('/');
      return;
    }
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await getAllTrains();
      setTrains(response.data);
    } catch (err) {
      alert('Failed to load trains');
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
    try {
      // Calculate total seats from all classes
      const totalSeats = 
        parseInt(formData.generalSeats || 0) +
        parseInt(formData.sleeperSeats || 0) +
        parseInt(formData.thirdAcSeats || 0) +
        parseInt(formData.secondAcSeats || 0) +
        parseInt(formData.firstAcSeats || 0);

      // Calculate average price or use sleeper price as default
      const averagePrice = formData.sleeperPrice || formData.generalPrice;

      const trainData = {
        ...formData,
        totalSeats: totalSeats,
        price: averagePrice,
      };

      await addTrain(trainData);
      alert('Train added successfully');
      setShowForm(false);
      setFormData({
        trainName: '',
        trainNumber: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        totalSeats: '',
        price: '',
        generalPrice: '',
        sleeperPrice: '',
        thirdAcPrice: '',
        secondAcPrice: '',
        firstAcPrice: '',
        generalSeats: '',
        sleeperSeats: '',
        thirdAcSeats: '',
        secondAcSeats: '',
        firstAcSeats: '',
      });
      fetchTrains();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add train');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this train?')) {
      return;
    }
    try {
      await deleteTrain(id);
      alert('Train deleted successfully');
      fetchTrains();
    } catch (err) {
      alert('Failed to delete train');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {showForm ? 'Cancel' : 'Add New Train'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Add New Train</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Train Name
                </label>
                <input
                  type="text"
                  name="trainName"
                  value={formData.trainName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Train Number
                </label>
                <input
                  type="text"
                  name="trainNumber"
                  value={formData.trainNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Source
                </label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Departure Time
                </label>
                <input
                  type="time"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Arrival Time
                </label>
                <input
                  type="time"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <h3 className="text-lg font-bold text-gray-800 mt-4 mb-3">
                  Class-wise Seat Allocation
                </h3>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  General Seats
                </label>
                <input
                  type="number"
                  name="generalSeats"
                  value={formData.generalSeats}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  General Price (₹)
                </label>
                <input
                  type="number"
                  name="generalPrice"
                  value={formData.generalPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Sleeper Seats
                </label>
                <input
                  type="number"
                  name="sleeperSeats"
                  value={formData.sleeperSeats}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Sleeper Price (₹)
                </label>
                <input
                  type="number"
                  name="sleeperPrice"
                  value={formData.sleeperPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Third AC Seats
                </label>
                <input
                  type="number"
                  name="thirdAcSeats"
                  value={formData.thirdAcSeats}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Third AC Price (₹)
                </label>
                <input
                  type="number"
                  name="thirdAcPrice"
                  value={formData.thirdAcPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Second AC Seats
                </label>
                <input
                  type="number"
                  name="secondAcSeats"
                  value={formData.secondAcSeats}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Second AC Price (₹)
                </label>
                <input
                  type="number"
                  name="secondAcPrice"
                  value={formData.secondAcPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First AC Seats
                </label>
                <input
                  type="number"
                  name="firstAcSeats"
                  value={formData.firstAcSeats}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  First AC Price (₹)
                </label>
                <input
                  type="number"
                  name="firstAcPrice"
                  value={formData.firstAcPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Add Train
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">All Trains</h2>
          <div className="space-y-4">
            {trains.map((train) => (
              <div key={train.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{train.trainName}</h3>
                    <p className="text-gray-600">Train No: {train.trainNumber}</p>
                    <p className="text-gray-600 mt-1">
                      {train.source} → {train.destination}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {train.departureTime} - {train.arrivalTime}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(train.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">General</p>
                    <p className="text-lg font-bold text-blue-600">₹{train.generalPrice}</p>
                    <p className="text-xs text-gray-500">
                      {train.availableGeneralSeats}/{train.generalSeats} seats
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Sleeper</p>
                    <p className="text-lg font-bold text-blue-600">₹{train.sleeperPrice}</p>
                    <p className="text-xs text-gray-500">
                      {train.availableSleeperSeats}/{train.sleeperSeats} seats
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Third AC</p>
                    <p className="text-lg font-bold text-blue-600">₹{train.thirdAcPrice}</p>
                    <p className="text-xs text-gray-500">
                      {train.availableThirdAcSeats}/{train.thirdAcSeats} seats
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">Second AC</p>
                    <p className="text-lg font-bold text-blue-600">₹{train.secondAcPrice}</p>
                    <p className="text-xs text-gray-500">
                      {train.availableSecondAcSeats}/{train.secondAcSeats} seats
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600 font-semibold">First AC</p>
                    <p className="text-lg font-bold text-blue-600">₹{train.firstAcPrice}</p>
                    <p className="text-xs text-gray-500">
                      {train.availableFirstAcSeats}/{train.firstAcSeats} seats
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;