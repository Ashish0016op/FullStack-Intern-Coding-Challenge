import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch store data from the backend
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/store/1'); // Replace '1' with the actual store ID
        if (response.ok) {
          const data = await response.json();
          setStore(data);
        } else {
          setError('Failed to fetch store data.');
        }
      } catch (err) {
        console.error('Error fetching store data:', err);
        setError('An error occurred while fetching store data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Store Owner Dashboard</h1>

        {/* Store Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Store Information</h2>
          <p className="text-gray-600">Store Name: {store.name}</p>
          <p className="text-gray-600">Average Rating: {store.averageRating || 'No ratings yet'}</p>
        </div>

        {/* User Ratings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">User Ratings</h2>
          {store.ratings && store.ratings.length > 0 ? (
            store.ratings.map((rating) => (
              <div
                key={rating.id}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
              >
                <p className="text-gray-800 font-medium">Username: {rating.username}</p>
                <p className="text-gray-600">Rating: {rating.rating}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No ratings submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
