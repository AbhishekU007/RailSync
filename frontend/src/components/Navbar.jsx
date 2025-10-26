import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white shadow-2xl border-b border-white/10 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-2xl">🚄</span>
            </div>
            <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              RailSync
            </span>
          </Link>
          
          <div className="flex gap-6 items-center">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="text-blue-300">👤</span>
                  <span className="text-sm font-semibold">Welcome, {user.name}</span>
                </div>
                <Link 
                  to="/my-bookings" 
                  className="hover:text-cyan-300 transition-colors duration-200 font-semibold flex items-center gap-2"
                >
                  <span>🎫</span>
                  <span>My Bookings</span>
                </Link>
                {user.role === 'ADMIN' && (
                  <Link 
                    to="/admin" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2"
                  >
                    <span>⚙️</span>
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="hover:text-cyan-300 transition-colors duration-200 font-semibold"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;