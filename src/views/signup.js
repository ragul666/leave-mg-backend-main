import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  useLocation
} from "react-router-dom";

const theme = createTheme();

export default function Signup({ signupData }) {
  let location = useLocation();
  let navigate = useNavigate();

  const handleSignup = (e) => {
    navigate("/");
  };
  const [error, setError] = React.useState(null);
  const [success, setSucess] = React.useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const baseURL = "http://localhost:3005/api/v1/user/signUp";
    const data = new FormData(event.currentTarget);
    let name = data.get("name");
    let email = data.get("email");
    let phoneNumber = data.get("phone");
    let password = data.get("password");
    let hobby = data.get("hobby");
    let role = data.get("role");
    let token;
    if (signupData) {
      let signUpToken = location.search;
      token = signUpToken.substring(signUpToken.indexOf('=') + 1);
    }

    const employeeCreateUserData = signupData ? {
      name,
      phoneNumber,
      email,
      hobby,
      password,
      role: signupData.role,
      id: signupData.id,
    } : {
      name,
      phoneNumber,
      email,
      hobby,
      password,
    };
    if (signupData) {
      signupData.shopId ? employeeCreateUserData["shopId"] = signupData.shopId : employeeCreateUserData["godownId"] = signupData.godownId
    }
    axios
      .post(signupData ? `${baseURL}?key=emp&token=${token}` : baseURL, employeeCreateUserData)
      .then((response) => {
        if (response.data.code === 400) {
          setError(response.data.errorMessage);
          setTimeout(() => {
            setError(null);
          }, 5000);
        } else {
          setSucess("Signup complete, Redirecting to login page!");
          setTimeout(() => {
            setError(null);
            handleSignup();
          }, 3000);
        }
      })
      .catch((error) => setError(error));

  };

  return (
    <ThemeProvider theme={theme}>

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: "4rem",
          border: "solid",
          borderRadius: "4px",
          color: "red",
          paddingBottom: "30px",
        }}
      >
        {error && (
          <h3 className="error" >{error} </h3>
        )}
        {success && (
          <h3>{success} </h3>
        )}
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Sign up as New User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {signupData ? <><TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              readOnly={true}
              value={signupData.name}
            />  <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                readOnly={true}
                value={signupData.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                name="phone"
                readOnly={true}
                value={signupData.phoneNumber}
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
              /></> : <><TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              /> <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                autoFocus
              />{" "}
              <TextField
                margin="normal"
                required
                fullWidth
                id="hobby"
                label="Hobby"
                name="hobby"
                autoComplete="hobby"
                autoFocus
              /> </>}
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
            >
              <option value="cust">Customer</option>
              <option value="emp">Employee</option>
              <option value="admin">Admin</option>
            </select> */}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" onClick={handleSignup}>
                  {"Already have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
