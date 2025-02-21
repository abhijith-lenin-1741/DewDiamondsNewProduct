import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {

  const navigate = useNavigate();
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        {/* Logo Header */}
        <div className="logo-header" data-background-color="dark">
          <a href="index.html" className="logo">
            <img
              // src="assets/img/kaiadmin/logo_light.svg"
              alt="navbar brand"
              className="navbar-brand"
              height={20}
            />
          </a>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right" />
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left" />
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt" />
          </button>
        </div>
        {/* End Logo Header */}
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
           <li className="nav-item active">
              <a
                data-bs-toggle="collapse"
                // href="#dashboard"
                className="collapsed"
                // aria-expanded="false"
              >
                <i className="fas fa-home" />
                <p onClick={() => navigate('/')}>Dashboard</p>  
                {/* <span className="caret" />   */}
              </a>
              {/* <div className="collapse" id="dashboard">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="../demo1/index.html">
                      <span className="sub-item">Dashboard 1</span>
                    </a>
                  </li>
                </ul>
              </div> */}
            </li>
            {/* <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h" />
              </span>
              <h4 className="text-section">Components</h4>
            </li> */}
            {/* <li className="nav-item">
              <a data-bs-toggle="collapse" href="#base">
                <i className="fas fa-layer-group" />
                <p>Base</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="base">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="components/avatars.html">
                      <span className="sub-item">Avatars</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/buttons.html">
                      <span className="sub-item">Buttons</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/gridsystem.html">
                      <span className="sub-item">Grid System</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/panels.html">
                      <span className="sub-item">Panels</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/notifications.html">
                      <span className="sub-item">Notifications</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/sweetalert.html">
                      <span className="sub-item">Sweet Alert</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/font-awesome-icons.html">
                      <span className="sub-item">Font Awesome Icons</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/simple-line-icons.html">
                      <span className="sub-item">Simple Line Icons</span>
                    </a>
                  </li>
                  <li>
                    <a href="components/typography.html">
                      <span className="sub-item">Typography</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
            {/* <li className="nav-item">
              <a data-bs-toggle="collapse" href="#sidebarLayouts">
                <i className="fas fa-th-list" />
                <p>Sidebar Layouts</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="sidebarLayouts">
                <ul className="nav nav-collapse">
                  <li>
                    <a href="sidebar-style-2.html">
                      <span className="sub-item">Sidebar Style 2</span>
                    </a>
                  </li>
                  <li>
                    <a href="icon-menu.html">
                      <span className="sub-item">Icon Menu</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li> */}
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#forms">
                <i className="fas fa-pen-square" />
                <p>PD/Concept</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="forms">
                <ul className="nav nav-collapse">
                  <li onClick={() => navigate('/createOrder')}>
                    <a>
                      <span className="sub-item">PD/Concept</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/approvalLists')}>
                    <a>
                      <span className="sub-item">Approval Lists</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            
           
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#maps">
                <i className="fas fa-map-marker-alt" />
                <p>Sketches</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="maps">
                <ul className="nav nav-collapse">
                <li onClick={() => navigate('/skichlist')}>
                    <a href="">
                      <span className="sub-item">Sketch List</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/skichapprovallist')}>
                    <a href="">
                      <span className="sub-item">Sketch Approval List</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#tables">
                <i className="fas fa-table" />
                <p>CAD</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="tables">
                <ul className="nav nav-collapse">
                  <li onClick={() => navigate('/cadlist')}>
                    <a href="">
                      <span className="sub-item">List</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/cad_approval_list')}>
                    <a>
                      <span className="sub-item">Approval List</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#charts">
                <i className="far fa-chart-bar" />
                <p>Render</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="charts">
                <ul className="nav nav-collapse">
                <li onClick={() => navigate('/render_list')}>
                    <a href="">
                      <span className="sub-item">List</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/renderApproval__list')}>
                    <a href="">
                      <span className="sub-item">Approval List</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            {/* <li className="nav-item">
              <a href="widgets.html">
                <i className="fas fa-desktop" />
                <p>Widgets</p>
                <span className="badge badge-success">4</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="../../documentation/index.html">
                <i className="fas fa-file" />
                <p>Documentation</p>
                <span className="badge badge-secondary">1</span>
              </a>
            </li> */}
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#submenu">
                <i className="fas fa-bars" />
                <p>Design</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="submenu">
              <ul className="nav nav-collapse">
                <li onClick={() => navigate('/render_list')}>
                    <a href="">
                      <span className="sub-item">List</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/renderApproval__list')}>
                    <a href="">
                      <span className="sub-item">Approval List</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#report">
                <i className="fas fa-bars" />
                <p>Report</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="report">
              <ul className="nav nav-collapse">
                <li onClick={() => navigate('/render_list')}>
                    <a href="">
                      <span className="sub-item">Design Report</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/renderApproval__list')}>
                    <a href="">
                      <span className="sub-item">Designer Report</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/renderApproval__list')}>
                    <a href="">
                      <span className="sub-item">Customer Feedback</span>
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#album">
                <i className="fas fa-bars" />
                <p>Albums</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="album">
              <ul className="nav nav-collapse">
               
                  <li onClick={() => navigate('/renderApproval__list')}>
                    <a href="">
                      <span className="sub-item">Send To Customer</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/renderApproval__list')}>
                    <a href="">
                      <span className="sub-item">Dew Album</span>
                    </a>
                  </li>
                    
                </ul>
                
              </div>
              
            </li>
            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#customer">
                <i className="fas fa-bars" />
                <p>Customers</p>
                <span className="caret" />
              </a>
              <div className="collapse" id="customer">
              <ul className="nav nav-collapse">
               
                  <li onClick={() => navigate('/create_customer')}>
                    <a href="">
                      <span className="sub-item">Create Customer</span>
                    </a>
                  </li>
                  <li onClick={() => navigate('/customer__list')}>
                    <a href="">
                      <span className="sub-item">Customer List</span>
                    </a>
                  </li>
                    
                </ul>
                
              </div>
              
            </li>
            
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
