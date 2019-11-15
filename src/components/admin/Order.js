import React, { useEffect, useState } from "react";
// import helpers
import {
  loadSingleOrder,
  getStatusValues,
  updateOrderStatus
} from "./apiAdmin";
import { isAuthenticated } from "../auth";
import moment from "moment";

const Order = props => {
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState([]);
  const [products, setProducts] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const orderId = props.match.params.orderId;
  const userId = isAuthenticated().user._id;
  const token = isAuthenticated().token;

  const loadOrder = () => {
    loadSingleOrder(userId, token, orderId).then(data => {
      if (data.error) return console.log(data.error);
      setOrder([data]);
      setAddress([data.address]);
      setProducts([data.products]);
    });

    getStatusValues(userId, token).then(data => {
      if (data.error) return console.log(data.error);

      setStatusValues(data);
    });
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const handleStatusChange = (e, itemId) => {
    updateOrderStatus(userId, token, itemId, e.target.value).then(data => {
      if (data.error) return console.log("status update failed");

      loadOrder();
      console.log("heelo");
    });
  };

  const showStatus = item => (
    <div className="form-group">
      <h6 className="mark mb-4">Status: {item.status}</h6>
      <select
        className="form-control"
        onChange={e => handleStatusChange(e, item._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, i) => (
          <option value={status} key={i}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-sm-12 col-md-6 col-lg-6">
          {order.map((item, i) => (
            <ul key={i} className="list-group">
              <li className="list-group-item list-group-item-secondary">
                order id: {item._id}
              </li>
              <li className="list-group-item list-group-item-secondary">
                user id: {item.user}
              </li>
              <li className="list-group-item list-group-item-primary">
                transaction id: {item.transaction_id}
              </li>
              <li className="list-group-item list-group-item-primary">
                amount: {item.amount.toFixed(2)} &euro;
              </li>
              <li className="list-group-item list-group-item-primary">
                created at: {moment(item.createdAt).fromNow()}
              </li>
              <li className="list-group-item list-group-item-warning">
                {showStatus(item)}
              </li>
            </ul>
          ))}
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 ">
          {address.map((item, i) => (
            <ul key={i} className="list-group">
              <li className="list-group-item list-group-item-secondary">
                address
              </li>
              <li className="list-group-item list-group-item-primary">
                First name: {item[0].firstName}
              </li>
              <li className="list-group-item list-group-item-primary">
                Last name: {item[0].lastName}
              </li>
              <li className="list-group-item list-group-item-primary">
                Mobile: {item[0].mobile}
              </li>
              <li className="list-group-item list-group-item-primary">
                Country: {item[0].country}
              </li>
              <li className="list-group-item list-group-item-primary">
                City: {item[0].city}
              </li>
              <li className="list-group-item list-group-item-primary">
                Postal code: {item[0].postalCode}
              </li>
              <li className="list-group-item list-group-item-primary">
                Full Address {item[0].fullAddress}
              </li>
            </ul>
          ))}
        </div>
      </div>
      <div className="row my-4">
        {products.map((item, i) => (
          <div key={i} className="col-4">
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary">
                products
              </li>
              <li className="list-group-item list-group-item-primary">
                product id: {item[0]._id}
              </li>
              <li className="list-group-item list-group-item-primary">
                product name: {item[0].name}
              </li>
              <li className="list-group-item list-group-item-primary">
                price: {item[0].price.toFixed(2)} &euro;
              </li>
              <li className="list-group-item list-group-item-primary">
                color: {item[0].color}
              </li>
              <li className="list-group-item list-group-item-primary">
                size: {item[0].size}
              </li>
              <li className="list-group-item list-group-item-primary">
                quantaty left: {item[0].quantity}
              </li>
              <li className="list-group-item list-group-item-primary">
                how much: {item[0].count}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
