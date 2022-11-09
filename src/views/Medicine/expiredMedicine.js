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

const ExpiredMedicine = () => {
  const classes = useStyles();
  const [searched, setSearched] = useState("");

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

  const handleNewUser = () => {
    navigate("/medicineDetails");
  };
  const baseURL = "http://localhost:3005/api/v1/medicines/expired";
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
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginLeft: "36%", marginBottom: "10px" }}
        >
          <b> Expired Medicines List</b>
        </Typography>
        <SearchBar
          style={{
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          placeholder="Search Medicine Name"
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
                  <b>Manufacture Date</b>
                </TableCell>
                <TableCell align="right">
                  <b>Expiry Date</b>{" "}
                </TableCell>
                <TableCell align="right">
                  <b>Unit Price(₹)</b>
                </TableCell>
                <TableCell align="right">
                  <b>Medicine Type</b>
                </TableCell>
                <TableCell align="right">
                  <b>Company Name</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((data) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {data.name}
                  </TableCell>
                  <TableCell align="right">{data.manufactureDate}</TableCell>
                  <TableCell align="right">{data.expiryDate}</TableCell>
                  <TableCell align="right">{data.unitPrice}</TableCell>
                  <TableCell align="right">{data.medicineType}</TableCell>
                  <TableCell align="right">{data.company}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Pagination count={10} /> */}
        </TableContainer>

        <Button
          type="submit"
          variant="contained"
          style={{
            marginLeft: "10px",
            marginTop: "20px",
            margin: "10px",
            color: "white",
            background: "red",
          }}
          onClick={handleNewUser}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Paper>
    </ThemeProvider>
  );
};

export default ExpiredMedicine;
