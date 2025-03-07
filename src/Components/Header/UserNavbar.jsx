// src/Components/User/Header/UserNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserNavbar = () => {
  const nav=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    nav('/auth')
    toast.success("Logged Out!")

  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Skill Barter</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            
            <li className="nav-item">
              <Link to="/user/dash" className="nav-link text-light hover-shadow">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/SkillCategoryUsr" className="nav-link text-light hover-shadow">Skills</Link>
            </li>
            <li className="nav-item">
              <Link to="userdetails/user/mybookings" className="nav-link text-light hover-shadow">Bookings</Link>
            </li>
             <li className="nav-item">
              <Link to="user/contact" className="nav-link text-light hover-shadow">Conatct Us</Link>
            </li> 
            <li className="nav-item  d-lg-none d-sm-block">
             <button className='btn btn-outline-danger'onClick={logout}> LogOut</button>
            </li>
          </ul>
          
        </div>
        <ul className="navbar-nav me-auto d-lg-block d-none">
            
            
            <li className="nav-item">
             <button className='btn btn-outline-danger' onClick={logout}> LogOut</button>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default UserNavbar;
