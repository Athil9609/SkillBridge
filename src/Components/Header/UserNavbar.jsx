import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Header/Header.css'

const UserNavbar = () => {
  const nav = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    nav('/auth');
    toast.success("Logged Out!");
  };

  return (
    <nav className="navbar navbar-expand-lg  shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-white">Skill Barter</Link>

        {/* ✅ Corrected Navbar Toggler */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon toggle-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/user/dash" className="nav-link text-light">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/SkillCategoryUsr" className="nav-link text-light">Skills</Link>
            </li>
            <li className="nav-item">
              <Link to="/userdetails/user/mybookings" className="nav-link text-light">Bookings</Link>
            </li>
            <li className="nav-item">
              <Link to="/user/contact" className="nav-link text-light">Contact Us</Link>
            </li>
            {/* Mobile Logout Button */}
            <li className="nav-item d-lg-none d-sm-block">
              <button className="btn btn-outline-light w-100 mt-2" onClick={logout}>Log Out</button>
            </li>
          </ul>
        </div>

        {/* Desktop Logout Button */}
        <ul className="navbar-nav me-auto d-lg-block d-none">
          <li className="nav-item">
            <button className="btn btn-outline-light" onClick={logout}>Log Out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
