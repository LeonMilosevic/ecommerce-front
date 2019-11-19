import React, { useState } from "react";
import AuthContext from "./AuthContext";
import { Link, Redirect } from "react-router-dom";
import {
  signup,
  signin,
  authenticate,
  isAuthenticated
} from "../../components/auth";
// import componetns
import Spinner from "../../components/ui/Spinner";

const AuthState = props => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    error: "",
    success: false,
    loading: false,
    redirectToRefferer: false
  });
  // destructure
  const {
    name,
    email,
    password,
    error,
    success,
    redirectToRefferer,
    passwordConfirm,
    loading
  } = values;

  // grab input and put in state
  const handleChange = name => event => {
    setValues({ ...values, error: "", [name]: event.target.value });
  };
  // submit signup function
  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    if (password !== passwordConfirm) {
      setValues({ ...values, loading: false, error: "passwords dont match" });
      return showError();
    }
    signup({ name, email, password }).then(data => {
      if (data.error)
        return setValues({
          ...values,
          error: "Email already exists.",
          success: false,
          loading: false
        });
      if (data.errors)
        return setValues({
          ...values,
          error: data.errors,
          success: false,
          loading: false
        });

      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        error: "",
        success: true,
        loading: false
      });
    });
  };
  // submit sign in function
  const clickSubmitSignin = event => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    signin({ email, password }).then(data => {
      if (data.error)
        return setValues({
          ...values,
          error: data.error,
          loading: false
        });

      authenticate(data, () => {
        setValues({
          ...values,
          redirectToRefferer: true,
          loading: false
        });
      });
    });
  };

  const showError = () => (
    <div
      className="text-center alert alert-danger mx-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info mx-3"
      style={{ display: success ? "" : "none" }}
    >
      Account created. Please <Link to="/signin">sign in</Link>
    </div>
  );

  const redirectuser = () => {
    if (redirectToRefferer) {
      if (isAuthenticated().user && isAuthenticated().user.role === 1)
        return <Redirect to="/admin/dashboard" />;
      else {
        window.location.reload();
        return <Redirect to="/user/account" />;
      }
    }
    if (isAuthenticated()) return <Redirect to="/" />;
  };

  const isLoading = () => loading && <Spinner />;

  return (
    <AuthContext.Provider
      value={{
        name: values.name,
        email: values.email,
        password: values.password,
        success: values.success,
        error: values.error,
        passwordConfirm: values.passwordConfirm,
        handleChange,
        clickSubmit,
        showError,
        showSuccess,
        clickSubmitSignin,
        redirectuser,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
