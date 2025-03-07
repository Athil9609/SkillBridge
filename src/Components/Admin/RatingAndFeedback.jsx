import React, { useEffect, useState } from 'react';
import { getComplaintsAndFeedback } from '../../services/allApis';
import './admin.css'; 

const RatingAndFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    try {
      const res = await getComplaintsAndFeedback(header, { type: "feedback" });

      if (res.status === 200) {
        setFeedbacks(res.data || []); 
      } else {
        console.error("Failed to fetch feedback");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-purple">Ratings and Feedback</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped feedback-table">
          <thead className="thead-purple">
            <tr>
              <th>User</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback.username || 'N/A'}</td>
                  <td className="rating-cell">
                    <span className="rating-badge">{feedback.rating || 'N/A'}</span>
                  </td>
                  <td>{feedback.message || 'No message provided'}</td>
                  <td>{feedback.createdAt ? new Date(feedback.createdAt).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted no-feedback">
                  No feedback available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingAndFeedback;
