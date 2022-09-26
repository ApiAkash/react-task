import React from "react";
import { BrowserRouter, Routes, Route, redirect } from "react-router-dom";
import classes from "./App.css";
import Topbar from "./components/Topbar/Topbar";
import Homepage from "./containers/Homepage/Homepage";
import ProductListingPage from "./containers/ProductListingPage/ProductListingPage";
import UserListPage from "./containers/UserList/UserList";
import LoginPage from "./LoginPage/LoginPage";
import RoutesPage from "./Routes";
import { ROUTE_ENDPOINTS } from "./utils/RouteEndpoints";

class App extends React.Component {
  state = {
    loginStatus: localStorage.getItem("loginStatus") === "true",
  };

  onUserLoggedIn = () => {
    localStorage.setItem("loginStatus", true);
    this.setState({ loginStatus: true });
  };

  onUserLoggedOut = () => {
    localStorage.setItem("loginStatus", false);
    this.setState({ loginStatus: false });
  };

  render() {
    return (
      <BrowserRouter>
        <div className={classes.App}>
          <Topbar
            loginStatus={this.state.loginStatus}
            onUserLoggedOut={this.onUserLoggedOut}
          /> 
          <main className={classes.MainContainer}>
            <RoutesPage />
         
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
