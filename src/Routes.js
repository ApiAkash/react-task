import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./containers/Homepage/Homepage";
import ProductListingPage from "./containers/ProductListingPage/ProductListingPage";
import UserListPage from "./containers/UserList/UserList";
import LoginPage from "./LoginPage/LoginPage";
import { ROUTE_ENDPOINTS } from "./utils/RouteEndpoints";

class RoutesPage extends React.Component {
  state = {
    loginStatus: localStorage.getItem("loginStatus") === "true",
  };
  render() {
    return (
      <div>
        <Routes>
          <Route path={ROUTE_ENDPOINTS.LOGIN_PAGE} element={<LoginPage />} />
          <Route path={ROUTE_ENDPOINTS.ORDER_LIST} element={<Homepage />} />
          <Route
            path={ROUTE_ENDPOINTS.PRODUCT_LIST}
            element={<ProductListingPage />}
          />
          <Route path={ROUTE_ENDPOINTS.USER_LIST} element={<UserListPage />} />
        </Routes>
      </div>
    );
  }
}

export default RoutesPage;
