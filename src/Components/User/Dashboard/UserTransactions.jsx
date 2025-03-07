import React, { useEffect, useState } from "react";
import { viewAllTransactions } from "../../../services/allApis";

function UserTransactions() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [currencyBalance, setCurrencyBalance] = useState(0); 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const header = {
      "Content-type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("token")}`,
    };

    try {
      const res = await viewAllTransactions(header);
      console.log(res);
      if (res.status === 200) {
        setAllTransactions(res.data.transactions);
        setCurrencyBalance(res.data.currencyBalance);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4 text-purple">Transaction History</h3>

      <div className="row mb-4">
        <div className="col-md-12">
          <div
            className="card text-white"
            style={{
              background: "linear-gradient(135deg, #6a0dad, #a463f2)", 
              borderRadius: "12px",
              boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="card-body">
              <h5 className="card-title fw-bold">Hours Balance</h5>
              <p className="card-text fw-bold fs-4">
                {currencyBalance > 1 ? currencyBalance + " hrs" : currencyBalance + " hr"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead
            style={{
              backgroundColor: "#5a2a83",
              color: "#ffffff",
              borderRadius: "8px",
            }}
          >
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Skill</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {allTransactions.length > 0 ? (
              allTransactions.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#f8f1ff" : "#ffffff",
                    transition: "0.3s",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{sessionStorage.getItem("userId") === item.serviceProviderId ? "Me" : item.serviceProviderName}</td>
                  <td>{sessionStorage.getItem("userId") === item.serviceReceiverId ? "Me" : item.serviceReceiverName}</td>
                  <td>{new Date(item.transactionDateTime).toLocaleString()}</td>
                  <td>{item.skillName}</td>
                  <td className="fw-bold text-purple">{item.rate} hrs</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-danger fw-bold">
                  No Transactions Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTransactions;
