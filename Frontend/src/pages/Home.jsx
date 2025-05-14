import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Welcome to Store Finder</h1>
        <p className="text-center text-gray-600 mb-8">
          Discover stores, rate them, and manage your account with ease.
        </p>
        <div className="flex flex-col space-y-4">
          {/* Link to Sign Up */}
          <Link
            to="/signup"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg text-center font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Create an Account
          </Link>
          {/* Link to Login */}
          <Link
            to="/login"
            className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Log In to Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
