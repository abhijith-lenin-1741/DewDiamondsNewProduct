import Footer from "../Footer";
import Header from "../Header";
import SideBar from "../SideBar";
import { useState } from "react";
import { FaEye, FaEllipsisV } from "react-icons/fa";
import SketchListTable from "./SketchListTable";

const SketchList = () => {
  return (
    <div className="wrapper">
      <SideBar />
      <div className="main-panel">
        <Header />
        <div className="container">
          <div className="page-inner">
            <div className="page-header">
              <h3 className="fw-bold mb-3">Sketches Lists</h3>
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
                  <a href="#">Sketches</a>
                </li>
                <li className="separator">
                  <i className="icon-arrow-right"></i>
                </li>
                <li className="nav-item">
                  <a href="#">Lists</a>
                </li>
              </ul>
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
                            <th></th> {/* Eye Icon Column */}
                            <th>Sketch Id</th>
                            <th>Date</th>
                            <th>Images</th>
                            <th>Concept ID</th>
                            <th>Required Count</th>
                            <th>Pending Sketches</th>
                            <th>Sketcher Name</th>
                            <th>Status</th>
                            <th>Initiated Date</th>
                            <th>Days in Sketched</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <SketchListTable />
                          </tr>
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
  );
};

export default SketchList;
