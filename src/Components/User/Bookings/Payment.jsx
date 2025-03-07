import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { addTransactionDetails, getSpecificBookingDetails } from "../../../services/allApis";
import baseUrl from "../../../services/baseUrl";
import { toast } from "react-toastify";

const Payment = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [details, setDetails] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const getBookingDetails = async () => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    try {
      const res = await getSpecificBookingDetails(header, id);
      if (res.status === 200) {
        setDetails(res.data);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  useEffect(() => {
    getBookingDetails();
  }, []);

  const handleAddTransaction = async () => {
    if (!details) return;

    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    const transactionData = {
      serviceProviderId: details.serviceProvider._id,
      serviceProviderName: details.serviceProvider.userName,
      serviceReceiverId: details.booking.userId._id,
      serviceReceiverName: details.booking.userId.userName,
      skillId: details.skill._id,
      bookingId: details.booking._id,
      rate: details.skill.rate,
    };

    if (details.serviceReceiver.currency >= details.skill.rate) {
      try {
        const res = await addTransactionDetails(header, transactionData);
        toast.success("Booking Successful!");
        if (res.status === 200) {
          nav('/userdetails/user/mybookings');
        }
      } catch (error) {
        console.error("Error processing transaction:", error);
        toast.error("Error processing transaction!");
      }
    } else {
      setShowModal(true);
    }
  };

  if (!details) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm text-center">
            <h4 className="mb-4">Payment</h4>

            <div className="d-flex justify-content-center">
              <img
                src={details?.serviceProvider?.profile ? `${baseUrl}/uploads/${details?.serviceProvider?.profile}` : "https://cdn-icons-png.flaticon.com/512/17/17004.png"}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
            </div>

            <div className="border p-3 mb-3 bg-light rounded">
              <h5>Service Provider</h5>
              <p><strong>Name:</strong> {details?.serviceProvider?.userName}</p>
              <p><strong>Skill:</strong> {details?.skill?.skillName}</p>
              <p><strong>Time Required:</strong> {details?.skill?.rate} Hrs</p>
              <p><strong>Email:</strong> {details?.serviceProvider?.email}</p>
              <p><strong>Phone:</strong> {details?.serviceProvider?.phone}</p>
            </div>

            {details.booking.status === "completed" ? (
              <h2 className="text-success">Transaction Successfully Completed!!</h2>
            ) : (
              <div className="d-flex justify-content-center">
                <button className="btn btn-success me-2" onClick={handleAddTransaction}>
                  Confirm
                </button>
                <button className="btn btn-danger">Cancel</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Insufficient Balance</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>You don’t have enough currency/time balance to book this skill.</p>
                <p>Would you like to purchase more time?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => nav('/user/purchase-time')}>Purchase Time</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
