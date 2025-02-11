import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import axios from 'axios';
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import Cookies from 'js-cookie';


function EditCad() {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [cadNo, setCadNo] = useState("");
    const [orderId, setOrderId] = useState("");
    const [reqCadCount, setReqCadCount] = useState("");
    const [selectedCadCount, setSelectedCadCount] = useState("");
    const [cadCompletedDate, setCadCompletedDate] = useState("");
    const [promiseDate, setPromiseDate] = useState("");
    const [specialInstruction, setSpecialInstruction] = useState("");

    const API_URL = `http://localhost:5000/api/v1/cad/getCadById/${customerId}`;

    useEffect(() => {
        
        const savedToken = Cookies.get("authToken");

        if (!savedToken) {
            navigate("/");
            return;
        }

        const fetchCustomers = async () => {
            try {
                const response = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                });

                const customerData = response.data.data || {};
               
                setCadNo(customerData.cadNo || "");
                setOrderId(customerData.orderId || "");
                setReqCadCount(customerData.reqCadCount || "");
                setSelectedCadCount(customerData.selectedCadCount || "");
                setCadCompletedDate(customerData.cadCompletedDate || "");
                setPromiseDate(customerData.promiseDate || "");
                setSpecialInstruction(customerData.specialInstruction || "")

            } catch (err) {
                setError("Failed to fetch customer data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomers();
    }, [navigate, customerId]); // Added customerId dependency

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const savedToken = Cookies.get("authToken");

            if (!savedToken) {
                alert("Authorization token not found.");
                return;
            }

            const response = await axios.put(
                `http://localhost:5000/api/v1/cad/updateCad/${customerId}`,
                {
                    cadNo,
                    orderId,
                    reqCadCount,
                    selectedCadCount,
                    cadCompletedDate,
                    promiseDate,
                    specialInstruction
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Cad Updated: " + JSON.stringify(response.data));
            navigate("/cadlist");
        } catch (error) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
                alert("Error updating customer: " + JSON.stringify(error.response.data));
            } else {
                console.error("Error Message:", error.message);
                alert("Error updating customer.");
            }
        }
    };

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <SideBar />

      {/* Main Panel */}
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">CAD Edit</h3>
              <ul className="breadcrumbs mb-3">
                <li className="separator">
                  <i className="icon-arrow-right"></i>
                </li>
                <li className="nav-item">
                  <a>PD/Concept</a>
                </li>
                <li className="separator">
                  <i className="icon-arrow-right"></i>
                </li>
                <li className="nav-item">
                  <a href="#">Create Order</a>
                </li>
              </ul>
            </div>

            {/* Order Form */}
            <div className="row">
              {/* Customer Selection */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="customerSelect">Cad Number</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="emailInput"
                    value={cadNo}
                    onChange={(e) => setCadNo(e.target.value)}
                    placeholder="Enter Cad Number"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="emailInput">OrderId</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="emailInput"
                    value={orderId} 
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter OrderId"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              {/* Mobile Input */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="mobileInput">Required Cad Count</label>
                  <input
                    
                    type="text" 
                    className="form-control"
                    id="mobileInput"
                    value={reqCadCount}
                    onChange={(e) => setReqCadCount(e.target.value)}
                    placeholder="Enter Required Cad Count"
                  />
                </div>
              </div>

              {/* Customer Code Input */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="customerCodeInput">Selected Cad Count</label>
                  <input
                  
                    type="text" 
                    className="form-control"
                    id="customerCodeInput"
                    value={selectedCadCount}
                    onChange={(e) => setSelectedCadCount(e.target.value)}
                    placeholder="Enter Selected Cad Count"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              {/* Date Input */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="dateInput">Promise Date</label>
                  <input
                    
                    type="datetime-local" 
                    className="form-control"
                    id="dateInput"
                    value={promiseDate} 
                    onChange={(e) => setPromiseDate(e.target.value)}
                    placeholder="Enter Promise Date"
                  />
                </div>
              </div>

              {/* Promised Date Input */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="promisedDateInput">Cad Completed Date</label>
                  <input
                    type="datetime-local" 
                    className="form-control"
                    id="promisedDateInput"
                    value={cadCompletedDate}
                    onChange={(e) => setCadCompletedDate(e.target.value)}
                    placeholder="Enter Cad Completed Date"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Special Instructions</label>
              <textarea className="form-control" id="comment" rows="5"></textarea>
            </div>
            
            {/* Action Buttons */}
              <br></br>
            <div className="card-action">
              <center>
              <button className="btn btn-success" onClick={handleSubmit}>Submit</button> &nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger">Cancel</button>
              </center>
            
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default EditCad