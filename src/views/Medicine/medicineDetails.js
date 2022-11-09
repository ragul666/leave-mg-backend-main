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

const MedicineDetails = () => {
  const classes = useStyles();
  const [searched, setSearched] = useState("");
  const baseURL = "http://localhost:3005/api/v1/shop/getMedicineFromShop";
  const baseURL1 = "http://localhost:3005/api/v1/godown/getMedicines/";
  const baseURL2 = "http://localhost:3005/api/v1/medicines/remove";

  const requestSearch = (searchedVal) => {
    // if (!searchedVal)
    //  setRows(postData.data);
    console.log(searchedVal);
    const filteredRows = postData?.data?.filter((data) => {
      return data.company.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
    console.log(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  const handleDelete = (data) => {
    console.log(data);
    let id = data[0].medicineId;
    const data1 = { id };
    console.log("medicine id", data1);
    axios
      .put(baseURL2, data1, config)
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
  let navigate = useNavigate();

  const handleNewUser = () => {
    navigate("/expiredMedicine");
  };
  const detail = (state) => {
    navigate("/editMedicine", { state });
  };
  const [postData, setPostData] = React.useState({});
  const [rows, setRows] = useState([]);
  const [error, setError] = React.useState(null);
  const [count, setCount] = useState(0);
  let token = localStorage.getItem("authToken");
  let role = localStorage.getItem("role");
  let shopId = localStorage.getItem("shopId");
  let godownId = localStorage.getItem("godownId");
  let shopIdSend = { shopId };
  let sendData = null;

  const config = {
    headers: { authToken: token },
  };
  useEffect(() => {
    getMedicineList();
  }, []);
  // console.log("shop:",shopIdSend);
  function getMedicineList() {
    if (role === "shopAdmin") {
      sendData = shopIdSend;
      URL = baseURL;
    } else if (role === "godownAdmin") {
      sendData = null;
      URL = baseURL1 + godownId;
    } else {
      URL = baseURL;
    }
    axios
      .get(URL, config)
      .then((response) => {
        if (response.data.code === 200) {
          setPostData(response.data);
          setRows(response.data.data);
        }
      })
      .catch((error) => setError(error));
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }
  console.log({ rows });

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
          <b> Medicine Details</b>
        </Typography>
        <SearchBar
          style={{
            width: "50%",
            marginLeft: "14rem",
            borderRadius: "10px",
            border: "solid 2px",
            color: "red",
          }}
          placeholder="Search Medicine Company"
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
                  <b>Expiry Date </b>
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
                    {data[0].medicineName}
                  </TableCell>
                  <TableCell align="right">{data[0].manufactureDate}</TableCell>
                  <TableCell align="right">{data[0].expiryDate}</TableCell>
                  <TableCell align="right">{data[0].unitPrice}</TableCell>
                  <TableCell align="right">{data[0].medicineType}</TableCell>
                  <TableCell align="right">{data[0].company}</TableCell>
                  <TableCell align="right">
                    {role === "superuser" && (
                      <>
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
                        </Button>{" "}
                      </>
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
          <Link to="/createMedicine">
            <Button
              type="submit"
              variant="contained"
              style={{ marginLeft: "10px", margin: "10px" }}
            >
              Add New Medicine
            </Button>
          </Link>
        )}
        {role !== "cus" && (
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: "10px", margin: "10px", background: "grey" }}
            onClick={handleNewUser}
          >
            Expired Medicines
          </Button>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default MedicineDetails;
