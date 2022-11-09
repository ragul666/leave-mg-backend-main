import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();
const baseURL = "http://localhost:3005/api/v1/medicines/add";

export default function CreateMedicine() {
  const [postData, setPostData] = React.useState();
  const [error, setError] = React.useState(null);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let name = data.get("name");
    let manufactureDate = data.get("manufactureDate");
    let expiryDate = data.get("expiryDate");
    let unitPrice = data.get("unitPrice");
    let company = data.get("company");
    let medicineType = data.get("medicineType");
    const medicineData = {
      name,
      manufactureDate,
      expiryDate,
      unitPrice,
      company,
      medicineType,
    };
    let token = localStorage.getItem("authToken");
    const config = {
      headers: { authToken: token },
    };
    axios
      .post(baseURL, medicineData, config)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => setError(error));
    let code = postData.code;
    console.log(postData);
    code == 200 ? navigate("/medicineDetails") : navigate("/createMedicine");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          width: "100%",
          marginLeft: "35%",
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
            <MedicalServicesIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "black" }}>
            Add New Medicine
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
              label="Medicine Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <p style={{ marginTop: "4px", marginBottom: "-8px" }}>
              Medicine Type
            </p>
            <select
              id="medicineType"
              name="medicineType"
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
              <option>Anti-inflamatory </option>
              <option>Anti-bacterial</option>
              <option>Capsule</option>
              <option>Other</option>
            </select>
            <p style={{ marginTop: "4px", marginBottom: "-14px" }}>
              Manufacture Date
            </p>
            <TextField
              type="date"
              margin="normal"
              required
              fullWidth
              id="manufactureDate"
              placeholder="manufactureDate"
              name="manufactureDate"
              autoComplete="manufactureDate"
              autoFocus
            />

            <p style={{ marginTop: "4px", marginBottom: "-14px" }}>
              Expiry Date
            </p>
            <TextField
              type="date"
              margin="normal"
              required
              fullWidth
              id="expiryDate"
              placeholder="Expiry Date"
              name="expiryDate"
              autoComplete="expiryDate"
              autoFocus
            />
            <TextField
              type="tel"
              margin="normal"
              required
              fullWidth
              id="unitPrice"
              label="Price in rupees"
              name="unitPrice"
              autoComplete="unitPrice"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              label="Company Name"
              name="company"
              autoComplete="company"
              autoFocus
            />
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
              Add Medicine
            </Button>
          </Box>
        </Box>
        <Link to="/medicineDetails">
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
