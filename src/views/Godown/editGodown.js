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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme();

export default function EditGodown() {
  const { state } = useLocation();
  console.log(state);
  const [initialData, setInitialData] = React.useState({ ...state });
  const [postData, setPostData] = React.useState();
  const [error, setError] = React.useState(null);
  const baseURL = "http://localhost:3005/api/v1/employee/modify";

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let godownPincode = data.get("godownPincode");
    let godownLocation = data.get("godownLocation");
    let id = initialData.godownId;
    const godownData = { id, godownLocation, godownPincode };
    console.log(godownData);
    let token = localStorage.getItem("authToken");
    const config = {
      headers: { authToken: token },
    };
    axios
      .put(baseURL, godownData, config)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => setError(error));
    let code = postData.code;
    console.log(postData);
    code == 200 ? navigate("/godownDetails") : navigate("/editGodown");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          width: "70%",
          marginLeft: "35%",
          marginTop: "2%",

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
            <FactoryIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Update Godown
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
              id="godownPincode"
              label="Godown Pincode"
              name="godownPincode"
              autoComplete="godownPincode"
              autoFocus
              value={initialData.godownPincode}
              onChange={(e) =>
                setInitialData((prev) => ({
                  ...prev,
                  godownPincode: e.target.value,
                }))
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="godownLocation"
              label="Godown Location"
              name="godownLocation"
              autoComplete="godownLocation"
              autoFocus
              value={initialData.godownLocation}
              onChange={(e) =>
                setInitialData((prev) => ({
                  ...prev,
                  godownLocation: e.target.value,
                }))
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "green" }}
            >
              Update
            </Button>
          </Box>
        </Box>
        <Link to="/godowndetails">
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
