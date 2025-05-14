import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stores, setStores] = useState([
    { id: 1, name: 'Store A', address: '123 Main St', rating: 4, userRating: null },
    { id: 2, name: 'Store B', address: '456 Elm St', rating: 3.5, userRating: null },
    { id: 3, name: 'Store C', address: '789 Oak St', rating: 5, userRating: null },
  ]);
  const [search, setSearch] = useState('');
  const [password, setPassword] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleRatingChange = (storeId, rating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, userRating: rating } : store
      )
    );
  };

  const handlePasswordUpdate = () => {
    alert('Password updated successfully!');
    setPassword('');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Add logout logic here
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

        {/* Password Update Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Update Password</h2>
          <div className="flex items-center space-x-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handlePasswordUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Search Stores</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name or address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Store List Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Store Listings</h2>
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
            >
              <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
              <p className="text-gray-600">Address: {store.address}</p>
              <p className="text-gray-600">Overall Rating: {store.rating}</p>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Rating:
                </label>
                <select
                  value={store.userRating || ''}
                  onChange={(e) => handleRatingChange(store.id, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a rating
                  </option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
