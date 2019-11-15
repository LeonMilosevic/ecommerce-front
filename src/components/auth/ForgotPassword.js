import React, { useState } from "react";
// helpers
import { requestPasswordUpdateToken } from "./index";
// import components
import Spinner from "../ui/Spinner";

const ForgotPassword = () => {
  const [passwordState, setPasswordState] = useState({
    email: "",
    error: "",
    success: "",
    loading: false
  });

  const handleChange = name => e => {
    setPasswordState({
      ...passwordState,
      error: "",
      success: "",
      [name]: e.target.value
    });
  };

  const sendEmail = e => {
    e.preventDefault();
    if (passwordState.email === "")
      return setPasswordState({
        ...passwordState,
        error: "",
        success: ""
      });
    setPasswordState({ ...passwordState, loading: true });
    requestPasswordUpdateToken({ email: passwordState.email })
      .then(data => {
        if (data.error)
          return setPasswordState({
            ...passwordState,
            error: data.error,
            loading: false
          });

        setPasswordState({
          ...passwordState,
          success: "email sent",
          loading: false
        });
      })
      .catch(error => console.log(error));
  };

  const showError = () => (
    <div
      className="text-center alert alert-danger"
      style={{ display: passwordState.error ? "" : "none" }}
    >
      {passwordState.error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: passwordState.success ? "" : "none" }}
    >
      {passwordState.success}
    </div>
  );

  return (
    <div className="container text-center">
      <div className="row mt-5">
        <div className="col-12">
          <h2>Please provide your email address</h2>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3"></div>
        <div className="col-6">
          {passwordState.loading && <Spinner />}
          {showError()}
          {showSuccess()}
          <form className="mt-5" onSubmit={sendEmail}>
            <input
              className="form-control"
              value={passwordState.email}
              name="email"
              type="text"
              onChange={handleChange("email")}
            />
            <button className="btn btn-custom my-5">Send email</button>
          </form>
        </div>
        <div className="col-3 mb-5"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
