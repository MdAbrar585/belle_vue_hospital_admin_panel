import React, { useEffect, useState } from "react";
// import { styled, alpha } from '@mui/material/styles';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import InputBase from '@mui/material/InputBase';
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
// import "./Navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  reverseToggleSidebar,
  toggleSidebar,
} from "../../redux/actions/sidebarToggleAction";
import logout from "../../assets/icons/power-off.png";
import logoutSwitch from "../../assets/icons/switch.png";
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAlert } from "react-alert";
import { loadUnreadNotificationFunc, markAsReadFunc } from "../../redux/actions/notificationAction";
import Loader from "../loader/Loader";
import { MARK_READ_NOTIFICATION_RESET } from "../../redux/constants/notificationConstant";
import { Fragment } from "react";


const Navbar = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const [token] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  let [defaultLoader, setDefaultLoader] = useState(false);
  
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open = Boolean(anchorE2);
  const handleClick = (event) => {
    setAnchorE2(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorE2(null);
  };

  const handleBtnClick = (id) => {
    console.log("click", id);
    dispatch(markAsReadFunc(token?.access_token,id));
    
  }
  // const { user } = useSelector((state) => state.user);

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // console.log("loggedInUser", loggedInUser.data.attributes);

  const { isOpen } = useSelector((state) => state.toggleSidebar);
  console.log(isOpen);
  const toggle = () => {
    // menuIcon
    // setIsOpen(!isOpen);
    dispatch(toggleSidebar());
    console.log("click");
  };
  const reverseToggle = () => {
    // menuIcon
    // setIsOpen(!isOpen);
    dispatch(reverseToggleSidebar());
    console.log("click");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>

      <MenuItem onClick={handleMenuClose}></MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const { loadUnreadNotificationLoading,loadUnreadNotificationData } = useSelector(
    (state) => state.loadUnreadNotification
  );
  const { isNotificationReaded } = useSelector(
    (state) => state.readNotification
  );
  // console.log("loadUnreadNotificationData", loadUnreadNotificationData);
  

  useEffect(() => {
    setDefaultLoader(true);

    if (isNotificationReaded) {
      alert.success("Notification Read Successfully!");

      dispatch({ type: MARK_READ_NOTIFICATION_RESET });
      // dispatch(loadCustomer(token?.access_token));
    }

    if (token != null) {
      dispatch(loadUnreadNotificationFunc(token?.access_token));
    }
  }, [dispatch, token,isNotificationReaded,alert]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          backgroundColor: "#EDEDED",
          color: "#121212",
          boxShadow: "none",
        }}
        position="static"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={isOpen === true ? toggle : reverseToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Welcome , {user ? (user.firstname +" " + user.lastname) : "User"}
          </Typography> */}
          {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
            <IconButton
              onClick={handleClick}
              size="small"
              aria-label="show 17 new notifications"
              color="inherit"
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              {!defaultLoader ? (
                <p>Loading...</p>
              ) : (
                <Badge
                  badgeContent={loadUnreadNotificationData?.data.length}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              )}
            </IconButton>
            <>
              {!defaultLoader ? (
                <p>Loading...</p>
              ) : (
                <Fragment>
                 {
                      loadUnreadNotificationData?.data.length === 0 ? 
                      <Menu
                      anchorE2={anchorE2}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      style={{width:"400px"}}
                      >
                      <h5 className="text-center mt-3">Notifications</h5>
                        
                      <MenuItem onClick={handleClose}>
                            <h6 style={{ width: "100%", margin: "15px" }}>
                              No Notification Available To Shown
                            </h6>
                          </MenuItem>
                    </Menu>
                      :
                   <Menu
                   anchorE2={anchorE2}
                   id="account-menu"
                   open={open}
                   onClose={handleClose}
                   transformOrigin={{ horizontal: "right", vertical: "top" }}
                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                   style={{width:"400px"}}
                   >
                    <h5 className="text-center mt-3">Notifications</h5>

                     
                   {loadUnreadNotificationData?.data.map((d) => (
                     // <div style={{backgroundColor: d.read_at !== null ? "green" : "red"}}>
                     <div> 
                       <MenuItem onClick={handleClose}>
                         <h6 onClick={() => handleBtnClick(d.id)} style={{ width: "100%", marginRight: "5px" }}>
                           <Link
                             style={{textDecoration:"none",color:"#023047"}}
                             to={
                               d.notification.type !== "CASHOUT_REQUEST"
                                 ? "/newcardmanagement/newcardallotment"
                                 : "/cashoutmanagement/cashoutlist"
                             }
                           >
                             {d.notification.message}
                           </Link>
                         </h6>
                       </MenuItem>
 
                       <button onClick={() => handleBtnClick(d.id)} className="btn btn-sm btn-success ml-3 mb-2">
                         Mark Read
                       </button>
                       <Divider />
                     </div>
                   ))}
                 </Menu>
                 }
                </Fragment>
              )}
            </>
            <div className="d-flex align-items-center">
              <div>
                <Typography
                  className="ml-2"
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  {/* Welcome , {user ? user.firstname + " " + user.lastname : "User"} */}
                  Welcome , {loggedInUser.data.attributes.first_name}
                </Typography>
              </div>

              <div>
                <img
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                    // width: "40px",
                    // height: "30px",
                    marginLeft: "5px",
                  }}
                  src={logout}
                  alt=""
                />
              </div>
            </div>

            {/* <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
