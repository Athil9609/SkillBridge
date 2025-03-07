import React, { useEffect, useState } from 'react';
import { getComplaintsAndFeedback, addAdminResponse } from '../../services/allApis';
import { toast } from 'react-toastify';

const ViewComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };

    const res = await getComplaintsAndFeedback(header, { type: "complaint" });
    console.log(res)

    if (res.status === 200) {
      setComplaints(res.data); // Store API response in state
    } else {
      console.error("Failed to fetch complaints");
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleRespond = async (id) => {
    const header = {
      'Content-type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`,
    };
    const data = { response: responses[id] };

    const res = await addAdminResponse(header, id, data);
    console.log(res)

    if (res.status === 200) {
      toast.success("Response added successfully");
      fetchComplaints();
    } else {
      console.error("Failed to add response");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User Complaints</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>User</th>
              <th>Complaint</th>
              <th>Date</th>
              <th>Response</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>{complaint.username}</td>
                  <td>{complaint.message}</td>
                  <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                  <td>{
                    complaint.adminResponse ?
                      complaint.adminResponse

                      :
                      <textarea
                        className="form-control"
                        placeholder="Type your response..."
                        value={responses[complaint._id] || ""}
                        onChange={(e) => handleResponseChange(complaint._id, e.target.value)}
                      ></textarea>
                  }

                  </td>
                  <td>
                    <td>
                      {complaint.adminResponse ? (
                        <button className="btn btn-success" disabled>Responded</button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleRespond(complaint._id)}
                        >
                          Respond
                        </button>
                      )}
                    </td>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">No complaints available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewComplaints;
