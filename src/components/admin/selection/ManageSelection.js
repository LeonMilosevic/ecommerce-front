import React, { useContext, useEffect } from "react";
// import context
import AdminContext from "../../../context/admin/AdminContext";

const ManageSelection = () => {
  const adminContext = useContext(AdminContext);
  const { initSelections, selections, removeSelection } = adminContext;

  useEffect(() => {
    initSelections();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center">Delete selections</h3>
      <hr />
      <div className="row">
        <div className="col-12">
          <ul className="list-group">
            {selections.map((s, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-center"
              >
                <span className="mr-5" style={{ color: "black" }}>
                  {s.name}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => removeSelection(s._id)}
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

export default ManageSelection;
