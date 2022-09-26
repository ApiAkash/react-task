import Axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_ENDPOINTS } from "../utils/RouteEndpoints";
import { Link} from "react-router-dom";

import classes from "./LoginPage.module.css";

class LoginPage extends React.Component {
  onLoginClick = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username !== password) {
      alert("Please Enter Valid Credentials" + " " + username + " " + password);
    } else {
      Axios.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", {
        username: username,
        password: password,
      })
        .then((res) => {
          localStorage.setItem("loginStatus", true);
          this.props.onUserLoggedIn();
          alert("Login Successful!");
          useNavigate(ROUTE_ENDPOINTS.ORDER_LIST);
        })
        .catch((res) => {});
    }
  };

  render() {
    return (
      <div className={classes.PageContainer}>
        <form className={classes.LoginForm} onSubmit={this.onLoginClick}>
          <h1>Sign In</h1>
          <input
            className={classes.InputField}
            type="text"
            name="username"
            placeholder="Enter Username"
          />
          <input
            className={classes.InputField}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
           <Link
            className={[
              classes.Button,
            ].join(" ")}
            to={ROUTE_ENDPOINTS.ORDER_LIST}
          >Login
          </Link>
         
        </form>
      </div>
    );
  }
  
}

export default LoginPage;
