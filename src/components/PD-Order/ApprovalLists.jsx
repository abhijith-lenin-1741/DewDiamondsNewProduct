import { useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import ApprovalListTable from "./ApprovalListTable";

const ApprovalLists = () => {
  const sideBarState = useSelector(state => state?.sidebar?.sideBar)
  const [approvalStatus, setApprovalStatus] = useState("Approved");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
    customer: "",
    orderId: "",
  });

  const handleFilterChange = (e) => {
    debugger;
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className={`wrapper ${sideBarState ? "sidebar_minimize" : ""}`}>
        {/* Sidebar */}
        <SideBar />
        {/* End Sidebar */}
        <div className="main-panel">
          <Header />
          <div className="container">
            <div className="page-inner">
              <div className="page-header">
                <h3 className="fw-bold mb-3">Approval Lists</h3>
                <ul className="breadcrumbs mb-3">
                  <li className="nav-home">
                    <a href="#">
                      <i className="icon-home"></i>
                    </a>
                  </li>
                  <li className="separator">
                    <i className="icon-arrow-right"></i>
                  </li>
                  <li className="nav-item">
                    <a href="#">PD/Concept</a>
                  </li>
                  <li className="separator">
                    <i className="icon-arrow-right"></i>
                  </li>
                  <li className="nav-item">
                    <a href="#">Approval Lists</a>
                  </li>
                </ul>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body filter-section">
                      <div className="row g-3 align-items-end">
                        {/* Start Date */}
                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column">
                          <label className="filter-labels">Start Date</label>
                          <DatePicker
                            selected={
                              filters.startDate && new Date(filters.startDate)
                            }
                            onChange={(date) =>
                              setFilters({
                                ...filters,
                                startDate:
                                  date?.toISOString().split("T")[0] || "",
                              })
                            }
                            className="form-control w-100"
                            placeholderText="Select Start Date"
                            dateFormat="yyyy-MM-dd"
                          />
                        </div>

                        {/* End Date */}
                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column">
                          <label className="filter-labels">End Date</label>
                          <DatePicker
                            selected={
                              filters.endDate && new Date(filters.endDate)
                            }
                            onChange={(date) =>
                              setFilters({
                                ...filters,
                                endDate:
                                  date?.toISOString().split("T")[0] || "",
                              })
                            }
                            className="form-control w-100"
                            placeholderText="Select End Date"
                            dateFormat="yyyy-MM-dd"
                          />
                        </div>

                        {/* Status */}
                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column">
                          <label className="filter-labels">
                            Search by Status
                          </label>
                          <select
                            className="form-control w-100"
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                          >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                          </select>
                        </div>

                        {/* Customer */}
                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column">
                          <label className="filter-labels">
                            Search by Customer
                          </label>
                          <input
                            type="text"
                            className="form-control w-100"
                            name="customer"
                            placeholder="Enter customer name"
                            value={filters.customer}
                            onChange={handleFilterChange}
                          />
                        </div>

                        {/* Sketcher Name */}
                        <div className="col-lg-3 col-md-4 col-sm-6 d-flex flex-column">
                          <label className="filter-labels">
                            Search by Order ID
                          </label>
                          <input
                            type="text"
                            className="form-control w-100"
                            name="orderId"
                            placeholder="Enter order id"
                            value={filters.orderId}
                            onChange={handleFilterChange}
                          />
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
                      <div className="table-responsive">
                        <table
                          id="basic-datatables"
                          className="display table table-striped table-hover"
                        >
                          <thead>
                            <tr>
                              <th>Concept Id</th>
                              <th>Date</th>
                              <th>Customer</th>
                              <th>Category</th>
                              <th>Promised Date</th>
                              <th>Approval</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <ApprovalListTable />
                            <ApprovalListTable />
                            <ApprovalListTable />
                            <ApprovalListTable />

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ApprovalLists;
