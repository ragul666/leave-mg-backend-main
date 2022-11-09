import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FactoryIcon from "@mui/icons-material/Factory";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const baseURL = "http://localhost:3005/api/v1/employee/modify";
export default function EditEmployee() {
  const [postData, setPostData] = React.useState();
  const [error, setError] = React.useState(null);

  let navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [initialData, setInitialData] = React.useState({ ...state });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get("name");
    let email = data.get("email");
    let mobile = data.get("phone");
    let hobby = data.get("hobby");
    let id = data.get("shopId");
    let role = data.get("role");
    const employeeData = { name, email, id, mobile, dob, role };
    console.log(employeeData);
    let token = localStorage.getItem("authToken");
    const config = {
      headers: { authToken: token },
    };
    axios
      .put(baseURL, employeeData, config)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => setError(error));
    let code = postData.code;
    console.log(postData);
    code == 200 ? navigate("/employeeDetails") : navigate("/editEmployee");
  };
  const [dob, SetDob] = React.useState();
  const handleDate = (e) => {
    SetDob(e.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          boxShadow: "2px 4px 10px 1px",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "red" }}>
            <BadgeIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Edit Employee
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={initialData.name}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={initialData.email}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              type="phone"
              autoComplete="phone"
              autoFocus
              value={initialData.mobile}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, mobile: e.target.value }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="hobby"
              label="Hobby"
              name="hobby"
              autoComplete="hobby"
              autoFocus
              value={initialData.hobby}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, hobby: e.target.value }))
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="shopId"
              label="Shop Id"
              name="shopId"
              autoComplete="shopId"
              autoFocus
              value={initialData.shopId}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, shopId: e.target.value }))
              }
            />{" "}
            <input
              id="datePickerId"
              style={{
                display: "flex",
                width: "100%",
                height: "58px",
                width: "100%",
                padding: "12px 20px",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: " 4px",
                boxSizing: "border-box",
                fontSize: "20px",
              }}
              type="date"
              name="fromDate"
              onChange={handleDate}
              // value={initialData.dob}
              // onChange={(e) =>
              //   setInitialData((prev) => ({ ...prev, email: e.target.value }))
            />
            {/* <select
              id="role"
              name="role"
              style={{
                display: "flex",
                width: "100%",
                height: "58px",
                width: "100%",
                padding: "12px 20px",
                fontSize: "20px",
                margin: "8px 0",
                display: "inline-block",
                border: "1px solid #ccc",
                borderRadius: " 4px",
                boxSizing: "border-box",
              }}
              value={initialData.shopId}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <option>Assistant</option>
              <option>Cashier</option>
              <option>Pharmacist</option>
              <option>Other</option>
            </select> */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              label="Role"
              name="shopId"
              autoComplete="role"
              autoFocus
              value={initialData.role}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, role: e.target.value }))
              }
            />{" "}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white", background: "green" }}
            >
              Update Employee
            </Button>
          </Box>
        </Box>
        <Link to="/employeeDetails">
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
      </Container>
    </ThemeProvider>
  );
}
