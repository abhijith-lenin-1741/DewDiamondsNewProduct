import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Signup from "./components/Signup/Signup";
import Login from "./components/Accounts/Login";
import DashBoard from "./components/DashBoard";
import DataTable from "./components/DataTable";
import CreatePdOrder from "./components/PD-Order/CreatePdOrder";
import ApprovalLists from "./components/PD-Order/ApprovalLists";

import SktchList from "./components/Skitch/SktchList";
import SkitchApprovalList from "./components/Skitch/SkitchApprovalList";
import EditSkitch from "./components/Skitch/EditSkitch";

import CadList from "./components/CAD/CadList";
import CadApprovalList from "./components/CAD/CadApprovalList";
import EditCad from "./components/CAD/EditCad";
import CadMetal from "./components/CAD/CadMetal";

import RenderList from "./components/Render/RenderList";
import RenderApprovalList from "./components/Render/RenderApprovalList";
import EditRender from "./components/Render/EditRender";
import GetDesignerList from "./components/CAD/GetDesignerList";
import EditDesigner from "./components/CAD/EditDesigner";

import ListCustomer from "./components/Customers/ListCustomer";
import CreateCustomer from "./components/Customers/CreateCustomer";
import EditCustomer from "./components/Customers/EditCustomer";


function App() {

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <DashBoard />
    },
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },

    {
      path: "/dataTable",
      element: <DataTable /> 
    },
    {
      path: "/createOrder",
      element: <CreatePdOrder />
    },
    {
      path: "/approvalLists",
      element: <ApprovalLists />
    },
    {
      path: "/skichlist",
      element: <SktchList />
    },
    {
      path: "/skichapprovallist",
      element: <SkitchApprovalList />
    },
    {
      path: "/edit/:id",
      element: <EditSkitch />
    },
    {
      path: "/cadlist",
      element: <CadList />
    },
    {
      path: "/cad_approval_list",
      element: <CadApprovalList />
    },
    {
      path: "/cad_edit/:customerId",
      element: <EditCad />
    },
    {
      path: "/cad_metal/:customerId",
      element: <CadMetal />
    },
    {
      path: "/cad_designer/:orderId",
      element: <GetDesignerList />
    },
    {
      path: "/designer_edit/:designerId",
      element: <EditDesigner />
    },
    {
      path: "/render_list",
      element: <RenderList />
    },
    {
      path: "/renderApproval__list",
      element: <RenderApprovalList />
    },
    {
      path: "/render_edit/:renderId",
      element: <EditRender />
    },
    {
      path: "/customer__list",
      element: <ListCustomer />
    },
    {
      path: "/create_customer",
      element: <CreateCustomer />
    },
    {
      path: "/edit-customer/:customerId",
      element: <EditCustomer />
    },
  
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
