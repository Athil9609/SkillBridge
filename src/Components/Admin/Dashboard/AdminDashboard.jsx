import React from 'react';
import { Link } from 'react-router-dom';
import '../admin.css'

const AdminDashboard = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Dashboard</h1>

      <div className="row mb-3">
        {/* Stats Cards */}
        <div className="col-md-4">
          <div  className="card text-white"
            style={{
              background: "linear-gradient(135deg, #6a0dad, #a463f2)", 
              borderRadius: "12px",
              boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
            }}>
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">250</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div c className="card text-white"
            style={{
              background: "linear-gradient(135deg, #6a0dad, #a463f2)", 
              borderRadius: "12px",
              boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
            }}>
            <div className="card-body">
              <h5 className="card-title">Total Transactions</h5>
              <p className="card-text">1200</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div  className="card text-white"
            style={{
              background: "linear-gradient(135deg, #6a0dad, #a463f2)", 
              borderRadius: "12px",
              boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
            }}>
            <div className="card-body">
              <h5 className="card-title">Pending Complaints</h5>
              <p className="card-text">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Section Links */}
      <div className="row">
        <div className="col-md-6">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Users</h5>
              <p className="card-text">View and manage all users</p>
              <Link to="/manageUser" className="btn btn-primary">Manage Users</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Skill Categories</h5>
              <p className="card-text">Add and manage skill categories</p>
              <Link to="/manageSkillCategory" className="btn btn-primary">Manage Categories</Link>
            </div>
          </div>
        </div>

        {/* <div className="col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Manage Skill Listings</h5>
              <p className="card-text">View and manage skill listings</p>
              <Link to="/skillListingAdmn" className="btn btn-primary">Manage Listings</Link>
            </div>
          </div>
        </div> */}

      </div>

      {/* Ratings & Complaints Section */}
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">Ratings & Feedback</h5>
              <p className="card-text">View user feedback and ratings</p>
              <Link to="/viewRatingAdmn" className="btn btn-primary">View Feedback</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">View Complaints</h5>
              <p className="card-text">Handle user complaints</p>
              <Link to="/viewComplaintsAdmn" className="btn btn-primary">View Complaints</Link>
            </div>
          </div>
        </div>

        
        <div className="col-md-4">
          <div className="card text-center mb-4">
            <div className="card-body">
              <h5 className="card-title">View Transactions</h5>
              <p className="card-text">Monitor all skill barter transactions</p>
              <Link to="/viewTransactions" className="btn btn-primary">View Transactions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
