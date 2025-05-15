import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch stores from the backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stores');
        if (response.ok) {
          const data = await response.json();
          setStores(data);
        } else {
          console.error('Failed to fetch stores');
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleRatingChange = async (storeId, rating) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stores/${storeId}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      if (response.ok) {
        // Update the store's user rating locally
        setStores((prevStores) =>
          prevStores.map((store) =>
            store.id === storeId ? { ...store, userRating: rating } : store
          )
        );
        alert('Rating submitted successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('An error occurred while submitting your rating.');
    }
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
                  onChange={(e) => handleRatingChange(store.id, parseInt(e.target.value))}
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
