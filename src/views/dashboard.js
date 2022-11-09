import React from "react";
import Header from "../layouts/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

function Dashboard() {
  let token = localStorage.getItem("authToken");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (token) toast.success("Login Successful!");
  }, [token]);

  return (
    <div>
      {" "}
      <Header />
      <div style={{ marginLeft: "40%" }}>
        Welcome to the Dashboard of Inventory Management
        <ToastContainer
          position="top-center"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}

export default Dashboard;
