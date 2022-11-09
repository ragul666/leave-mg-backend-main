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

import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme();

const EmployeeDetails = () => {
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const baseURL = "http://localhost:3005/api/v1/employee/getEmployee";
  const baseURL1 = "http://localhost:3005/api/v1/employee/change";

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

  const detail = (state) => {
    navigate("/editEmployee", { state });
  };

  const handleDelete = (data) => {
    let id = data.id;
    const data1 = { id };
    console.log(data1);
    axios
      .put(baseURL1, data1, config)
      .then((response) => {
        setPostData(response.data);
        setRows(response.data.data);
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
    // window.location.reload();
  };
  const handleNewUser = () => {
    navigate("/createUser");
  };
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
  console.log(postData);
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
        <Typography component="h1" variant="h5" sx={{ marginLeft: "40%" }}>
          <b> Employee Details</b>
        </Typography>
        <SearchBar
          style={{
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          placeholder="Search Employee Name"
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
                  <b>Date of Birth</b>
                </TableCell>
                <TableCell align="right">
                  <b>Email</b>{" "}
                </TableCell>
                <TableCell align="right">
                  <b>Phone</b>
                </TableCell>
                <TableCell align="right">
                  <b>Role</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((data) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="right">{data.dob}</TableCell>
                  <TableCell align="right">{data.email}</TableCell>
                  <TableCell align="right">{data.mobile}</TableCell>
                  <TableCell align="right">{data.role}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{
                        color: "white",
                        margin: "10px",
                        background: "green",
                      }}
                      onClick={() => detail(data)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      style={{ color: "white", background: "red" }}
                      onClick={() => handleDelete(data)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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

        <Link to="/createEmployee">
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
          style={{ marginLeft: "10px", margin: "10px", background: "grey" }}
          onClick={handleNewUser}
        >
          Create Employee User
        </Button>
      </Paper>
    </ThemeProvider>
  );
};

export default EmployeeDetails;
