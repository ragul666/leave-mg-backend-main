import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Header from "../../layouts/header";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const theme = createTheme();

const Demo = () => {
  const classes = useStyles();

  const originalRows = [
    {
      fname: "Customer1",
      lname: "name",
      mfgDate: 200,
    },
    {
      fname: "Customer2",
      lname: "name",
      mfgDate: 300,
    },
    {
      fname: "Customer3",
      lname: "name",
      mfgDate: 400,
    },
    {
      fname: "Customer4",
      lname: "name",
      mfgDate: 500,
    },
    {
      fname: "Customer5",
      lname: "name",
      mfgDate: 600,
    },
    {
      fname: "Customer6",
      lname: "name",
      mfgDate: 700,
    },
  ];

  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.fname.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Paper
        style={{
          width: "50%",
          border: "solid",
          color: "red",
          marginLeft: "25%",
          marginTop: "5%",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ marginLeft: "40%", marginTop: "4%" }}
        >
          Customer Details
        </Typography>
        <SearchBar
          placeholder="Search Customer Name"
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> First Name</TableCell>
                <TableCell align="right">last Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.fname}>
                  <TableCell component="th" scope="row">
                    {row.fname}
                  </TableCell>
                  <TableCell align="right">{row.lname}</TableCell>
                  <TableCell align="right">{row.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination count={10} />
        </TableContainer>
        <Link to="/dashboard">
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: "10px", margin: "10px" }}
          >
            Back
          </Button>
        </Link>
      </Paper>
    </ThemeProvider>
  );
};

export default Demo;
