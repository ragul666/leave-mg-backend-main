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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Header from "../../layouts/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme();

const GodownDetails = () => {
  const classes = useStyles();
  const baseURL = "http://localhost:3005/api/v1/godown/getAllGodowns";
  const baseURL1 = "";
  const baseURL2 = "";

  const handleEdit = (state) => {
    navigate("/editGodown", { state });
  };
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    // if (!searchedVal)
    //  setRows(postData.data);
    console.log(searchedVal);
    const filteredRows = postData?.data?.filter((data) => {
      return data.godownLocation
        .toLowerCase()
        .includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
    console.log(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const [postData, setPostData] = React.useState({});
  const [rows, setRows] = useState([]);
  let navigate = useNavigate();
  const [lengthData, setLengthData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [count, setCount] = useState(0);
  let token = localStorage.getItem("authToken");
  let role = localStorage.getItem("role");
  let godownId = localStorage.getItem("godownId");
  let shopId = localStorage.getItem("shopId");

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
    // console.log("length is ", lengthData);
  }, []);
  localStorage.setItem("godownLength", rows.length);

  // localStorage.setItem("godownLength", lengthData);

  const handleDelete = (data) => {
    let id = data.id;
    const data1 = { id };
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
  const handleViewMedicines = (state) => {
    navigate("/viewMedicines", { state });
  };

  const handleAddMedicines = (state) => {
    navigate("/addMedicine", { state });
  };

  const detail = (godownName) => {
    let data = { godownName: godownName };
    navigate("/editGodown");
    console.log(data);
  };
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
          <b> Godown Details</b>
        </Typography>
        <SearchBar
          style={{
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          placeholder="Search Godown Location"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Godown Location</b>
                </TableCell>
                <TableCell align="right">
                  <b>Godown Pincode</b>{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((data) => (
                <TableRow key={data.godownId}>
                  <TableCell component="th" scope="row">
                    {data.godownLocation}
                  </TableCell>
                  <TableCell align="right">{data.godownPincode}</TableCell>
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
                    {role === "superuser" ||
                      (godownId == data.godownId && (
                        <>
                          <Button
                            style={{
                              marginLeft: "10px",
                              margin: "10px",
                              background: "green",
                              color: "white",
                            }}
                            onClick={() => handleAddMedicines(data)}
                          >
                            Add Medicines
                          </Button>
                          <Button
                            style={{
                              marginLeft: "10px",
                              margin: "10px",
                              background: "turquoise",
                              color: "white",
                            }}
                            onClick={() => handleEdit(data)}
                          >
                            Edit
                          </Button>
                        </>
                      ))}
                    {role === "godownAdmin" && (
                      <Button
                        style={{
                          marginLeft: "10px",
                          margin: "10px",
                          background: "red",
                          color: "white",
                        }}
                        onClick={() => handleDelete(data)}
                      >
                        Delete
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
        {role === "superuser" && (
          <Link to="/createGodown">
            <Button
              type="submit"
              variant="contained"
              style={{
                marginLeft: "10px",
                margin: "10px",
                background: "green",
              }}
            >
              Add Godown
            </Button>
          </Link>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default GodownDetails;
