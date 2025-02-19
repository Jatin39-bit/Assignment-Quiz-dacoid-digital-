/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 
import { dataContext } from '../context/ContextApi';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data, loggedIn, setLoggedIn } = useContext(dataContext);

  const navigate=useNavigate()

  const handleLogout = () => {
    console.log("running func")
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/login')
  }

  return (
    <div className="w-full bg-gray-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        
        <Link to="/" className="text-2xl font-bold text-blue-400">Quiz App</Link>

        <ul className="hidden md:flex space-x-8 text-lg">
          <li><Link to="/" className="hover:text-blue-400 transition">🏠 Home</Link></li>
          <li><Link to="/global-scoreboard" className="hover:text-blue-400 transition">🌍 Global Scoreboard</Link></li>
          <li><Link to="/my-scoreboard" className="hover:text-blue-400 transition">📊 My Scoreboard</Link></li>
          {loggedIn ? (
            <button onClick={()=>handleLogout()} className="hover:text-blue-400 transition">🔓 Logout</button>
          ) : (
            <li><Link to="/login" className="hover:text-blue-400 transition">🔐 Login</Link></li>
          )}
        </ul>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <ul className="flex flex-col items-center py-4 space-y-4 text-lg">
            <li><Link to="/" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>🏠 Home</Link></li>
            <li><Link to="/global-scoreboard" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>🌍 Global Scoreboard</Link></li>
            <li><Link to="/my-scoreboard" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>📊 My Scoreboard</Link></li>
            {loggedIn ? (
              <li><button  className="hover:text-blue-400 transition" onClick={() => {
                setMenuOpen(false) 
                handleLogout()
              }}>🔓 Logout</button></li>
            ) : (
              <li><Link to="/login" className="hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>🔐 Login</Link></li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
