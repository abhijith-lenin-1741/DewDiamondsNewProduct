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
  
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
