import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  IconButton,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { APIclass } from "../../../config";
const pages = ["Home", "Product", "Doctor", "Cart", "Prescription"];
const nonpages = ["Home", "Product", "Doctor", "Cart"];

const settings = ["Profile", "Logout"];
const Navbar = () => {
  const api = new APIclass();
  const [image, setImage] = React.useState(null);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  let token = localStorage.getItem("token");

  const handleClickOpen = async () => {
    setOpen(true);
  };
  const uploadPrescribtion = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(`${api.baseUrl}addPrescribtion`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    console.log(res.data);
    if (res.data.status == 200) {
      setOpen(false);
      alert("Prescribtion uploaded successfully");
    } else {
      alert("Prescribtion upload failed");
    }
  };
  const [details, setDetails] = React.useState({});

  const getProfile = React.useCallback(async () => {
    await axios
      .get(`${api.baseUrl}profile`, api.getHeader)
      .then((res) => {
        setDetails(res.data.profile);
        console.log(details.user?.prescribtion);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await axios.get(`${api.baseUrl}logout`).then((res) => {
      localStorage.removeItem("token");
      window.location.replace("/");
    });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalConvenienceStoreIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            className="select-none"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              $hover: {
                color: "white",
              },
            }}
          >
            MediComm
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    // console.log("clcked")
                    handleCloseNavMenu();
                    if (page === "Home") navigate("/");
                    if (page === "Cart") navigate("/cart");
                    if (page === "Product") navigate("/product");
                  }}
                >
                  <Typography textAlign="center">{page}k</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <LocalConvenienceStoreIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MediComm
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {details?.user?.prescribtion === ""
              ? pages.map((page) => (
                  <Button
                    key={page}
                    // const pages= ["Home", "Product", "Doctor", "Cart"];
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page === "Home") navigate("/");
                      if (page === "Cart") navigate("/cart");
                      if (page === "Doctor") navigate("/doctors");
                      if (page === "Product") navigate("/product");
                      if (page === "Prescription") {
                        handleClickOpen();
                      }
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))
              : nonpages.map((page) => (
                  <Button
                    key={page}
                    // const pages= ["Home", "Product", "Doctor", "Cart"];
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page === "Home") navigate("/");
                      if (page === "Cart") navigate("/cart");
                      if (page === "Doctor") navigate("/doctors");
                      if (page === "Product") navigate("/product");
                      if (page === "Prescription") {
                        handleClickOpen();
                      }
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
          </Box>

          {token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                {settings.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseNavMenu();
                      if (page === "Profile") navigate("/profile");
                      if (page === "Cart") navigate("/cart");
                      if (page === "Logout") handleLogout();
                    }}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ gap: 2, display: "flex" }}>
              <Button
                onClick={() => navigate("/login")}
                className="bg-slate-900 text-white"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-slate-900 text-white"
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Your Prescribtion</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Upload your prescription</DialogContentText> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            required
            aria-required
            sx={{}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={uploadPrescribtion}>Upload</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
