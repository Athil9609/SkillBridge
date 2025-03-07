import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewSkills } from "../../../services/allApis";
import "../user.css"; // Ensure styles are applied

const ViewSkills = () => {
  const [skills, setSkills] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const params = useParams();
  const categoryid = params.id;
  console.log(categoryid);

  // Fetch skills from the API
  const getSkills = async () => {
    try {
      const res = await viewSkills(categoryid);
      if (res.status === 200) {
        const data = res.data;
        setSkills(
          data.filter(
            (item, index) =>
              data.findIndex((s) => s.skillName === item.skillName) === index
          ) // Remove duplicates
        );
        setCategoryName(data[0]?.categoryName || ""); // Handle empty data
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-purple">Skills in {categoryName}</h2>

      {/* Search Input */}
      <input
        type="text"
        className="form-control mb-4 text-center"
        placeholder="Search skills..."
        style={{
          borderRadius: "20px",
          border: "2px solid #6a0dad",
          padding: "10px",
          transition: "0.3s",
        }}
      />

      <div className="row">
        {skills.length > 0 ? (
          skills.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="card text-center"
                style={{
                  borderRadius: "10px",
                  boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.skillName}</h5>
                  <p className="card-text">{item.description}</p>
                  <Link to={`/SkillsDetailsUsr/${item.skillName}`} className="btn btn-primary-custom">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-danger">No Skills available!</h2>
        )}
      </div>
    </div>
  );
};

export default ViewSkills;
