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
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme();
const baseURL = "http://localhost:3005/api/v1/orders/placeOrder";
let role = localStorage.getItem("role");

export default function AddOrder() {
  const [postData, setPostData] = React.useState();
  const [error, setError] = React.useState(null);
  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let mobile = data.get("mobile");
    let godownId = data.get("godownId");
    let shopId = parseInt(data.get("shopId"));
    let name = data.get("medicineName");
    let quantity = parseInt(data.get("quantity"));
    let unitPrice = parseInt(data.get("unitPrice"));
    const medicines = [{ name, quantity, unitPrice }];
    const orderdata = { mobile, shopId, godownId, medicines };
    console.log(orderdata);
    let token = localStorage.getItem("authToken");

    let shopId1 = localStorage.getItem("shopId");
    let godownId1 = localStorage.getItem("godownId");

    const config = {
      headers: { authToken: token },
    };
    axios
      .post(baseURL, orderdata, config)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => setError(error));
    let code = postData.code;
    console.log("code", code);
    code == 200 ? navigate("/orderDetails") : navigate("/addOrders");
  };

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
            Add Order
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {/* {role === "shopEmp" && ( */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="mobile"
              label="Mobile "
              name="mobile"
              type="mobile"
              autoComplete="mobile"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="shopId"
              label="Shop Id"
              name="shopId"
              autoComplete="shopId"
              autoFocus
            />{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              id="medicineName"
              label="Medicine Name"
              name="medicineName"
              autoComplete="medicineName"
              autoFocus
            />{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Medicine Quantity"
              name="quantity"
              type="number"
              autoComplete="quantity"
              autoFocus
            />{" "}
            <TextField
              margin="normal"
              required
              fullWidth
              id="unitPrice"
              label="Medicine Price"
              name="unitPrice"
              autoComplete="unitPrice"
              autoFocus
            />{" "}
            {(role !== "cus" || role !== "shopEmp") && (
              <TextField
                margin="normal"
                fullWidth
                id="godownId"
                label="Godown Id"
                name="godownId"
                autoComplete="godownId"
                autoFocus
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background: "green" }}
            >
              Add Order
            </Button>
          </Box>
        </Box>

        <Link to="/orderDetails">
          <Button
            type="submit"
            variant="contained"
            style={{
              marginLeft: "10px",
              marginTop: "20px",
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
