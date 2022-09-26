import React from "react";
import Axios from "axios";

import classes from "./ProductListingPage.module.css";

class ProductListingPage extends React.Component {
  state = {
    productList: [],
    filteredList: [],
    showExpired: true,
    showLowStock: true,
  };

  componentDidMount() {
    Axios.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((res) => {
        console.log(res.data);
        const updatedData = [...res.data].map((item) => {
          return {
            ...item,
            isExpired:
              new Date(item.expiryDate).getTime() < new Date().getTime(),
            isLowStock: item.stock < 100,
          };
        });
        this.setState({
          productList: [...updatedData],
          filteredList: [...updatedData],
        });
      })
      .catch();
  }

  renderTableRow = (obj) => {
    const day = obj.expiryDate.split("-")[0];
    const month = obj.expiryDate.split("-")[1];
    const year = obj.expiryDate.split("-")[2];

    return (
      <tr
        className={[
          classes.TableRow,
          obj.isExpired ? classes.ExpiredRow : null,
        ].join(" ")}
        key={obj.id}
      >
        <td className={classes.SecondaryText}>{obj.id}</td>
        <td className={classes.PrimaryText}>{obj.medicineName}</td>
        <td className={classes.SecondaryText}>{obj.medicineBrand}</td>
        <td className={classes.PrimaryText}>{`${day} ${month}, ${year}`}</td>
        <td className={classes.SecondaryText}>{`$${obj.unitPrice}`}</td>
        <td className={classes.SecondaryText}>{obj.stock}</td>
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
          this.setState({
            showExpired: value,
            filteredList: [
              ...updatedVal,
              ...this.getOrdersByStatus("remaining", value),
            ],
          });
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
          this.setState({
            showLowStock: value,
            filteredList: [
              ...updatedVal,
              ...this.getOrdersByStatus("remaining", value),
            ],
          });
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
        <h1 className={classes.MainHeading}>Products</h1>
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
                    this.onFilterCheckboxClick("expired", e.target.checked)
                  }
                  type="checkbox"
                  checked={this.state.showExpired}
                  type="checkbox"
                  name="product-expired"
                />
                Expired
              </label>
              <label className={classes.FilterCheckbox}>
                <input
                  onClick={(e) =>
                    this.onFilterCheckboxClick("lowStock", e.target.checked)
                  }
                  type="checkbox"
                  checked={this.state.showLowStock}
                  name="product-low-stock"
                />
                Low Stock
              </label>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <table className={classes.OrderTable}>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th style={{ minWidth: "100px" }}>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>

              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductListingPage;
