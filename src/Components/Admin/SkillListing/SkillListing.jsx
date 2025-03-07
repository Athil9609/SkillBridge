import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { skillListing } from "../../../services/allApis";

const SkillListings = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getSkillData();
  }, []);

  const getSkillData = async () => {
    try {
      const response = await skillListing();
      if (response.status === 200) {
        setSkills(response.data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Manage Skill Listings</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Skill</th>
              <th>User</th>
              <th>Description</th>
              <th>Date Submitted</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {skills.length > 0 ? (
              skills.map((skill) => (
                <tr key={skill._id}>
                  <td>{skill.skillName || "N/A"}</td>
                  <td>{skill.addedBy?.userName || "Unknown User"}</td>
                  <td>{skill.description || "No description provided"}</td>
                  <td>
                    {skill.createdAt
                      ? new Date(skill.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <Link
                      to="#"
                      onClick={() => {
                        setSelectedSkill(skill);
                        setShowModal(true);
                      }}
                    >
                      View More
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No skills available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedSkill?.skillName || "Skill Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>User:</strong> {selectedSkill?.addedBy?.userName || "Unknown"}</p>
          <p><strong>Email:</strong> {selectedSkill?.addedBy?.email || "Not provided"}</p>
          <p><strong>Phone:</strong> {selectedSkill?.addedBy?.phone || "N/A"}</p>
          <p><strong>Category:</strong> {selectedSkill?.categoryName || "Uncategorized"}</p>
          <p><strong>Expertise:</strong> {selectedSkill?.expertise || "Not specified"}</p>
          <p><strong>Description:</strong> {selectedSkill?.description || "No description available"}</p>
          <p><strong>Rate:</strong> {selectedSkill?.rate ? `$${selectedSkill.rate}/hr` : "Not specified"}</p>
          <p><strong>Submitted On:</strong> {selectedSkill?.createdAt ? new Date(selectedSkill.createdAt).toLocaleDateString() : "N/A"}</p>
          <hr />
          <h6>Demo Video:</h6>
          {selectedSkill?.demoVideoURL ? (
            <video width="100%" controls>
              <source src={selectedSkill.demoVideoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>No demo video available</p>
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

export default SkillListings;
