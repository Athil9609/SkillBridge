import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../user.css";
import { viewCategories } from "../../../services/allApis";

const SkillCategory = () => {
  const [categories, setCategories] = useState([]); // Original categories from API
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [filteredCategories, setFilteredCategories] = useState([]); // Filtered results based on search

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    // Apply filtering whenever categories or searchTerm changes
    const filtered = categories.filter((item) =>
      item.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchTerm]);

  const getCategories = async () => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };
    try {
      const res = await viewCategories(header);
      const data = res.data;
      console.log(data);
      if (res.status === 200) {
        setCategories(data); // Update original categories
        setFilteredCategories(data); // Initialize filtered categories
      } else {
        console.error("Failed to fetch categories:", res.status);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-purple">Categories of Skills/Services</h2>

      {/* Search Input */}
      <input
        type="text"
        className="form-control mb-4 text-center"
        placeholder="Enter category name to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        style={{
          borderRadius: "20px",
          border: "2px solid #6a0dad",
          padding: "10px",
          transition: "0.3s",
        }}
      />

      <div className="row">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
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
                  <h5 className="card-title fw-bold">{item.categoryName}</h5>
                  <Link
                    to={`/SkillsUsr/${item.categoryId}`}
                    className="btn btn-primary-custom"
                  >
                    View Skills
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2 className="text-center text-danger">No categories available</h2>
        )}
      </div>
    </div>
  );
};

export default SkillCategory;
