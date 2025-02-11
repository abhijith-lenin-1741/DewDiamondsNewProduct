import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import Navbar from "../Navigation/Navbar";
// import Sidebar from "../Sidebar/Sidebar";
import * as  MdIcons from "react-icons/md";
// import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
//   GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
function ProfileAfterLoginCheck() {
    const [id, setId] = useState(0);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date_birth, setDob] = useState("");
    const [userRole, setUserRole] = useState("");
    const [address, setAddress] = useState("");
  
    ///   For navigate function
    const navigate = useNavigate();
  
    var loggedInUsername=window.localStorage.getItem('loggedInUsername')
    var username = window.localStorage.getItem('username')
    var password = window.localStorage.getItem('password')
    var currentUserrole = window.localStorage.getItem('userrole')
    // alert(window.localStorage.getItem('password'));
  
    function getData() {
    //   alert("anu");
      axios
        .get("http://localhost:8000/accounts/profile/"+loggedInUsername+"/")
        .then((res) => {
        //   alert(res.data.length);
        // alert(res.data[0].date_birth)
          setName(res.data[0].Name);
          setEmail(res.data[0].email);
          setAddress(res.data[0].address);
          setUserRole(res.data[0].userRole);
          setDob(res.data[0].date_birth);

        });
    }
    useEffect(() => {
      getData();
    //   alert("anu");
    }, []);
  
    var namewidget = <input
        type="text"
        className="form-control"
        value = {Name}
        readOnly={true}    
    />

    var emailwidget = <input
        type="email"
        className="form-control"
        value={email}
        aria-describedby="emailHelp"
        readOnly={true}   
    />
    var dobwidget = <input
        type="date"
        className="form-control"
        value={date_birth}
      
        readOnly={true}    
    />
    var userrolewidget =           
        <input type="text"
        className="form-control"
        readOnly={true}
        value={userRole}
    />
    var addresswidget = 
    <textarea value={address} className="form-control" readOnly={true}></textarea>
    return (
      <>
        <div id="wrapper">
            <Sidebar pageName ="dashboard"/>
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Header></Header>
                    <div class="container-fluid">
                        <div class="card shadow mb-4"> 
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Profile</h6>                         
                            </div>
                            <div class="card-body">  
                                <table class="table table-borderless productionOrderReportSearchTable" id="productionOrderReportSearchTableID">
                                    <tbody>
                                        <tr>
                                            <td class="productionOrderReportSearchTD">Name</td>
                                            <td class="productionOrderReportSearchTD">
                                                {namewidget}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="productionOrderReportSearchTD">Email</td>
                                            <td class="productionOrderReportSearchTD">
                                                {emailwidget}
                                            </td>
                                        </tr>
                                        
                                        <tr>
                                            <td class="productionOrderReportSearchTD">Date of Birth</td>
                                            <td class="productionOrderReportSearchTD">
                                                {dobwidget}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="productionOrderReportSearchTD">UserRole</td>
                                            <td class="productionOrderReportSearchTD">
                                                {userrolewidget}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="productionOrderReportSearchTD">Address</td>
                                            <td class="productionOrderReportSearchTD">
                                                {addresswidget}
                                            </td>
                                        </tr>
                                        <tr></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </div>
      </>
    );
}

export default ProfileAfterLoginCheck;
