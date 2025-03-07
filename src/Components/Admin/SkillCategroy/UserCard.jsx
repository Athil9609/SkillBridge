import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import baseUrl from '../../../services/baseUrl';

function UserCard({ user }) {
  const [showModal, setShowModal] = useState(false);

  // Default Profile Image
  const defaultProfileImg = "https://cdn-icons-png.flaticon.com/512/17/17004.png";
  const profileImgSrc = user.profile ? `${baseUrl}/uploads/${user.profile}` : defaultProfileImg;

  return (
    <>
      {/* User Card */}
      <Card className="shadow-sm border-0 rounded-3" style={{ width: '16rem', height: '26rem' }}>
        <Card.Img
          variant="top"
          src={profileImgSrc}
          alt={`${user.userName || "User"}'s Profile`}
          className="p-2 rounded"
          style={{ height: '12rem', objectFit: 'cover' }}
          onError={(e) => (e.target.src = defaultProfileImg)} // Handle broken image URLs
        />
        <Card.Body className="text-center">
          <Card.Title className="fw-bold">{user.userName || "Unknown User"}</Card.Title>
          <Card.Text className="text-muted mb-3">
            {user.email || "No email available"}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            View More
          </Button>
        </Card.Body>
      </Card>

      {/* Modal for User Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{user.userName || "User Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* User Info */}
          <div className="text-center mb-3">
            <img
              src={profileImgSrc}
              alt={user.userName || "User Profile"}
              className="rounded-circle"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              onError={(e) => (e.target.src = defaultProfileImg)}
            />
            <h5 className="mt-2">{user.userName || "Unknown User"}</h5>
            <p className="text-muted mb-0">{user.email || "No email available"}</p>
            <p className="text-muted">{user.phone || "Not provided"}</p>
          </div>
          <hr />

          {/* Skills Section */}
          <h5 className="mt-4">Skills</h5>
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <div key={index} className="border p-3 rounded mb-2">
                <h6>
                  <strong>{skill.skillName}</strong> ({skill.expertise})
                </h6>
                <p>{skill.description || "No description available."}</p>
                <p>
                  <strong>Rate:</strong> {skill.rate ? `$${skill.rate} per hour` : "Not specified"}
                </p>
                {skill.demoVideoURL && (
                  <div className="mt-2">
                    <p><strong>Demo Video:</strong></p>
                    <video width="100%" controls preload="none">
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
    </>
  );
}

export default UserCard;
