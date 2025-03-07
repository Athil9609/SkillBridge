import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Adminheader.css'

const AdminNavbar = () => {
  const nav=useNavigate()
  const logout=()=>{
    sessionStorage.clear()
    nav('/auth')
    toast.success("Logged Out!")

  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Skill Barter Admin</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/AdmnDashboard" className="nav-link text-light">Dashboard</Link>
              </li>
             
             
           
              
              <li className="nav-item  d-lg-none d-sm-block">
             <button className='btn btn-danger'onClick={logout}> LogOut</button>
            </li>
             
            </ul>
         
          </div>
          <ul className="navbar-nav me-auto d-lg-block d-none">
            
            
            <li className="nav-item">
             <button className='btn btn-danger' onClick={logout}>LogOut</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
