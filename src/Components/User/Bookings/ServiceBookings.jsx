import React, { useEffect, useState } from "react";
import { getOthersBookings, updateBookingStatus } from "../../../services/allApis";
import { Link } from "react-router-dom";

function ServiceBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };
    const res = await getOthersBookings(header);
    console.log(res)

    if (res.status === 200) {
      setBookings(res.data);
    }
  };

  const handleBookingUpdates=async(data,status)=>{
    const updatedData={
      ...data,status:status
    }
    // console.log(updatedData)
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };
const res=await updateBookingStatus(header,updatedData)

console.log(res)
if(res.status==200){
  getData()
}
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning text-dark"; 
      case "confirmed":
        return "bg-success";
      case "completed":
        return "bg-primary"; 
      case "cancelled":
        return "bg-danger"; 
      case "rejected":
        return "bg-secondary"; 
      default:
        return "bg-dark"; 
    }
  };

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Service</th>
              <th>Client Name</th>
              <th>Date / Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {bookings.length > 0 ? (
    bookings
      .filter((item) => item.status !== "cancelled") // Exclude cancelled bookings
      .map((item, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.skillName}</td>
          <td>{item.userId?.userName || "N/A"}</td>
          <td>{new Date(item.createdAt).toLocaleString()}</td>
          <td>
            <span className={`badge ${getStatusBadge(item.status)}`}>
              {item.status}
            </span>
          </td>
          <td>
            {item.status === "pending" && (
              <>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleBookingUpdates(item, "confirmed")}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingUpdates(item, "rejected")}
                >
                  Reject
                </button>
              </>
            )}
            {item.status === "confirmed" && (
              <button
                className="btn btn-warning btn-sm"
                onClick={() => handleBookingUpdates(item, "rejected")}
              >
                Reject
              </button>
            )}
          {item.status === "completed" && (
                        <Link to={`/userdetails/${item.userId?._id}`} className="btn btn-primary btn-sm">
                          View User
                        </Link>
                      )}
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="6" className="text-center text-danger">
        No bookings available
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}

export default ServiceBookings;
