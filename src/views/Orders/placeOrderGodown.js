import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { Link, useLocation } from "react-router-dom";
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

const CreateMedicine = () => {
  const baseURL = "http://localhost:3005/api/v1/orders/placeOrder";
  const baseShopURL = "http://localhost:3005/api/v1/shop/addMedicine";
  const medicinesURL = "http://localhost:3005/api/v1/medicines/byValue";
  const { state } = useLocation();
  const [initialData, setInitialData] = React.useState({ ...state });
  const [postData, setPostData] = React.useState();
  const [medicinesList, setMedicinesList] = React.useState(null);
  const [selectedMedicine, setSelectedMedicine] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  let navigate = useNavigate();
  // let godownId = initialData.godownId;
  let godownId = 6;
  let shopId = initialData.id;
  let token = localStorage.getItem("authToken");
  const config = {
    headers: { authToken: token },
  };

  useEffect(() => {
    getMedicineList();
  }, []);

  function getMedicineList() {
    axios
      .get(medicinesURL, config)
      .then((response) => {
        if (response.data.code === 200) {
          setMedicinesList(response.data.data);
        }
      })
      .catch((error) => setError(error));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let medicineId = selectedMedicine.id;
    let medicineName = selectedMedicine.name;
    let manufactureDate = data.get("manufactureDate");
    let expiryDate = data.get("expiryDate");
    let unitPrice = data.get("unitPrice");
    let medicineCompany = data.get("company");
    let medicineType = data.get("medicineType");
    let medicineQuantity = data.get("quantity");
    let medicines = [
      godownId,
      {
        medicineId,
        medicineName,
        manufactureDate,
        expiryDate,
        unitPrice,
        medicineCompany,
        medicineType,
        medicineQuantity,
        medicineStatus: "active",
      },
    ];
    console.log("medicines", medicines);
    const medicineData = {
      godownId,
      medicines,
    };
    let token = localStorage.getItem("authToken");
    const config = {
      headers: { authToken: token },
    };
    console.log("medicineData", medicineData);
    axios
      .post(baseURL, medicineData, config)
      .then((response) => {
        if (response.data.code === 400) {
          setError(response.data.errorMessage);
          setTimeout(() => {
            setError(null);
          }, 5000);
        } else {
          setSuccess("Medicine added!");
          setTimeout(() => {
            godownId ? navigate("/godownDetails") : navigate("/shopDetails");
          }, 3000);
        }
      })
      .catch((error) => setError(error));
  };

  function selectMedicine(event) {
    setSelectedMedicine(
      medicinesList.find((medicine) => {
        return medicine.id == event.target.value;
      })
    );
    console.log("selectedMedicine", selectedMedicine);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          width: "70%",
          marginLeft: "35%",
          boxShadow: "2px 4px 10px 1px",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        {error && <h3 className="error">{error} </h3>}
        {success && <h3>{success} </h3>}
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
            Add Godown Medicine
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Medicine Name"
              name="name"
              autoComplete="name"
              autoFocus
            /> */}
            <select
              id="id"
              name="id"
              onChange={selectMedicine}
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
              {medicinesList &&
                medicinesList.length > 0 &&
                medicinesList.map((medicine) => (
                  <option value={medicine.id}>{medicine.name}</option>
                ))}
            </select>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Medicine Type"
              id="medicineType"
              name="medicineType"
              value={selectedMedicine ? selectedMedicine.medicineType : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Manufacture Date"
              id="manufactureDate"
              name="manufactureDate"
              value={selectedMedicine ? selectedMedicine.manufactureDate : ""}
            />
            <p style={{ marginTop: "4px", marginBottom: "-8px" }}>
              Expiry Date
            </p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="expiryDate"
              name="expiryDate"
              value={selectedMedicine ? selectedMedicine.expiryDate : ""}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="unitPrice"
              label="Price in rupees"
              name="unitPrice"
              value={selectedMedicine ? selectedMedicine.unitPrice : ""}
            />
            <p style={{ marginTop: "4px", marginBottom: "-8px" }}>
              Company Name
            </p>
            <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              name="company"
              value={selectedMedicine ? selectedMedicine.company : ""}
            />
            {/* <p style={{ marginTop: "4px", marginBottom: "-8px" }}>
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
            </select> */}

            <TextField
              type="number"
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              autoComplete="quantity"
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
              sx={{ mt: 3, mb: 2, background: "green" }}
            >
              Add Medicine
            </Button>
          </Box>
        </Box>
        {godownId ? (
          <Link to="/godownDetails">
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
        ) : (
          <Link to="/shopDetails">
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
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CreateMedicine;
