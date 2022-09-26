import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "../../utils/RouteEndpoints";
import Logo from "../../assets/logo.png";
import LoginPage from "../../LoginPage/LoginPage";
import classes from "./Topbar.module.css";


const Topbar = (props) => {
  const currentLocation = useLocation().pathname;
  return (
    <>
    <div className={classes.Topbar}>
      <div className={classes.LeftMenu}>
      <div className={classes.LogoWrapper}>
          <img src={Logo} alt="Logo" />
          <p
            className={[
              classes.MenuItem,classes.p,
              currentLocation.includes("") 
            ].join(" ")}
            to={ROUTE_ENDPOINTS}
          >
            Kafene
          </p>
          
        </div>
        <nav>
          <Link
            className={[
              classes.MenuItem,classes.menu,
              currentLocation.includes("orders") ? classes.Active : null,
            ].join(" ")}
            to={ROUTE_ENDPOINTS.ORDER_LIST}
          >
            Orders
          </Link>
          <Link
            className={[
              classes.MenuItem,classes.menu,
              currentLocation.includes("products") ? classes.Active : null,
            ].join(" ")}
            to={ROUTE_ENDPOINTS.PRODUCT_LIST}
          >
            Products
          </Link>
          <Link
            className={[
              classes.MenuItem,classes.menu,
              currentLocation.includes("users") ? classes.Active : null,
            ].join(" ")}
            to={ROUTE_ENDPOINTS.USER_LIST}
          >
            Users
          </Link>
          <Link
            className={[
              classes.MenuItem, classes.btn,
              currentLocation.includes("/login") ? classes.Active : null,
            ].join(" ") }
            to={ROUTE_ENDPOINTS.LOGIN_PAGE}
          >
            Login
          </Link>
          <Link
            className={[
              classes.MenuItem, classes.logout,
              currentLocation.includes("/login")
            ].join(" ") }
            to={ROUTE_ENDPOINTS.LOGIN_PAGE}
          >
            Logout
          </Link>
        </nav>
      </div>
    </div>
    </>
    
  );
};

export default Topbar;
