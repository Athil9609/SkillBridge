import React, { useContext, useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Rating from "./Rating";
import baseUrl from "../../../services/baseUrl";
import { addBooking, deleteRatingAndFeedback, getSpecificUserDetails } from "../../../services/allApis";
import EditRating from "./EditRating";
import { addSkillRatingContext, editSkillContext } from "../../../Context/ContextApi";
import "../user.css"; // Ensure you import the CSS file

const UserDetailsWithToggle = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Skill");
  const [userData, setUserData] = useState(null);

  // Context API for tracking skill rating updates
  const { addSkillRatingResponse } = useContext(addSkillRatingContext);
  const { editSkillRatingResponse } = useContext(editSkillContext);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await getSpecificUserDetails(userId);
      if (res.status === 200) {
        setUserData(res.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId, addSkillRatingResponse, editSkillRatingResponse]);

  const deleteRating = async (id) => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };
    const res = await deleteRatingAndFeedback(id, header);
    if (res.status === 200) {
      fetchUserDetails();
    }
  };

  const handleBooking = async (skillName) => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    const bookingData = { skillName, serviceProviderId: userData.user.userId };
    const res = await addBooking(header, bookingData);
    if (res.status === 200) {
      navigate("/userdetails/user/mybookings");
    } else {
      alert(res.response.data.message);
    }
  };

  if (!userData) return <p className="text-center text-purple">Loading...</p>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="user-dashboard card mb-4">
          <div className="row g-0">
            {/* Profile Section */}
            <div className="col-md-4 d-flex flex-column align-items-center justify-content-center p-3">
              <img
                src={userData.user?.profilePic ? `${baseUrl}/uploads/${userData.user.profilePic}` : "https://cdn-icons-png.flaticon.com/512/17/17004.png"}
                alt="User Profile"
                className="rounded-circle"
                style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #5a2d82" }}
              />
              <h5 className="text-purple">{userData.user?.userName || "No Name"}</h5>
              <div><strong>Email:</strong> {userData.user?.email || "N/A"}</div>
              <div><strong>Phone:</strong> {userData.user?.phone || "N/A"}</div>
            </div>

            {/* Content Section */}
            <div className="col-md-8 p-3">
              {/* Toggle Buttons */}
              <div className="d-flex justify-content-center mb-4">
                <button
                  className={`tab-button ${activeTab === "Skill" ? "active" : ""}`}
                  onClick={() => setActiveTab("Skill")}
                >
                  Posted Services
                </button>
                <button
                  className={`tab-button ${activeTab === "ratings" ? "active" : ""}`}
                  onClick={() => setActiveTab("ratings")}
                >
                  Ratings & Reviews
                </button>
              </div>

              {/* Posted Services Section */}
              {activeTab === "Skill" && (
                <>
                  <h5 className="text-purple">Posted Services</h5>
                  <Accordion defaultActiveKey="0" className="mb-4">
                    {userData.Skill?.length > 0 ? (
                      userData.Skill.map((service, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                          <Accordion.Header>{service.skillName || "Unnamed Skill"}</Accordion.Header>
                          <Accordion.Body>
                            <p><strong>Description:</strong> {service.description || "No Description"}</p>
                            <p><strong>Category:</strong> {service.categoryName || "No Category"}</p>
                            <p><strong>Rate:</strong> {service.rate || "N/A"} hours/session</p>
                            <div className="d-flex justify-content-between">
                              <button onClick={() => handleBooking(service.skillName)} className="btn-warning">
                                Book
                              </button>
                              {service.demoVideoURL && (
                                <a href={`${baseUrl}/uploads/videos/${service.demoVideoURL}`} target="_blank" className="btn ">
                                  <span className="me-2">Watch demo</span>
                                  <i className="fa-solid fa-play" style={{ color: "#462061" }} />
                                </a>
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      ))
                    ) : (
                      <p className="text-muted">No services listed.</p>
                    )}
                  </Accordion>
                </>
              )}

              {/* Ratings & Reviews Section */}
              {activeTab === "ratings" && (
                <>
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <h5 className="text-purple">Ratings & Reviews</h5>
                    <Rating item={userData} />
                  </div>

                  <div className="reviews-section mt-3">
                    {userData.ratings?.length > 0 ? (
                      userData.ratings.map((review, index) => (
                        <div key={index} className="content-box">
                          <div className="d-flex justify-content-between">
                            <h6 className="text-purple">{review.reviewerId === sessionStorage.getItem("userId") ? "Me" : review.reviewerName}</h6>
                            {review.reviewerId === sessionStorage.getItem("userId") && (
                              <div>
                                <EditRating item={userData} item2={review} />
                                <button onClick={() => deleteRating(review.id)} className="btn-delete">
                                  <i className="fa-solid fa-trash" />
                                </button>
                              </div>
                            )}
                          </div>
                          <p><strong>Skill:</strong> {review.skill || "N/A"}</p>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} color={i < review.rating ? "#ffc107" : "#e4e5e9"} size={20} />
                            ))}
                          </div>
                          <p><strong>Review:</strong> {review.review || "No comment provided."}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No reviews available.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsWithToggle;
