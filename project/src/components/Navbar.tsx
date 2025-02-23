import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-bold text-gray-100">Agentrix</span>
          </div>
          <div className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-300 hover:text-white transition-colors ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `text-gray-300 hover:text-white transition-colors ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              Chat Demo
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `text-gray-300 hover:text-white transition-colors ${
                  isActive ? 'text-white' : ''
                }`
              }
            >
              Analytics
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}