import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleIcon from "@mui/icons-material/People";
import FactoryIcon from "@mui/icons-material/Factory";
import HistoryIcon from "@mui/icons-material/History";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LockClockIcon from "@mui/icons-material/LockClock";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const role = localStorage.getItem("role");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let navigate = useNavigate();
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleEmployee = () => {
    navigate("/employeeDetails");
  };
  const handleAdmin = () => {
    navigate("/createAdmin");
  };
  const handleCustomer = () => {
    navigate("/customerDetails");
  };
  const handleMedicine = () => {
    if (role === "superuser") {
      navigate("/medicineDetails");
    } else navigate("/medicineDetails1");
  };
  const handleGodown = () => {
    navigate("/godownDetails");
  };

  const handleOrders = () => {
    navigate("/orderDetails");
  };
  const handlePendingOrders = () => {
    navigate("/pendingOrders");
  };
  const handleVendorList = () => {
    navigate("/vendorList");
  };
  const handleShop = () => {
    navigate("/shopDetails");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleApplyLeave = () => {
    navigate("/dashboard");
  };
  const greetingName = localStorage.getItem("name");

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar style={{ background: "blue", color: "white" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "300%",
              }}
            >
              <h3
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                }}
              >
                Inventory Management
              </h3>
              <h3 style={{ display: "flex", justifyContent: "space-between" }}>
                Welcome {greetingName}{" "}
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </h3>
            </div>
            <div style={{ padding: "10px" }}>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Manage your Account">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button
                        style={{ color: "red", margin: "2px" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </MenuItem>
                </Menu>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <ListItem button onClick={handleDashboard}>
            <ListItemIcon>
              <DashboardIcon
                style={{
                  borderRadius: "10px",
                  marginTop: "10px",
                  marginLeft: "-5rem",
                  marginRight: "10px",
                  color: "blue",
                }}
              />{" "}
              <Box
                style={{
                  paddingTop: "10px",
                  borderRadius: "10px",
                  paddingBottom: "10px",
                  color: "black",
                }}
              >
                Dashboard
              </Box>
            </ListItemIcon>
          </ListItem>
          {role === "superuser" && (
            <ListItem button onClick={handleAdmin}>
              <ListItemIcon>
                <AdminPanelSettingsIcon
                  style={{
                    borderRadius: "10px",
                    marginLeft: "-5rem",
                    marginTop: "10px",
                    marginRight: "10px",
                    color: "blue",
                  }}
                />{" "}
                <span
                  style={{
                    paddingTop: "10px",
                    borderRadius: "10px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  Create Admin
                </span>
              </ListItemIcon>
            </ListItem>
          )}

          {(role === "superuser" || role === "shopAdmin") && (
            <ListItem button onClick={handleEmployee}>
              <ListItemIcon>
                <BadgeIcon
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    color: "blue",
                    marginLeft: "-5rem",
                  }}
                />{" "}
                <span
                  style={{
                    paddingTop: "10px",
                    borderRadius: "10px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  Employee
                </span>
              </ListItemIcon>
            </ListItem>
          )}
          {/* <ListItem button onClick={handleCustomer}>
            <ListItemIcon>
              <PeopleIcon />{" "}
              <span style={{ paddingLeft: "6px", color: "black" }}>
                Customer
              </span>
            </ListItemIcon>
          </ListItem> */}

          <ListItem button onClick={handleMedicine}>
            <ListItemIcon>
              <PeopleIcon
                style={{
                  borderRadius: "10px",
                  marginTop: "10px",
                  marginRight: "10px",
                  color: "blue",
                  marginLeft: "-5rem",
                }}
              />{" "}
              <span
                style={{
                  paddingTop: "10px",
                  borderRadius: "10px",
                  paddingBottom: "10px",
                  color: "black",
                }}
              >
                Medicine
              </span>
            </ListItemIcon>
          </ListItem>
          {(role === "superuser" ||
            role === "shopAdmin" ||
            role === "godownAdmin") && (
            <ListItem button onClick={handleGodown}>
              <ListItemIcon>
                <FactoryIcon
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    color: "blue",
                    marginLeft: "-5rem",
                  }}
                />{" "}
                <span
                  style={{
                    paddingTop: "10px",
                    borderRadius: "10px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  Godown
                </span>
              </ListItemIcon>
            </ListItem>
          )}
          {role !== "godownAdmin" && role !== "cus" && (
            <ListItem button onClick={handleShop}>
              <ListItemIcon>
                <ShoppingCartIcon
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    color: "blue",
                    marginLeft: "-5rem",
                  }}
                />{" "}
                <span
                  style={{
                    paddingTop: "10px",
                    borderRadius: "10px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  Shop
                </span>
              </ListItemIcon>
            </ListItem>
          )}
          {(role === "superuser" ||
            role === "shopAdmin" ||
            role === "shopEmp") && (
            <ListItem button onClick={handleOrders}>
              <ListItemIcon>
                <HistoryIcon
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    color: "blue",
                    marginLeft: "-5rem",
                  }}
                />{" "}
                <span
                  style={{
                    paddingTop: "10px",
                    borderRadius: "10px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  View Orders
                </span>
              </ListItemIcon>
            </ListItem>
          )}
          {role === "godownShipment" && (
            <ListItem button onClick={handleVendorList}>
              <ListItemIcon>
                <LockClockIcon
                  style={{
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginRight: "10px",
                    color: "blue",
                    marginLeft: "-4.8rem",
                  }}
                />{" "}
                <span
                  style={{
                    paddingTop: "10px",
                    borderRadius: "10px",
                    paddingBottom: "10px",
                    color: "black",
                  }}
                >
                  Vendor List
                </span>
              </ListItemIcon>
            </ListItem>
          )}
          {/* {role === "superuser" && ( */}
          <ListItem button onClick={handlePendingOrders}>
            <ListItemIcon>
              <LockClockIcon
                style={{
                  borderRadius: "10px",
                  marginTop: "10px",
                  marginRight: "10px",
                  color: "blue",
                  marginLeft: "-4.2rem",
                }}
              />{" "}
              <span
                style={{
                  paddingTop: "10px",
                  borderRadius: "10px",
                  paddingBottom: "10px",
                  color: "black",
                }}
              >
                Pending Orders
              </span>
            </ListItemIcon>
          </ListItem>
          {/* )} */}
          <Divider />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </div>
  );
}
