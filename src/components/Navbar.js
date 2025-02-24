import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            TodoApp
          </Link>
          
          {location.pathname === '/' ? (
            <Link 
              to="/todo"
              className="group relative inline-flex items-center gap-2 bg-primary px-4 py-2 rounded-lg font-semibold text-white overflow-hidden"
            >
              <span className="relative z-10">Open App</span>
              <div className="absolute inset-0 bg-secondary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
            </Link>
          ) : (
            <Link 
              to="/"
              className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold overflow-hidden"
            >
              <span className="relative z-10 text-primary group-hover:text-white transition-colors duration-300">
                Back to Home
              </span>
              <div className="absolute inset-0 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 