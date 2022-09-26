import React from "react";
import Axios from "axios";

import classes from "./Homepage.module.css";

class Homepage extends React.Component {
  state = {
    orderList: [],
    filteredList: [],
    showNew: true,
    showPacked: true,
    showInTransit: true,
    showDelivered: true,
  };

  componentDidMount() {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((res) => {
        console.log(res.data);
        this.setState({ orderList: res.data, filteredList: res.data });
      })
      .catch();
  }

  renderTableRow = (obj) => {
    const day = obj.orderDate.split("-")[0];
    const month = obj.orderDate.split("-")[1];
    const year = obj.orderDate.split("-")[2];

    return (
      <tr className={classes.TableRow} key={obj.id}>
        <td className={classes.SecondaryText}>{obj.id}</td>
        <td className={classes.PrimaryText}>{obj.customerName}</td>
        <td className={classes.PrimaryText}>
          {`${day} ${month}, ${year}`} <br />
          <span className={classes.SecondaryText}>{obj.orderTime}</span>
        </td>
        <td className={classes.SecondaryText}>{`$${obj.amount}`}</td>
        <td className={classes.PrimaryText}>{obj.orderStatus}</td>
      </tr>
    );
  };

  getOrdersByStatus = (type, value) => {
    if (!value) {
      return [];
    }
    // eslint-disable-next-line default-case
    switch (type) {
      case "new":
        const arr = [...this.state.orderList].filter((item) => {
          return item.orderStatus === "New";
        });
        return arr;
      case "packed":
        return [...this.state.orderList].filter((item) => {
          return item.orderStatus === "Packed";
        });
      case "transit":
        return [...this.state.orderList].filter((item) => {
          return item.orderStatus === "InTransit";
        });
      case "delivered":
        return [...this.state.orderList].filter((item) => {
          return item.orderStatus === "Delivered";
        });
    }
  };

  onFilterCheckboxClick = (type, value) => {
    // eslint-disable-next-line default-case
    switch (type) {
      case "new":
        if (value) {
          var updatedVal = [
            ...this.getOrdersByStatus("new", value),
            ...this.getOrdersByStatus("packed", this.state.showPacked),
            ...this.getOrdersByStatus("transit", this.state.showInTransit),
            ...this.getOrdersByStatus("delivered", this.state.showDelivered),
          ];
          this.setState({ showNew: value, filteredList: [...updatedVal] });
        } else {
          var updatedVal = [...this.state.filteredList].filter((item) => {
            return item.orderStatus !== "New";
          });
          this.setState({ showNew: value, filteredList: updatedVal });
        }
        break;
      case "packed":
        if (value) {
          var updatedVal = [
            ...this.getOrdersByStatus("new", this.state.showNew),
            ...this.getOrdersByStatus("packed", value),
            ...this.getOrdersByStatus("transit", this.state.showInTransit),
            ...this.getOrdersByStatus("delivered", this.state.showDelivered),
          ];
          this.setState({ showPacked: value, filteredList: [...updatedVal] });
        } else {
          var updatedVal = [...this.state.filteredList].filter((item) => {
            return item.orderStatus !== "Packed";
          });
          this.setState({ showPacked: value, filteredList: updatedVal });
        }
        break;
      case "transit":
        if (value) {
          var updatedVal = [
            ...this.getOrdersByStatus("new", this.state.showNew),
            ...this.getOrdersByStatus("packed", this.state.showPacked),
            ...this.getOrdersByStatus("transit", value),
            ...this.getOrdersByStatus("delivered", this.state.showDelivered),
          ];
          this.setState({
            showInTransit: value,
            filteredList: [...updatedVal],
          });
        } else {
          var updatedVal = [...this.state.filteredList].filter((item) => {
            return item.orderStatus !== "InTransit";
          });
          this.setState({ showInTransit: value, filteredList: updatedVal });
        }
        break;
      case "delivered":
        if (value) {
          var updatedVal = [
            ...this.getOrdersByStatus("new", this.state.showNew),
            ...this.getOrdersByStatus("packed", this.state.showPacked),
            ...this.getOrdersByStatus("transit", this.state.showInTransit),
            ...this.getOrdersByStatus("delivered", value),
          ];
          this.setState({
            showDelivered: value,
            filteredList: [...updatedVal],
          });
        } else {
          var updatedVal = [...this.state.filteredList].filter((item) => {
            return item.orderStatus !== "Delivered";
          });
          this.setState({ showDelivered: value, filteredList: updatedVal });
        }
        break;
    }
  };

  render() {
    var tableRows = this.state.filteredList.map((item) => {
      return this.renderTableRow(item);
    });
    return (
      <div className={classes.PageWrapper}>
        <h1 className={classes.MainHeading}>Orders</h1>
        <div className={classes.OrdersWrapper}>
          <div className={classes.FilterWrapper}>
            <h3>Filters</h3>
            <div className={classes.FilterOptions}>
              <p className={classes.TotalCount}>
                Count: {this.state.filteredList.length}
              </p>
              <label className={classes.FilterCheckbox}>
                <input
                  onClick={(e) =>
                    this.onFilterCheckboxClick("new", e.target.checked)
                  }
                  type="checkbox"
                  checked={this.state.showNew}
                  name="orders-new"
                />
                New
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  onClick={(e) =>
                    this.onFilterCheckboxClick("packed", e.target.checked)
                  }
                  type="checkbox"
                  checked={this.state.showPacked}
                  name="orders-packed"
                />
                Packed
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  onClick={(e) =>
                    this.onFilterCheckboxClick("transit", e.target.checked)
                  }
                  type="checkbox"
                  checked={this.state.showInTransit}
                  name="orders-transit"
                />
                InTransit
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  onClick={(e) =>
                    this.onFilterCheckboxClick("delivered", e.target.checked)
                  }
                  type="checkbox"
                  checked={this.state.showDelivered}
                  name="orders-delivered"
                />
                Delivered
              </label>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <table className={classes.OrderTable}>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>

              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
