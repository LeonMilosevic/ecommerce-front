import React, { useContext, useEffect } from "react";
// import context
import AdminContext from "../../../context/admin/AdminContext";
// import helpers
import { Link } from "react-router-dom";

const ManageProducts = () => {
  const adminContext = useContext(AdminContext);
  const { allProducts, initProducts, removeProduct } = adminContext;

  useEffect(() => {
    initProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">Manage Products</h2>
      <div className="row">
        <div className="col-12">
          <hr />
          <h3 className="text-center">Total products: {allProducts.length}</h3>
          <hr />
          <ul className="list-group">
            {allProducts.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-center"
              >
                <span className="mr-5" style={{ color: "black" }}>
                  {p.name}
                </span>
                <Link to={`/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => removeProduct(p._id)}
                  className="badge badge-danger badge-pill"
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
