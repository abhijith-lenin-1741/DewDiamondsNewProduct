import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import Cookies from 'js-cookie';

function SkitchList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);
  const navigate = useNavigate();

  const API_URL =  window.url+"sketch";

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

  // Handle Edit
  const handleEdit = (customerId) => {
    navigate(`/edit/${customerId}`);
  };

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
              <h3 className="fw-bold mb-3">Sketch  List</h3>
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
                              <th>Sketch ID</th>
                              <th>Concept ID	</th>
                              <th>Request Sketch Count</th>
                              <th>Approved Sketchs Count</th>
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
                                <td>{row.selectedSketchCount}</td>
                                <td>
                                {row.status}
                                </td>
                                <td>
                          <div className="flex space-x-4">
                            {/* Edit Button - Blue Icon */}
                            <button 
                              onClick={() => handleEdit(row.id)} 
                              disabled={row.status !== "Pending"}
                              className={row.status !== "Pending" ? "opacity-50 cursor-not-allowed" : ""}
                            >
                              <FaEdit className="text-blue-500" size={20} />
                            </button> &nbsp; &nbsp; &nbsp;

                            {/* Delete Button - Red Icon */}
                            <button 
                              onClick={() => handleDelete(row.id)} 
                              disabled={row.status !== "Pending"}
                              className={row.status !== "Pending" ? "opacity-50 cursor-not-allowed" : ""}
                            >
                              <FaTrash className="text-red-500" size={20} />
                            </button>
                          </div>
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

export default SkitchList;
