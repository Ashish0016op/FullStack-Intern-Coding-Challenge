import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlePasswordUpdate = () => {
    alert('Password updated successfully!');
    setPassword('');
  };

  const handleLogout = () => {
    alert('Logged out successfully!');
    // Add logout logic here (e.g., clearing tokens, etc.)
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className='fixed w-[100%] top-0 left-0 '>
<nav className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-lg font-bold hover:underline">
          Store Finder
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {/* Update Password */}
        <div className="flex items-center space-x-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="px-2 py-1 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handlePasswordUpdate}
            className="bg-white text-blue-500 px-3 py-1 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update Password
          </button>
        </div>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Logout
        </button>
      </div>
    </nav>
    </div>
    
  );
};

export default Navbar;