import React, { useEffect, useState } from "react";
import { getMyRatings } from "../../../services/allApis";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const header = {
      "Content-type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };
    const res = await getMyRatings(header);
    console.log(res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4 text-purple">User Reviews</h3>

      {data.length > 0 ? (
        data.map((item, index) => (
          <div
            key={index}
            className="border p-4 mb-4 rounded shadow-sm"
            style={{
              backgroundColor: "#f4e8ff", 
              border: "2px solid #5a2a83", 
              borderRadius: "10px",
            }}
          >
            <h5 className="mb-2 text-dark">{item.addedBy}</h5>
            <p className="mb-1">
              <strong>Skill:</strong> <span className="text-purple">{item.skill}</span>
            </p>
            <p className="mb-1">
              <strong>Rating: </strong>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < item.rating ? "#ffbf00" : "#e4e5e9"} 
                  size={20}
                />
              ))}
            </p>
            <p className="mb-0">
              <strong>Review: </strong>
              <span className="text-dark">{item.review}</span>
            </p>
          </div>
        ))
      ) : (
        <h2 className="text-center text-danger">No Reviews Available!!</h2>
      )}
    </div>
  );
};

export default Reviews;
