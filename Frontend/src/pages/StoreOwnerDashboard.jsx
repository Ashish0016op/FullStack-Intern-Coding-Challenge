import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const StoreOwnerDashboard = () => {
  const [store, setStore] = useState({
    name: 'Store A',
    averageRating: 4.2,
    ratings: [
      { id: 1, username: 'User1', rating: 5 },
      { id: 2, username: 'User2', rating: 4 },
      { id: 3, username: 'User3', rating: 3 },
    ],
  });

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
          <p className="text-gray-600">Average Rating: {store.averageRating}</p>
        </div>

        {/* User Ratings */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">User Ratings</h2>
          {store.ratings.length > 0 ? (
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
