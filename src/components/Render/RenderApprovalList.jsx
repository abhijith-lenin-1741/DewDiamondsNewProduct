import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';

import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import Cookies from 'js-cookie';
import {
    FaEdit,
    FaTrash,
    FaEllipsisV,
    FaChevronLeft,
    FaChevronRight,
  } from "react-icons/fa";

function RenderApprovalList() {
    const [rows, setRows] = useState([]);
        const [filteredRows, setFilteredRows] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [activeRowId, setActiveRowId] = useState(null);
        const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 5;
        const navigate = useNavigate();
      
        // Filters State
        const [promiseStartDate, setPromiseStartDate] = useState("");
        const [promiseEndDate, setPromiseEndDate] = useState("");
        const [completedStartDate, setCompletedStartDate] = useState("");
        const [completedEndDate, setCompletedEndDate] = useState("");
        const [statusFilter, setStatusFilter] = useState("");

        const handleApprovalChange = async (id, value) => {
            try {
              const response = await axios.put(
                "http://localhost:5000/api/v1/render/updateRenderStatus",
                {
                  renderId: id,
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
        
          const handleMoveToDesign = async (id) => {
            try {
              const response = await axios.put(
                "http://localhost:5000/api/v1/render/updateRenderStatusToDesign",
                { renderId: id },
                {
                  headers: {
                    Authorization: `Bearer ${Cookies.get("authToken")}`,
                  },
                }
              );
              console.log(response.data); // Log response from server
              setRows((prevRows) =>
                prevRows.map((row) =>
                  row.id === id ? { ...row, renderStatus: "design" } : row // Update the sketchStatus to 'cad' after moving
                )
              );
            } catch (error) {
              console.error("Error moving to Sketch:", error);
            }
          };


          const API_URL =  window.url+"render/getAllRenders";

          useEffect(() => {
            const savedToken = Cookies.get("authToken");
            if (!savedToken) {
                navigate("/"); // Redirect if no auth token
                return;
            }
        
            const fetchOrders = async () => {
                try {
                    const response = await axios.post(
                        API_URL, 
                        {},  // Empty object for POST body (modify if API requires specific parameters)
                        {
                            headers: {
                                Authorization: `Bearer ${savedToken}`,
                            },
                        }
                    );
        
                    console.log("Full API Response:", response); // Debugging
                    console.log("API Data:", response.data); // Log data field
        
                    if (!response.data || !response.data.data) {
                        throw new Error("Invalid API response structure");
                    }
        
                    const orders = response.data.data;
                    
                    setRows(response.data.data || []);
                } catch (err) {
                    setError(`Failed to fetch Order data: ${err.response?.data?.message || err.message}`);
                    console.error("API Fetch Error:", err.response?.data || err.message);
                } finally {
                    setLoading(false);
                }
            };
        
            fetchOrders();
        }, [navigate]);
   useEffect(() => {
         let updatedRows = rows;
         if (promiseStartDate && promiseEndDate) {
           updatedRows = updatedRows.filter(row => row.promiseDate >= promiseStartDate && row.promiseDate <= promiseEndDate);
         }
         if (completedStartDate && completedEndDate) {
           updatedRows = updatedRows.filter(row => row.cadCompletedDate >= completedStartDate && row.cadCompletedDate <= completedEndDate);
         }
         if (statusFilter) {
           updatedRows = updatedRows.filter(row => row.status === statusFilter);
         }
         setFilteredRows(updatedRows);
       }, [promiseStartDate, promiseEndDate, completedStartDate, completedEndDate, statusFilter, rows]);
     
       const indexOfLastRow = currentPage * rowsPerPage;
       const indexOfFirstRow = indexOfLastRow - rowsPerPage;
       const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
     
       const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
       const paginate = (pageNumber) => setCurrentPage(pageNumber);     
  return (
    <div className="wrapper">
    <SideBar pageName="userrolePermissions" />
    <div className="main-panel">
      <Header />
      <div className="container">
        <div className="page-inner">
          <div className="page-header">
            <h3 className="fw-bold mb-3">Render Approval List</h3>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body filter-section">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                      <label>Promise Date (Start)</label>
                      <input type="date" className="form-control" value={promiseStartDate} onChange={(e) => setPromiseStartDate(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                      <label>Promise Date (End)</label>
                      <input type="date" className="form-control" value={promiseEndDate} onChange={(e) => setPromiseEndDate(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                      <label>Completed Date (Start)</label>
                      <input type="date" className="form-control" value={completedStartDate} onChange={(e) => setCompletedStartDate(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                      <label>Completed Date (End)</label>
                      <input type="date" className="form-control" value={completedEndDate} onChange={(e) => setCompletedEndDate(e.target.value)} />
                    </div>
                    <div className="col-md-3">
                      <label>Status</label>
                      <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="In Progress">In Progress</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  {loading ? (
                    <p>Loading orders...</p>
                  ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                  ) : (
                    <>
                      <div className="table-responsive">
                        <table className="display table table-striped table-hover relative">
                          <thead>
                            <tr>
                              <th>Render ID</th>
                              
                              <th>Concept ID</th>
                              <th>Required Render Count</th>
                              <th>Image</th>
                              <th>Sketcher</th>
                             
                             
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRows.map((row) => (
                              <React.Fragment key={row.id}>
                                {activeRowId === row.id && (
                                  <tr className="absolute w-full bg-gray-100 border-b border-gray-300">
                                    <td colSpan="11" className="p-2">
                                      <div className="flex justify-between px-4" >
                                        <button
                                        
                                          onClick={() => handleEdit(row.id)}
                                          disabled={row.status !== "Pending"}
                                          className="p-2 rounded-md flex items-center bg-blue-500 text-white hover:bg-blue-600"
                                        >
                                          <FaEdit />
                                        </button>{" "}
                                        &nbsp;
                                        <button
                                         
                                          onClick={() => handleDelete(row.id)}
                                          disabled={row.status !== "Pending"}
                                          className="p-2 rounded-md flex items-center bg-red-500 text-white hover:bg-red-600"
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                                <tr>
                                  <td>{row.id}</td>
                                 
                                  <td>{row.orderId}</td>
                                  <td>{row.reqRenderCount}</td>
                                  <td>"null"</td>
                                  <td>Vishnu</td>
                                  <td>0</td>
                                  
                                 
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
                                    onClick={() => handleMoveToDesign(row.id)} 
                                    disabled={row.renderStatus === "design" || row.status !== "Approved"} 
                                    className={`btn btn-sm ${row.renderStatus === "design" ? "btn-secondary" : row.status === "Approved" ? "btn-success" : "btn-secondary"}`}
                                  >
                                    {row.renderStatus === "design" ? "Moved to Design" : "Move to Design"}
                                  </button>
                                </td>
                          
                        </td>


                                </tr>
                              </React.Fragment>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="w-full flex justify-end pr-4 " style={{
                        display: "flex",
                        justifyContent:"flex-end"
                      }}>
                        <div className="pagination flex space-x-2 mt-4">
                          <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded-md bg-gray-500 text-white hover:bg-gray-600"
                          >
                            <FaChevronLeft />
                          </button>
                          {[...Array(totalPages).keys()].map((num) => (
                            <button
                              key={num}
                              onClick={() => paginate(num + 1)}
                              className={`px-3 py-1 border rounded-md ${
                                currentPage === num + 1
                                  ? "bg-gray-600 text-white"
                                  : "bg-gray-300"
                              }`}
                            >
                              {num + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded-md bg-gray-500 text-white hover:bg-gray-600"
                          >
                            <FaChevronRight />
                          </button>
                        </div>
                      </div>
                    </>
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

export default RenderApprovalList