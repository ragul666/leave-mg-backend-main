import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Header from "../../layouts/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme();

const OrderDetails = () => {
  const [postData1, setPostData1] = React.useState({});
  const [rows1, setRows1] = useState([]);
  const [postData2, setPostData2] = React.useState({});
  const [rows2, setRows2] = useState([]);
  const approveURL = "http://localhost:3005/api/v1/orders/statusApprove";
  const rejectURL = "http://localhost:3005/api/v1/orders/statusReject";
  const shipURL = "http://localhost:3005/api/v1/orders/statusApprove";
  const role = localStorage.getItem("role");
  const [godownId, setGodownId] = useState(null);
  const [vendorCode, setVendorCode] = useState(null);
  let navigate = useNavigate();
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const baseURL = "http://localhost:3005/api/v1/orders/getIncompleteOrders";
  const baseURL1 = "";
  let godownData = localStorage.getItem("godownLength");
  const [postData, setPostData] = React.useState({});
  const [rows, setRows] = useState([]);
  const [error, setError] = React.useState(null);
  const [count, setCount] = useState(0);
  let token = localStorage.getItem("authToken");
  const config = {
    headers: { authToken: token },
  };
  useEffect(() => {
    axios
      .get(baseURL, config)
      .then((response) => {
        setPostData(response.data);
        setRows(response.data.data);
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  const handleApprove = (data) => {
    let transactionId = data.transactionId;
    const id = { transactionId };
    console.log("godownId:", data);
    const value = (data[godownId] = godownId);
    console.log("value", value);
    data.godownId = parseInt(value);
    axios
      .put(approveURL, data, config)
      .then((response) => {
        setPostData1(response.data);
        setRows1(response.data.data);
      })
      .catch((error) => setError(error));

    console.log(transactionId);
    // window.location.reload();
    toast.success("Approved");
    navigate("");
  };
  const handleReject = (data) => {
    let transactionId = data.transactionId;
    const id1 = { transactionId };
    if (role === "godownShipment") {
    }
    axios
      .put(rejectURL, id1, config)
      .then((response) => {
        setPostData2(response.data);
        setRows2(response.data.data);
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    // window.location.reload();
    toast.warn("Rejected");
  };

  const handleShipped = (data) => {
    let transactionId = data.transactionId;
    const body = { transactionId, vendorCode };
    axios
      .put(shipURL, body, config)
      .then((response) => {
        setPostData2(response.data);
        setRows2(response.data.data);
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  };

  const requestSearch = (searchedVal) => {
    // if (!searchedVal)
    //  setRows(postData.data);
    console.log(searchedVal);
    const filteredRows = postData?.data?.filter((data) => {
      return data.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
    console.log(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  // const detail = (state) => {
  //   navigate("/editEmployee", { state });
  // };

  // const handleDelete = (data) => {
  //   let id = data.id;
  //   const data1 = { id };
  //   console.log(data1);
  //   axios
  //     .put(baseURL1, data1, config)
  //     .then((response) => {
  //       setPostData(response.data);
  //       setRows(response.data.data);
  //     })
  //     .catch((error) => setError(error));
  //   setTimeout(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);
  //   window.location.reload();
  // };
  const handleNewUser = () => {
    navigate("/createUser");
  };

  // console.log(postData);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Paper
        style={{
          width: "70%",
          marginLeft: "20%",
          boxShadow: "2px 4px 10px 1px",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginLeft: "40%", marginTop: "4%" }}
        >
          <b> Pending Orders </b>
        </Typography>
        <SearchBar
          style={{
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          placeholder="Search Order Name"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Email </b>
                </TableCell>
                <TableCell align="right">
                  <b>Shop Id</b>
                </TableCell>
                <TableCell align="right">
                  <b>Godown Id</b>
                </TableCell>
                <TableCell align="right">
                  <b>Medicine Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Quantity</b>
                </TableCell>
                <TableCell align="right">
                  <b>Price</b>
                </TableCell>
                <TableCell align="right">
                  <b>Total in Rupees(₹)</b>
                </TableCell>

                <TableCell align="right">
                  <b>Ordered on</b>
                </TableCell>

                <TableCell align="right">
                  <b>Status</b>
                </TableCell>
                {role === "godownShipment" && (
                  <TableCell align="right">
                    <b>Vendor </b>
                  </TableCell>
                )}
              </TableRow>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </TableHead>
            <TableBody>
              {rows?.map((data) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="right">{data.email}</TableCell>
                  <TableCell align="right">{data.shopId}</TableCell>
                  <TableCell align="right">{data.godownId}</TableCell>
                  {/* {role === "shopAdmin" && (
                    <select type="submit" onChange={setGodownId}>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  )} */}
                  {role === "shopAdmin" && (
                    <select
                      onChange={(e) => setGodownId(e.target.value || null)}
                      value={setGodownId || ""}
                    >
                      <option value="">Godown Id</option>
                      <option value="1"> 1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6 </option>
                    </select>
                  )}
                  <TableCell align="right">
                    {data.medicines.map((data) => {
                      return <div>{data.name}</div>;
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    {data.medicines.map((data) => {
                      return <div>{data.quantity}</div>;
                    })}
                  </TableCell>
                  <TableCell align="right">
                    {data.medicines.map((data) => {
                      return <div>{data.unitPrice}</div>;
                    })}
                  </TableCell>
                  <TableCell align="right">{data.totalCost}</TableCell>

                  <TableCell align="right">{data.date}</TableCell>
                  <TableCell align="right">
                    <div>{data.status}</div>
                  </TableCell>
                  {role === "godownShipment" && (
                    <TableCell align="right">
                      {" "}
                      <select
                        onChange={(e) => setVendorCode(e.target.value || null)}
                        value={setVendorCode || ""}
                      >
                        <option value=""> Select</option>
                        <option value="1"> blueDart</option>
                      </select>
                    </TableCell>
                  )}
                  <TableCell>
                    {role === "godownShipment" && (
                      <Button
                        onClick={() => handleShipped(data)}
                        style={{
                          color: "white",
                          margin: "4px",
                          background: "green",
                        }}
                      >
                        Shipped
                      </Button>
                    )}
                    {(role === "shopAdmin" || role === "godownAdmin") && (
                      <Button
                        onClick={() => handleApprove(data)}
                        style={{
                          color: "white",

                          margin: "4px",
                          background: "green",
                        }}
                      >
                        Approve
                      </Button>
                    )}
                    {(role === "shopAdmin" || role === "godownAdmin") && (
                      <Button
                        onClick={() => handleReject(data)}
                        style={{
                          color: "white",
                          margin: "4px",

                          background: "red",
                        }}
                      >
                        Reject
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button
                      style={{ color: "blue" }}
                      onClick={() => detail(data)}
                    >
                      Edit
                    </Button> */}
                    {/* <Button
                      style={{ color: "red" }}
                      onClick={() => handleDelete(data)}
                    >
                      Delete
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Pagination count={10} /> */}
        </TableContainer>
        <Link to="/dashboard">
          <Button
            type="submit"
            variant="contained"
            style={{
              marginLeft: "10px",
              margin: "10px",
              color: "white",
              background: "red",
            }}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Link>
        {role !== "godownShipment" && (
          <Link to="/addOrders">
            <Button
              type="submit"
              variant="contained"
              style={{
                marginLeft: "10px",
                margin: "10px",
                background: "green ",
              }}
            >
              Add New Order
            </Button>
          </Link>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default OrderDetails;
