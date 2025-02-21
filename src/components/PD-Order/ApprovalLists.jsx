import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';

import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import Cookies from 'js-cookie';
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ApprovalLists = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();

  // Filters State
  const [promiseStartDate, setPromiseStartDate] = useState("");
  const [promiseEndDate, setPromiseEndDate] = useState("");
  const [completedStartDate, setCompletedStartDate] = useState("");
  const [completedEndDate, setCompletedEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Check if window.url is defined
  if (!window.url) {
    console.error("window.url is not defined. Make sure it's set globally.");
  }

  const API_URL = window.url ? window.url + "order/getAllOrders" : "";

  const handleApprovalChange = async (id, value) => {
    try {
      const response = await axios.put(
        `${window.url}order/updateOrderStatus`,
        { orderId: id, status: value },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", response.data);
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, status: value } : row
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error.response?.data || error.message);
    }
  };

  const handleMoveToSkitch = async (id) => {
    try {
      const apiUrl = `${window.url}order/sketchStatus`;
      console.log("Sending request to:", apiUrl);
      console.log("Request Payload:", { orderId: id });

      const response = await axios.put(
        apiUrl,
        JSON.stringify({ orderId: id }),
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Move to Sketch Response:", response.data);
    } catch (error) {
      console.error("Error moving to Sketch:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const savedToken = Cookies.get("authToken");
    if (!savedToken) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.post(API_URL, {}, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        const orders = response.data.data || [];
        setRows(orders);
      } catch (err) {
        setError("Failed to fetch Order data.");
        console.error(err);
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
            <h3 className="fw-bold mb-3">PD Approval List</h3>

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
                      <th style={{whiteSpace:"nowrap"}}>Concept ID</th>
                      <th style={{whiteSpace:"nowrap"}}>Customer Name</th>
                      <th style={{whiteSpace:"nowrap"}}>Order Date</th>
                      <th>Category</th>
                      <th style={{whiteSpace:"nowrap"}}>Promise Date</th>
                      <th>Status</th>
                      <th style={{whiteSpace:"nowrap"}}>Order Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.orderNo}</td>
                        <td>{row.customerName}</td>
                        <td>{row.orderDate}</td>
                        <td>{row.categoryName}</td>
                        <td>{row.promiseDate}</td>
                        <td>{row.status}</td>
                        <td>{row.orderStatus}</td>
                        <td style={{ whiteSpace: "nowrap", minWidth: "150px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <select
                            value={row.status}
                            onChange={(e) => handleApprovalChange(row.id, e.target.value)}
                            className="form-select"
                            disabled={row.status === "Approved"}
                            style={{ minWidth: "120px" }}
                          >
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <button 
                            onClick={() => handleMoveToSkitch(row.id)} 
                            disabled={row.orderStatus === "Sketch" || row.status !== "Approved"} 
                            className={`btn btn-sm ${row.orderStatus === "Sketch" ? "btn-secondary" : row.status === "Approved" ? "btn-success" : "btn-secondary"}`}
                            style={{ minWidth: "130px" }}
                          >
                            {row.orderStatus === "Sketch" ? "Moved to Sketch" : "Move to Sketch"}
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApprovalLists;
