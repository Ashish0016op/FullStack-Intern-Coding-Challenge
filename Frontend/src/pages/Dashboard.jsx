import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stores, setStores] = useState([
    { id: 1, name: 'Store A', address: '123 Main St', rating: 4, userRating: null },
    { id: 2, name: 'Store B', address: '456 Elm St', rating: 3.5, userRating: null },
    { id: 3, name: 'Store C', address: '789 Oak St', rating: 5, userRating: null },
    { id: 4, name: 'Store D', address: '101 Pine St', rating: 4.2, userRating: null },
    { id: 5, name: 'Store E', address: '202 Maple St', rating: 3.8, userRating: null },
    { id: 6, name: 'Store F', address: '303 Birch St', rating: 4.5, userRating: null },
    { id: 7, name: 'Store G', address: '404 Cedar St', rating: 4.0, userRating: null },
    { id: 8, name: 'Store H', address: '505 Walnut St', rating: 3.9, userRating: null },
    { id: 9, name: 'Store I', address: '606 Cherry St', rating: 4.7, userRating: null },
    { id: 10, name: 'Store J', address: '707 Spruce St', rating: 4.3, userRating: null },
  ]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleRatingChange = (storeId, rating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, userRating: rating } : store
      )
    );
  };

  // Filter stores based on search input
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStores = filteredStores.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

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
          {currentStores.map((store) => (
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

        {/* Pagination Section */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
