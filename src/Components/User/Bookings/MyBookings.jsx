import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyBookings,updateBookingStatus } from "../../../services/allApis";


const MyBookings = () => {
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };
    const res = await getMyBookings(header);

    if (res.status === 200) {
      setBookingDetails(res.data);
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

  return (
    <div className="my-bookings">
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Service</th>
            <th>ServiceProvider</th>
            <th>Date / Time</th>
            <th>Status</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookingDetails.length > 0 ? (
            bookingDetails.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.skillName}</td>
                <td>{item.serviceProviderId?.userName || "N/A"}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === "pending"
                        ? "bg-warning text-dark"
                        : item.status === "confirmed"
                        ? "bg-success"
                        : item.status === "completed"
                        ? "bg-primary"
                        : item.status === "cancelled"
                        ? "bg-danger"
                        : item.status === "rejected"
                        ? "bg-secondary"
                        : "bg-dark"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.serviceProviderId.phone}</td>
                <td>
                  {item.status === "pending" ? (
                    <>
                      <span className="text-muted me-2">Booking not accepted yet</span>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleBookingUpdates(item,"cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  ) : item.status === "confirmed" ? (
                    <>
                      <Link to={`/user/payment/${item._id}`} className="btn btn-dark btn-sm me-2">
                        Click here to pay
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleBookingUpdates(item,"cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  ) : item.status === "completed" ? (
                    <Link to={`/user/payment/${item._id}`} className="btn btn-info btn-sm">View Details</Link>
                  ) : item.status === "cancelled" ? (
                    <span className="text-danger">Booking Cancelled</span>
                  ) : (
                    <span className="text-secondary">No Actions</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
