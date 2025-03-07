import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { purchaseTime, updateCurrency } from "../../../services/allApis";
import { toast } from "react-toastify";

const TimePurchase = () => {
  const navigate = useNavigate();
  const [hours, setHours] = useState("");
  const ratePerHour = 10;
  const amount = hours * ratePerHour * 100; 

  var flag=false

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (hours <= 0) {
      toast.warn("Please enter a valid number of hours.");
      return;
    }

    try {
      const header = {
        "Content-type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      };

      const data = { amount, currency: "INR" };
      const res = await purchaseTime(data, header);
      console.log("API Response:", res.data); 

      if (!res.data || !res.data.order.id) {
        toast.warn("Order creation failed. Please try again.");
        return;
      }


      var options = {
        key: "rzp_test_PKqKczXVAOsYdp",
        amount: res.data.order.amount, 
        currency: "INR",
        name: "SkillBridge",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.data.order.id, 
        handler: async function (response) {
          toast.success("Payment Successful!");
          console.log("Payment ID:", response.razorpay_payment_id);
          console.log("Order ID:", response.razorpay_order_id);
          console.log("Signature:", response.razorpay_signature);
          console.log(response)
          if(response.razorpay_payment_id){

            const id=sessionStorage.getItem("userId")

            const data={id,hours}
          
            const res=await updateCurrency(data)
            console.log(res)
            if (res.status === 200) {
                navigate('/userdetails/user/mybookings')
                toast.success(`${hours} hrs added to your balance`);

                
            } else {
                toast.error("Currency update failed!");
            }
            
          }

        },
        prefill: {
          name: sessionStorage.getItem("uname"),
          email: sessionStorage.getItem("mail"),
          contact: sessionStorage.getItem("ph"),
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        toast.error("Payment Failed. Please try again.");
        console.log(response.error);
      });


      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong! Please try again.");
    }


  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={styles.background}>
      <div className="card p-4 text-center shadow-lg" style={styles.card}>
        <h2 className="mb-4" style={styles.title}>Purchase Time</h2>

        <div className="form-group">
          <label htmlFor="hours" className="fw-bold">Enter Hours:</label>
          <input
            type="number"
            id="hours"
            className="form-control text-center mt-2"
            value={hours}
            min="1"
            onChange={(e) => setHours(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <h5 className="mt-3">Rate per Hour: <span className="fw-bold text-success">₹{ratePerHour}</span></h5>
        <h4 className="mt-2" style={styles.amount}>Total Cost: <span className="fw-bold">₹{amount / 100}</span></h4>

        <div className="mt-4">
          <button className="btn btn-success me-2 px-4 py-2" onClick={paymentHandler} style={styles.button} disabled={hours <= 0}>
            Buy Now
          </button>
          <button className="btn btn-outline-danger px-4 py-2" onClick={() => navigate(-1)}>{flag?"goback":"cancel"}</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    background: "linear-gradient(135deg, rgb(212, 203, 203), rgb(131, 126, 124))",
    minHeight: "100vh",
  },
  card: {
    width: "400px",
    borderRadius: "15px",
    backdropFilter: "blur(10px)",
    background: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    fontSize: "18px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  amount: {
    color: "#2b2b2b",
    fontWeight: "bold",
  },
  button: {
    fontSize: "18px",
    fontWeight: "bold",
    transition: "0.3s ease-in-out",
  },
};

export default TimePurchase;
