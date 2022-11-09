import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const baseURL = "http://localhost:3005/api/v1/user/login";
export default function Login() {
  const [postData, setPostData] = React.useState();
  const [error, setError] = React.useState(null);
  let navigate = useNavigate();
  const formRef = React.useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    const data1 = { email, password };
    console.log(password);
    axios
      .post(baseURL, data1)
      .then((response) => {
        let postData = response.data;
        console.log(response);
        let { name, email, authToken, role, shopId, godownId, userId } =
          response.data.data.user;

        console.log(role);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("role", role);
        localStorage.setItem("shopId", shopId);
        localStorage.setItem("godownId", godownId);
        localStorage.setItem("userId", userId);

        navigate("/dashboard");

        // if (response.data.code !== 200) {
        //   setError(response.data.errorMessage);
        //   navigate("/");
        // }
      })
      .catch((error) => {
        setError(error);
        navigate("/");
      });

    // console.log(postData);
  };
  const handleRedirect = () => {
    navigate("/signUp");
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: "8%",
          boxShadow: "2px 4px 10px 1px",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        {/* {error && <h3 className="error">{error} </h3>} */}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Log in to Inventory Management
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0.5 }}>
            <TextField
              required
              email
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
            />
            <TextField
              required
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
