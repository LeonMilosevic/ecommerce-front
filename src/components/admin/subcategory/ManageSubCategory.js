import React, { useContext, useEffect } from "react";
// import context
import AdminContext from "../../../context/admin/AdminContext";

const ManageSubCategory = () => {
  const adminContext = useContext(AdminContext);
  const { initSubCategories, subCategories, removeSubCategory } = adminContext;

  useEffect(() => {
    initSubCategories();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center">Delete subCategories</h3>
      <hr />
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {subCategories.map((c, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-center"
              >
                <span className="mr-5" style={{ color: "black" }}>
                  {c.name}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => removeSubCategory(c._id)}
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

export default ManageSubCategory;
