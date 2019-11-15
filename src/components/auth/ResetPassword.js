import React, { useState } from "react";
// import helpers
import { passwordUpdate } from "./index";
// import components
import Spinner from "../ui/Spinner";

const ResetPassword = props => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
    error: "",
    success: "",
    loading: false
  });

  const handleChange = name => e => {
    setNewPassword({
      ...newPassword,
      error: "",
      success: "",
      [name]: e.target.value
    });
  };

  const submitNewPassword = e => {
    e.preventDefault();
    if (newPassword.password !== newPassword.confirmPassword)
      return setNewPassword({
        ...newPassword,
        error: "Passwords do not match"
      });

    setNewPassword({ ...newPassword, loading: true });
    passwordUpdate(
      newPassword.password,
      props.location.pathname.replace("/forgot-password-form/", "")
    ).then(data => {
      if (data.error)
        return setNewPassword({
          ...newPassword,
          error: data.error,
          loading: false
        });

      setNewPassword({ ...newPassword, success: data.msg, loading: false });
    });
  };

  const showError = () => (
    <div
      className="text-center alert alert-danger"
      style={{ display: newPassword.error ? "" : "none" }}
    >
      {newPassword.error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: newPassword.success ? "" : "none" }}
    >
      {newPassword.success}
    </div>
  );

  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col-12">
          <h2>Please enter a new password</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3"></div>
        <div className="col-6">
          {newPassword.loading && <Spinner />}
          {showError()}
          {showSuccess()}
          <form className="mt-5" onSubmit={submitNewPassword}>
            <input
              name="password"
              type="password"
              className="form-control my-3"
              placeholder="Enter new password"
              onChange={handleChange("password")}
            />
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              onChange={handleChange("confirmPassword")}
            />
            <button className="btn btn-custom my-5">Update password</button>
          </form>
        </div>
        <div className="col-3 mb-5"></div>
      </div>
    </div>
  );
};

export default ResetPassword;
