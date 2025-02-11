import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import Cookies from 'js-cookie';

function SkitchApprovalList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:5000/api/v1/sketch";

  useEffect(() => {
    const savedToken = Cookies.get("authToken");
    if (!savedToken) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${API_URL}/getAllSketches`, {}, {
          headers: { Authorization: `Bearer ${savedToken}` },
        });
        
        const orders = response.data.data || [];
        setRows(orders);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleApprovalChange = async (id, value) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/sketch/updateSketchStatus",
        {
          sketchId: id,
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
  
      console.log(response.data); 
  
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
        "http://localhost:5000/api/v1/sketch/moveToCad",
        { sketchId: id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      console.log(response.data);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, sketchStatus: "cad" } : row
        )
      );
    } catch (error) {
      console.error("Error moving to Sketch:", error);
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
              <h3 className="fw-bold mb-3">Sketch Approval List</h3>
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
                              <th>Sketch No</th>
                              <th>Order ID</th>
                              <th>Request Sketch Count</th>
                              <th>Sketch Status</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row) => (
                              <tr key={row.id}>
                                <td>{row.sketchNo}</td>
                                <td>{row.orderId}</td>
                                <td>{row.reqSketchCount}</td>
                                <td>{row.sketchStatus}</td>
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
                                    {row.sketchStatus === "cad" ? "Moved to CAD" : "Move to Sketch"}
                                  </button>
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
export default SkitchApprovalList;