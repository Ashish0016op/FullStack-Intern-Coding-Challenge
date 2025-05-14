import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const SystemAdmDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St', role: 'Admin' },
    { id: 3, name: 'Store Owner', email: 'owner@example.com', address: '789 Oak St', role: 'Store Owner', rating: 4.5 },
    { id: 1, name: 'John Doe', email: 'john@example.com', address: '123 Main St', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', address: '456 Elm St', role: 'Admin' },
    { id: 3, name: 'Store Owner', email: 'owner@example.com', address: '789 Oak St', role: 'Store Owner', rating: 4.5 }
  ]);

  const [stores, setStores] = useState([
    { id: 1, name: 'Store A', email: 'storea@example.com', address: '123 Main St', rating: 4.2 },
    { id: 2, name: 'Store B', email: 'storeb@example.com', address: '456 Elm St', rating: 3.8 },
  ]);

  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'User' });
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [currentStorePage, setCurrentStorePage] = useState(1);
  const itemsPerPage = 3;

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentUserPage(1); // Reset to the first page when searching
    setCurrentStorePage(1); 
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.password && newUser.address) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
      setNewUser({ name: '', email: '', password: '', address: '', role: 'User' });
      alert('User added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.address.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.email.toLowerCase().includes(search.toLowerCase()) ||
      store.address.toLowerCase().includes(search.toLowerCase())
  );

   // Pagination logic for users
   const totalUserPages = Math.ceil(filteredUsers.length / itemsPerPage);
   const startUserIndex = (currentUserPage - 1) * itemsPerPage;
   const currentUsers = filteredUsers.slice(startUserIndex, startUserIndex + itemsPerPage);
 
   // Pagination logic for stores
   const totalStorePages = Math.ceil(filteredStores.length / itemsPerPage);
   const startStoreIndex = (currentStorePage - 1) * itemsPerPage;
   const currentStores = filteredStores.slice(startStoreIndex, startStoreIndex + itemsPerPage);
 

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">System Administrator Dashboard</h1>

        {/* Statistics Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Stores</h2>
            <p className="text-2xl font-bold">{stores.length}</p>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Total Ratings</h2>
            <p className="text-2xl font-bold">
              {stores.reduce((total, store) => total + (store.rating ? 1 : 0), 0)}
            </p>
          </div>
        </div>

        {/* Add New User Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Add New User</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Store Owner">Store Owner</option>
            </select>
            <button
              onClick={handleAddUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add User
            </button>
          </div>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Search</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search by name, email, address, or role"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* User List Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">User List</h2>
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
            >
              <p className="text-gray-800 font-medium">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Address: {user.address}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              {user.role === 'Store Owner' && (
                <p className="text-gray-600">Rating: {user.rating}</p>
              )}
            </div>
          ))}
           {/* Pagination for Users */}
           <div className="flex justify-center items-center mt-6 space-x-2">
            {Array.from({ length: totalUserPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentUserPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentUserPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Store List Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Store List</h2>
          {currentStores.map((store) => (
            <div
              key={store.id}
              className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
            >
              <p className="text-gray-800 font-medium">Name: {store.name}</p>
              <p className="text-gray-600">Email: {store.email}</p>
              <p className="text-gray-600">Address: {store.address}</p>
              <p className="text-gray-600">Rating: {store.rating}</p>
            </div>
          ))}
          {/* Pagination for Stores */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            {Array.from({ length: totalStorePages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentStorePage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentStorePage === index + 1
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
    </div>
  );
};

export default SystemAdmDashboard;
