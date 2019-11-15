import React, { useContext, useEffect } from "react";
// import context
import AdminContext from "../../../context/admin/AdminContext";

const ManageCategory = () => {
  const adminContext = useContext(AdminContext);
  const { initCategories, categories, removeCategory } = adminContext;

  useEffect(() => {
    initCategories();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center">Delete categories</h3>
      <hr />
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {categories.map((c, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-center"
              >
                <span className="mr-5" style={{ color: "black" }}>
                  {c.name}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => removeCategory(c._id)}
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

export default ManageCategory;
