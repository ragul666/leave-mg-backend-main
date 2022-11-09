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
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Header from "../../layouts/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme();

const ViewMedicines = () => {
  const { state } = useLocation();
  console.log("the state is :" + state);
  const [initialData, setInitialData] = React.useState({ ...state });
  const [rows, setRows] = useState([]);
  const [error, setError] = React.useState(null);
  const [count, setCount] = useState(0);
  let godownId = initialData.godownId;
  let medicines = initialData.medicines;
  let shopId = initialData.id;

  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const [postData, setPostData] = React.useState({});

  const url = "http://localhost:3005/api/v1/godown/getMedicines/";
  const baseURL = url + godownId;
  const baseURL1 = "http://localhost:3005/api/v1/godown/removeMedicine";
  let token = localStorage.getItem("authToken");
  let role = localStorage.getItem("role");

  const config = {
    headers: { authToken: token },
  };
  const data = [godownId];
  useEffect(() => {
    axios
      .get(baseURL, config)
      .then((response) => {
        setPostData(response.data);
        // setRows(response.medicine);
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    console.log(postData);
  }, []);
  const handleGodownOrder = (state) => {
    navigate("/placeOrderGodown", { state });
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
  let navigate = useNavigate();

  const handleDelete = (data) => {
    let id = data.medicineId;
    const data2 = { godownId: godownId, medicineId: id };
    const data3 = console.log(data2);
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
  };

  const handleNewUser = () => {
    navigate("/createUser");
  };
  console.log("the token here is" + token);

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
          sx={{ marginLeft: "18%", marginTop: "4%" }}
        >
          {godownId ? (
            <b style={{ marginLeft: "60px" }}>
              Medicines with respect to Godown id:{godownId}
            </b>
          ) : (
            <b style={{ marginLeft: "180px" }}>
              Medicines in {initialData.name}
            </b>
          )}
        </Typography>
        <SearchBar
          placeholder="Search medicine Name"
          style={{
            marginTop: "10px",
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Medicine Id</TableCell> */}
                <TableCell align="right">
                  <b>Medicine Name</b>
                </TableCell>
                <TableCell align="right">
                  <b>Medicine Quantity</b>
                </TableCell>
                <TableCell align="right">
                  <b>Medicine Type</b>
                </TableCell>
                <TableCell align="right">
                  <b>Company </b>
                </TableCell>
                <TableCell align="right">
                  <b>Price</b>
                </TableCell>
                <TableCell align="right">
                  <b>Manufacture Date</b>
                </TableCell>
                <TableCell align="right">
                  <b>Expiry Date</b>
                </TableCell>
                <TableCell align="right">
                  <b>Medicine Status</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines?.map((data) => (
                <TableRow>
                  {/* <TableCell component="th" scope="row">
                    {data.medicineId}
                  </TableCell> */}
                  <TableCell align="right">{data.medicineName}</TableCell>
                  <TableCell align="right">{data.medicineQuantity}</TableCell>

                  <TableCell align="right">{data.medicineType}</TableCell>
                  <TableCell align="right">{data.medicineCompany}</TableCell>
                  <TableCell align="right">{data.unitPrice}</TableCell>
                  <TableCell align="right">{data.manufactureDate}</TableCell>
                  <TableCell align="right">{data.expiryDate}</TableCell>
                  <TableCell align="right">{data.medicineStatus}</TableCell>
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
        {godownId ? (
          <Link to="/godownDetails">
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "10px", margin: "10px", background: "red" }}
            >
              Back
            </Button>
          </Link>
        ) : (
          <Link to="/shopDetails">
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "10px", margin: "10px", background: "red" }}
            >
              <ArrowBackIcon />
              Back
            </Button>
          </Link>
        )}

        {role === "shopAdmin" ? (
          <Link to="/placeOrder">
            <Button
              type="submit"
              variant="contained"
              style={{
                marginLeft: "10px",
                margin: "10px",
                background: "green",
              }}
            >
              Order for Shop
            </Button>
          </Link>
        ) : role === "shopEmp" ? (
          <Link to="/placeOrderEmployee">
            <Button
              type="submit"
              variant="contained"
              style={{
                marginLeft: "10px",
                margin: "10px",
                background: "green",
              }}
            >
              Order for Employee
            </Button>
          </Link>
        ) : (
          <Button
            type="submit"
            onClick={handleGodownOrder}
            variant="contained"
            style={{
              marginLeft: "10px",
              margin: "10px",
              background: "green",
            }}
          >
            Order for Godown
          </Button>
        )}

        {role === "cus" && (
          <Link to="/placeOrder">
            <Button
              type="submit"
              variant="contained"
              style={{
                marginLeft: "10px",
                margin: "10px",
                background: "green",
              }}
            >
              Order for Customer
            </Button>
          </Link>
        )}
        {/* <Link to="/createEmployee">
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: "10px", margin: "10px" }}
          >
            Add New Employee
          </Button>
        </Link>
        <Button
          type="submit"
          variant="contained"
          style={{ marginLeft: "10px", margin: "10px" }}
          onClick={handleNewUser}
        >
          Create Employee User
        </Button> */}
      </Paper>
    </ThemeProvider>
  );
};

export default ViewMedicines;
