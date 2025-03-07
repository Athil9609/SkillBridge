import React, { useEffect, useState } from 'react';
import { userList, updateUserStatus } from '../../services/allApis';
import UserDocuments from './UserDocuments';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import baseUrl from '../../services/baseUrl';
import './admin.css';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await userList();
            console.log("API Response:", res);  // Debugging
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        const user = users.find(user => user._id === id);
        if (user) {
            const updatedUser = { ...user, status: newStatus };
            const res = await updateUserStatus(id, updatedUser);

            if (res.status === 200) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === id ? { ...user, status: newStatus } : user
                    )
                );
                getData();
            }
        }
    };

    return (
        <div className="manage-users container">
            <h2 className="text-center my-4">Manage Users</h2>
            <div className="d-flex justify-content-center align-items-center p-5">
                <table className="table table-striped table-bordered shadow-sm">
                    <thead className="bg-success text-white">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                            <th>Documents</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.status === "verified" ? "bg-info" : user.status === "pending" ? "bg-warning" : "bg-danger"}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        {user.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() => handleStatusChange(user._id, "verified")}
                                                    className="btn btn-primary btn-sm me-1"
                                                >
                                                    Verify
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(user._id, "rejected")}
                                                    className="btn btn-outline-custom btn-sm"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {user.status === "verified" && (
                                            <button
                                                onClick={() => handleStatusChange(user._id, "blocked")}
                                                className="btn btn-outline-custom btn-sm"
                                            >
                                                Block
                                            </button>
                                        )}
                                        {user.status === "blocked" && (
                                            <button
                                                onClick={() => handleStatusChange(user._id, "verified")}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Unblock
                                            </button>
                                        )}
                                        {user.status === "rejected" && (
                                            <button
                                                onClick={() => handleStatusChange(user._id, "verified")}
                                                className="btn btn-primary btn-sm"
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </td>
                                    <td>
                                        <UserDocuments data={user} />
                                    </td>
                                    <td>
                                        <Button
                                            variant="info"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setShowModal(true);
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No users found!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal for User Details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
                <Modal.Header closeButton className="bg-success text-white">
                    <Modal.Title>{selectedUser?.userName || "User Details"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* User Info */}
                    <div className="text-center mb-3">
                        <img
                            src={selectedUser?.profile ? `${baseUrl}/uploads/${selectedUser.profile}` : "https://cdn-icons-png.flaticon.com/512/17/17004.png"}
                            alt={selectedUser?.userName || "User Profile"}
                            className="rounded-circle"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <h5 className="mt-2">{selectedUser?.userName || "Unknown User"}</h5>
                        <p className="text-muted mb-0">{selectedUser?.email || "No email available"}</p>
                        <p className='text-muted'>{selectedUser?.phone || "Not provided"}</p>
                    </div>
                    <hr />

                    {/* Skills Section */}
                    <h5 className="mt-4">Skills</h5>
                    {Array.isArray(selectedUser?.skill) && selectedUser.skill.length > 0 ? (
                        selectedUser.skill.map((skill, index) => (
                            <div key={index} className="border p-3 rounded mb-2">
                                <h6><strong>{skill.skillName || "Unnamed Skill"}</strong> ({skill.expertise || "N/A"})</h6>
                                <p>{skill.description || "No description available"}</p>
                                <p><strong>Rate:</strong> {skill.rate || "N/A"} per hour</p>

                                {skill.demoVideoURL && (
                                    <div className="mt-2">
                                        <p><strong>Demo Video:</strong></p>
                                        <video width="100%" controls>
                                            <source src={`${baseUrl}/uploads/videos/${skill.demoVideoURL}`} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-muted">No skills listed</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageUsers;
