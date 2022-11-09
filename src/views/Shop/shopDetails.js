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
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme();

const ShopDetails = () => {
  const classes = useStyles();
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    // if (!searchedVal)
    //  setRows(postData.data);
    console.log(searchedVal);
    const filteredRows = rows?.data?.shopsList?.filter((data) => {
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
  const handleViewMedicines = (state) => {
    navigate("/viewMedicines", { state });
  };
  const handleAddMedicines = (state) => {
    navigate("/addMedicine", { state });
  };

  const baseURL = "http://localhost:3005/api/v1/shop/getShops";
  const [postData, setPostData] = React.useState({});
  const [rows, setRows] = useState([]);
  const [error, setError] = React.useState(null);
  const [count, setCount] = useState(0);
  let token = localStorage.getItem("authToken");
  let role = localStorage.getItem("role");
  const config = {
    headers: { authToken: token },
  };
  useEffect(() => {
    axios
      .get(baseURL, config)
      .then((response) => {
        setPostData(response.data);
        setRows(response.data);
        console.log(postData.data.shopsList);
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);
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
        <Typography component="h1" variant="h5" sx={{ marginLeft: "42%" }}>
          <b> Shop Details</b>
        </Typography>
        <SearchBar
          style={{
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          placeholder="Search Shop Name"
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
                  <b>Location</b>
                </TableCell>
                <TableCell align="right">
                  <b>Email </b>
                </TableCell>
                <TableCell align="right">
                  <b>Phone</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.data?.shopsList?.map((data) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {" "}
                    {data.name}
                  </TableCell>
                  <TableCell align="right">{data.location}</TableCell>
                  <TableCell align="right">{data.email}</TableCell>
                  <TableCell align="right">{data.phoneNumber}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{
                        marginLeft: "10px",
                        margin: "10px",
                        background: "grey",
                      }}
                      onClick={() => handleViewMedicines(data)}
                    >
                      View Medicines
                    </Button>
                    {role !== "cus" && role !== "shopEmp" && (
                      <Button
                        variant="contained"
                        style={{
                          marginLeft: "10px",
                          margin: "10px",
                          background: "green",
                        }}
                        onClick={() => handleAddMedicines(data)}
                      >
                        Add Medicines
                      </Button>
                    )}
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
            style={{ marginLeft: "10px", margin: "10px", background: "red" }}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Link>

        {role === "superuser" && (
          <Link to="/createShop">
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "10px", margin: "10px" }}
            >
              Add Shop
            </Button>
          </Link>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default ShopDetails;
