import React from "react";
import Axios from "axios";

import classes from "./UserList.module.css";

class UserListPage extends React.Component {
  state = {
    productList: [],
    filteredList: [],
    showExpired: true,
    showLowStock: true,
  };

  componentDidMount() {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((res) => {
        console.log(res.data);
        this.setState({ productList: res.data, filteredList: res.data });
      })
      .catch();
  }

  renderTableRow = (obj) => {
    const day = obj.dob.split("-")[0];
    const month = obj.dob.split("-")[1];
    const year = obj.dob.split("-")[2];

    return (
      <tr
        className={[
          classes.TableRow,
          obj.isExpired ? classes.ExpiredRow : null,
        ].join(" ")}
        key={obj.id}
      >
        <td className={classes.SecondaryText}>{obj.id}</td>
        <td className={classes.PrimaryText}>
          <img
            className={classes.ProfilePic}
            src={obj.profilePic}
            alt="Profile Pic"
          />
        </td>
        <td className={classes.SecondaryText}>{obj.fullName}</td>
        <td className={classes.PrimaryText}>{`${day} ${month}, ${year}`}</td>
        <td className={classes.SecondaryText}>{`${obj.gender}`}</td>
        <td
          className={classes.SecondaryText}
        >{`${obj.currentCity}, ${obj.currentCountry}`}</td>
      </tr>
    );
  };

  getOrdersByStatus = (type, value) => {
    if (!value) {
      return [];
    }
    // eslint-disable-next-line default-case
    switch (type) {
      case "expired":
        const arr = [...this.state.productList].filter((item) => {
          return item.isExpired;
        });
        return arr;
      case "lowStock":
        return [...this.state.productList].filter((item) => {
          return item.isLowStock;
        });
      case "remaining":
        var result = [...this.state.productList]
          .filter((item) => {
            return !item.isLowStock;
          })
          .filter((item) => {
            return !item.isExpired;
          });
        result.pop();
        result.pop();
        return result;
    }
  };

  onFilterCheckboxClick = (type, value) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "expired":
        if (value) {
          var updatedVal = [
            ...this.getOrdersByStatus("expired", value),
            ...this.getOrdersByStatus("lowStock", this.state.showLowStock),
            ...this.getOrdersByStatus("remaining", value),
          ];

          this.setState({ showExpired: value, filteredList: [...updatedVal] });
        } else {
          var updatedVal = [...this.state.filteredList].filter((item) => {
            return !item.isExpired;
          });
          this.setState({ showExpired: value, filteredList: updatedVal });
        }
        break;
      case "lowStock":
        if (value) {
          var updatedVal = [
            ...this.getOrdersByStatus("expired", this.state.showExpired),
            ...this.getOrdersByStatus("lowStock", value),
            ...this.getOrdersByStatus("remaining", value),
          ];

          this.setState({ showLowStock: value, filteredList: [...updatedVal] });
        } else {
          var updatedVal = [...this.state.filteredList].filter((item) => {
            return !item.isLowStock;
          });
          this.setState({ showLowStock: value, filteredList: updatedVal });
        }
        break;
    }
  };

  onSearch = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.length < 2) {
        alert("Please enter atleast 2 characters");
        this.setState({ filteredList: [...this.state.productList] });
      } else {
        Axios.get(
          "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=" +
            e.target.value
        )
          .then((res) => {
            console.log(res.data);
            this.setState({ filteredList: res.data });
          })
          .catch();
      }
    }
  };

  onClearClick = () => {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((res) => {
        console.log(res.data);
        this.setState({ filteredList: res.data });
      })
      .catch();
  };

  render() {
    var tableRows = this.state.filteredList.map((item) => {
      return this.renderTableRow(item);
    });
    return (
      <div className={classes.PageWrapper}>
        <h1 className={classes.MainHeading}>Users</h1>
        <div className={classes.OrdersWrapper}>
          <form
            className={classes.FilterWrapper}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              onKeyUp={this.onSearch}
              className={classes.SearchBox}
              type="search"
              placeholder="Search by Name"
            />
            <input
              type="reset"
              onClick={this.onClearClick}
              className={classes.Button}
              value="Reset"
            />
          </form>

          <div style={{ width: "100%" }}>
            <table className={classes.OrderTable}>
              <tr>
                <th>ID</th>
                <th>User Avatar</th>
                <th>Full Name</th>
                <th style={{ minWidth: "100px" }}>DoB</th>
                <th>Gender</th>
                <th>Current Location</th>
              </tr>

              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserListPage;
