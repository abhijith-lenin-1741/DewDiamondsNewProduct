import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import Cookies from 'js-cookie';

function CadApprovalList() {
    const API_URL = "http://localhost:5000/api/v1/cad/getAllCads";
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleApprovalChange = async (id, value) => {
        try {
          const response = await axios.put(
            "http://localhost:5000/api/v1/cad/updateCadStatus",
            {
              cadId: id,
              status: value,
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("authToken")}`,
              },
            }
          );
      
          console.log(response.data); // Log response from server
      
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, status: value } : row
            )
          );
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      };
    
      const handleMoveToSkitch = async (id) => {
        try {
          const response = await axios.put(
            "http://localhost:5000/api/v1/cad/moveToRender",
            { cadId: id ,
              isRender:true
            },
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("authToken")}`,
              },
            }
          );
          console.log(response.data); // Log response from server
          setRows((prevRows) =>
            prevRows.map((row) =>
              row.id === id ? { ...row, isRender: true } : row // Update the sketchStatus to 'cad' after moving
            )
          );
        } catch (error) {
          console.error("Error moving to Render:", error);
        }
      };
    

    useEffect(() => {
    const savedToken = Cookies.get("authToken");
    if (!savedToken) {
      navigate("/"); // Redirect if no auth token
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        });
    
        console.log("API Response:", response.data); // Debug API Response
    
        const orders = response.data.data || [];
        
    
        setRows(orders);
      } catch (err) {
        setError(`Failed to fetch Order data: ${err.message}`);
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchOrders();
  }, [navigate]);

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API_URL}/updateSketch`, editData, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      setRows(rows.map(row => (row.id === editData.id ? editData : row)));
      setEditData(null);
    } catch (error) {
      console.error("Error updating sketch:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteSketch/${id}`, {
        headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
      });
      setRows(rows.filter(row => row.id !== id));
    } catch (error) {
      console.error("Error deleting sketch:", error);
    }
  };

  return (
    <div className="wrapper">
      <SideBar pageName="userrolePermissions" />
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">CAD Approval List</h3>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    {loading ? (
                      <p>Loading orders...</p>
                    ) : error ? (
                      <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="display table table-striped table-hover">
                          <thead>
                            <tr>
                            <th>ID</th>
                              <th>Cad ID</th>
                              <th>Concept ID</th>

                              <th>Req.Cad Count
                              	</th>
                                  <th>Image
                              	</th>
                              
                              <th>Promise Date</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row) => (
                              <tr key={row.id}>
                                 <td>{row.id}</td>
                                <td>{row.cadNo}</td>
                                <td>{row.orderId}</td>
                                <td>{row.reqCadCount}</td>
                                <td>"null"</td>
                                <td>{row.promiseDate}</td>
                                <td>{row.status}</td>
                               
                                <td>
                                <td>
                                  <select
                                    value={row.status}
                                    onChange={(e) => handleApprovalChange(row.id, e.target.value)}
                                    className="form-select"
                                    disabled={row.status === "Approved"}
                                  >
                                    <option value="Approved">Approved</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Initiated">Initiated</option>
                                  </select>
                                </td>
                               
                                <td>
                                  <button 
                                    onClick={() => handleMoveToSkitch(row.id)} 
                                    disabled={row.sketchStatus === "cad" || row.status !== "Approved"} 
                                    className={`btn btn-sm ${row.sketchStatus === "cad" ? "btn-secondary" : row.status === "Approved" ? "btn-success" : "btn-secondary"}`}
                                  >
                                    {row.sketchStatus === "cad" ? "Moved to Render" : "Move to Render"}
                                  </button>
                                </td>
                          
                        </td>



                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CadApprovalList