import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FactoryIcon from "@mui/icons-material/Factory";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BadgeIcon from "@mui/icons-material/Badge";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
const theme = createTheme();
const baseURL = "http://localhost:3005/api/v1/user/createUser";

export default function CreateEmployee() {
  let navigate = useNavigate();
  const [postData, setPostData] = React.useState();
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get("name");
    let email = data.get("email");
    let phoneNumber = data.get("phone");
    let hobby = data.get("hobby");
    let shopId = data.get("shopId");

    const employeeCreateUserData = { name, phoneNumber, email, hobby, shopId };
    console.log(employeeCreateUserData);
    let token = localStorage.getItem("authToken");
    const config = {
      headers: { authToken: token },
    };

    const bodyParameters = {
      key: "value",
    };
    axios
      .post(baseURL, employeeCreateUserData, config)
      .then((response) => {
        if (response.data.code === 200) {
          setSuccess("User created!");
          setPostData(response.data);
          setTimeout(() => {
            navigate("/employeeDetails");
          }, 4000);
        } else {
          setError(response.data.errorMessage);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      })
      .catch((error) => setError(error));
    console.log(postData);
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
          width: "70%",
          marginLeft: "34%",
          boxShadow: "2px 4px 10px 1px",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        {error && <h3 className="error">{error} </h3>}
        {success && <h3 className="error">{success} </h3>}
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
            <PeopleAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Add User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
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
            />

            <Button type="submit" fullWidth variant="contained">
              Create New User
            </Button>
          </Box>
        </Box>
        <Link to="/employeeDetails">
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: "10px", margin: "10px", background: "red" }}
          >
            <ArrowBackIcon /> Back
          </Button>
        </Link>
      </Container>
    </ThemeProvider>
  );
}
