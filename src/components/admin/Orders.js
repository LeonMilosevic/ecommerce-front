import React, { useContext, useEffect } from "react";
// import helpers
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import moment from "moment";
// import context
import AdminContext from "../../context/admin/AdminContext";

const Orders = () => {
  const adminContext = useContext(AdminContext);
  const { initOrders, orders } = adminContext;

  useEffect(() => {
    initOrders(isAuthenticated().user._id, isAuthenticated().token);
  }, []);

  const loadOrders = () => {
    if (orders.orderItems.length > 0) {
      return (
        <>
          <h1 className="text-danger text-center">
            Total orders: {orders.orderItems.length}
          </h1>
          {orders.orderItems.map((order, i) => (
            <div key={i} className="row">
              <div className="col-12">
                <ul className="list-group">
                  <li className="list-group-item list-group-item-secondary">
                    {order._id}
                  </li>
                  <li className="list-group-item list-group-item-primary">
                    email: {order.email}
                  </li>
                  <li className="list-group-item list-group-item-primary">
                    amount: {order.amount}
                  </li>
                  <li className="list-group-item list-group-item-primary">
                    created: {moment(order.createdAt).fromNow()}
                  </li>
                  <li
                    className={
                      order.status === "Not processed" ||
                      order.status === "Processing"
                        ? "list-group-item list-group-item-danger"
                        : "list-group-item list-group-item-success"
                    }
                  >
                    status: {order.status}
                  </li>
                  <li className="list-group-item list-group-item-info">
                    details:{" "}
                    <Link to={`/admin/orders/${order._id}`}>View Details</Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </>
      );
    } else {
      return <h1 className="text-danger text-center">No orders</h1>;
    }
  };
  return <div className="container">{loadOrders()}</div>;
};

export default Orders;
