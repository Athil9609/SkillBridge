import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUsersBySkill } from "../../../services/allApis";
import "../user.css"; // Ensure styles are applied

const SkillDetails = () => {
  const { skillname } = useParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [expertiseFilter, setExpertiseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getUserList();
  }, [skillname]);

  const getUserList = async () => {
    const res = await getUsersBySkill(skillname);
    if (res.status === 200) {
      const filtered = res.data.filter(
        (item) => item._id !== sessionStorage.getItem("userId")
      );
      setUsers(filtered);
      setFilteredUsers(filtered);
    }
  };

  const handleFilterChange = (e) => {
    setExpertiseFilter(e.target.value);
    filterUsers(e.target.value, searchTerm);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterUsers(expertiseFilter, e.target.value);
  };

  const filterUsers = (expertise, search) => {
    let filtered = users;

    if (expertise) {
      filtered = filtered.filter((user) => user.expertise === expertise);
    }
    if (search) {
      filtered = filtered.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-purple fw-bold">
        Find Skilled Service Providers
      </h2>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control mb-3 text-center"
            placeholder="Search by Name..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              borderRadius: "25px",
              border: "2px solid #6a0dad",
              padding: "12px",
              transition: "0.3s",
            }}
          />
        </div>
        <div className="col-md-6">
          <select
            name="expertise"
            className="form-control text-center"
            value={expertiseFilter}
            onChange={handleFilterChange}
            style={{
              borderRadius: "25px",
              border: "2px solid #6a0dad",
              padding: "12px",
              transition: "0.3s",
            }}
          >
            <option value="">All Expertise Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>

      <h2 className="text-center mb-4 text-purple fw-bold">
        {skillname} Service Providers
      </h2>

      {/* Service Provider Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((item) => (
            <div className="col" key={item._id}>
              <div
                className="card h-100 text-center shadow-sm"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.userName}</h5>
                  <p className="card-text">
                    <strong>📞 Phone:</strong> {item.phone}
                    <br />
                    <strong>📧 Email:</strong> {item.email}
                    <br />
                    <strong>⭐ Expertise:</strong> {item.expertise}
                  </p>
                  <Link
                    to={`/userdetails/${item._id}`}
                    className="btn btn-primary-custom"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center text-danger mt-3">
            No service providers found.
          </h4>
        )}
      </div>
    </div>
  );
};

export default SkillDetails;
