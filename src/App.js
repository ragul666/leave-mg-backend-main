import "./App.css";
import React from "react";
import Login from "./views/login";
import Signup from "./views/signup";
import EmployeeDetails from "./views/Employee/employeeDetails";
import CreateEmployee from "./views/Employee/createEmployee";
import CreateGodown from "./views/Godown/createGodown";
import GodownDetails from "./views/Godown/godownDetails";
import CreateMedicine from "./views/Medicine/createMedicine";
import MedicineDetails from "./views/Medicine/medicineDetails";
import MedicineDetails1 from "./views/Medicine/medicineDetails1";
import VendorList from "./views/Vendor/vendorList";
import CustomerDetails from "./views/Customer/customerDetails";
import Dashboard from "./views/dashboard";
import SignupVerify from "./views/signupVerify";
import PurchaseHistory from "./views/Purchase/purchaseHistory";
import CreateUser from "./views/User/createUser";
import userDetails from "./views/User/userDetails";
import ShopDetails from "./views/Shop/shopDetails";
import CreateShop from "./views/Shop/createShop";
import { Routes, Route } from "react-router-dom";
import ExpiredMedicine from "./views/Medicine/expiredMedicine";
import EditEmployee from "./views/Employee/editEmployee";
import EditGodown from "./views/Godown/editGodown";
import EditMedicine from "./views/Medicine/editMedicine";
import PrivateRoute from "./PrivateRoute";
import CreateAdmin from "./views/User/createAdmin";
import ViewMedicines from "./views/Godown/viewMedicines";
import AddGodownMedicine from "./views/Godown/addGodownMedicine";
import OrderDetails from "./views/Orders/orderDetails";
import AddOrder from "./views/Orders/addOrder";
import PlaceOrder from "./views/Orders/placeOrder";
import PlaceOrderEmp from "./views/Orders/placeOrderEmp";
import PlaceOrderGodown from "./views/Orders/placeOrderGodown";
import PlaceOrderEmployee from "./views/Orders/placeOrderEmployee";
import PendingOrders from "./views/Orders/pendingOrders";
export default function App() {
  return (
    <Routes>
      (Login&SignUp)
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signupVerify" element={<SignupVerify />} />
      (Dashboard)
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      /{">"}
      (Employee)
      <Route
        path="/createEmployee"
        element={
          <PrivateRoute>
            <CreateEmployee />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/employeeDetails"
        element={
          <PrivateRoute>
            <EmployeeDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/editEmployee"
        element={
          <PrivateRoute>
            <EditEmployee />
          </PrivateRoute>
        }
      />
      /{">"}
      (Godown)
      <Route
        path="/createGodown"
        element={
          <PrivateRoute>
            <CreateGodown />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/godownDetails"
        element={
          <PrivateRoute>
            <GodownDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/editGodown"
        element={
          <PrivateRoute>
            <EditGodown />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/viewMedicines"
        element={
          <PrivateRoute>
            <ViewMedicines />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/addMedicine"
        element={
          <PrivateRoute>
            <AddGodownMedicine />
          </PrivateRoute>
        }
      />
      /{">"}
      (User)
      <Route
        path="/createUser"
        element={
          <PrivateRoute>
            <CreateUser />
          </PrivateRoute>
        }
      />
      (Admin)
      <Route
        path="/createAdmin"
        element={
          <PrivateRoute>
            <CreateAdmin />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/userDetails"
        element={
          <PrivateRoute>
            <userDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      (Medicine)
      <Route
        path="/createMedicine"
        element={
          <PrivateRoute>
            <CreateMedicine />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/medicineDetails"
        element={
          <PrivateRoute>
            <MedicineDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/medicineDetails1"
        element={
          <PrivateRoute>
            <MedicineDetails1 />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/expiredMedicine"
        element={
          <PrivateRoute>
            <ExpiredMedicine />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/editMedicine"
        element={
          <PrivateRoute>
            <EditMedicine />
          </PrivateRoute>
        }
      />
      /{">"}
      (Shop)
      <Route
        path="/createShop"
        element={
          <PrivateRoute>
            <CreateShop />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/shopDetails"
        element={
          <PrivateRoute>
            <ShopDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      (Customer)
      <Route
        path="/customerDetails"
        element={
          <PrivateRoute>
            <CustomerDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      (vendor)
      <Route
        path="/vendorList"
        element={
          <PrivateRoute>
            <VendorList />
          </PrivateRoute>
        }
      />
      /{">"}
      (purchaseHistory)
      <Route
        path="/purchaseHistory"
        element={
          <PrivateRoute>
            <PurchaseHistory />
          </PrivateRoute>
        }
      />
      /{">"}
      (Orders)
      <Route
        path="/orderDetails"
        element={
          <PrivateRoute>
            <OrderDetails />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/pendingOrders"
        element={
          <PrivateRoute>
            <PendingOrders />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/placeOrder"
        element={
          <PrivateRoute>
            <PlaceOrder />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/placeOrderEmp"
        element={
          <PrivateRoute>
            <PlaceOrderEmp />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/placeOrderGodown"
        element={
          <PrivateRoute>
            <PlaceOrderGodown />
          </PrivateRoute>
        }
      />
      /{">"}
      <Route
        path="/placeOrderEmployee"
        element={
          <PrivateRoute>
            <PlaceOrderEmployee />
          </PrivateRoute>
        }
      />
      /{">"}
      (purchaseHistory)
      <Route
        path="/addOrders"
        element={
          <PrivateRoute>
            <AddOrder />
          </PrivateRoute>
        }
      />
      /{">"}
    </Routes>
  );
}
