import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const AdminDashboard = () => {
  const {
    user: { name }
  } = isAuthenticated();

  const productLinks = () => (
    <ul className="list-group">
      <li className="text-center list-group-item list-group-item-info">
        Product
      </li>
      <li className="list-group-item list-group-item-info">
        <Link to="/create/product">Create Product</Link>
      </li>
      <li className="list-group-item list-group-item-info">
        <Link to="/manage/product">Manage Products</Link>
      </li>
    </ul>
  );

  const categoryLinks = () => (
    <ul className="list-group">
      <li className="list-group-item list-group-item-info">Category</li>
      <li className="list-group-item list-group-item-info">
        <Link to="/create/category">Create Category</Link>
      </li>
      <li className="list-group-item list-group-item-info">
        <Link to="/manage/category">Manage Category</Link>
      </li>
    </ul>
  );

  const subCategoryLinks = () => (
    <ul className="list-group">
      <li className="list-group-item list-group-item-info">Sub Category</li>
      <li className="list-group-item list-group-item-info">
        <Link to="/create/subcategory">Create Sub Category</Link>
      </li>
      <li className="list-group-item list-group-item-info">
        <Link to="/manage/subcategory">manage Sub Category</Link>
      </li>
    </ul>
  );

  const selectionLinks = () => (
    <ul className="list-group">
      <li className="list-group-item list-group-item-info">Selections</li>
      <li className="list-group-item list-group-item-info">
        <Link to="/create/selection">Create selection</Link>
      </li>
      <li className="list-group-item list-group-item-info">
        <Link to="/manage/selection">Manage Selections</Link>
      </li>
    </ul>
  );

  const orderLinks = () => (
    <ul className="list-group">
      <li className="list-group-item list-group-item-info">Orders</li>
      <li className="list-group-item list-group-item-info">
        <Link to="/admin/orders">Orders</Link>
      </li>
    </ul>
  );

  return (
    <div className="container text-center">
      <div className="row mb-5">
        <div className="col">
          <h1>Admin Dashboard</h1>
          <h2>Hi {name}</h2>
        </div>
      </div>
      <div className="row pt-5">
        <div className="col">{categoryLinks()}</div>
        <div className="col">{productLinks()}</div>
        <div className="col">{selectionLinks()}</div>
        <div className="col">{orderLinks()}</div>
        <div className="col">{subCategoryLinks()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
