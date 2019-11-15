import React, { useContext, Fragment } from "react";
import AuthContext from "../../../../context/auth/AuthContext";
import { Link } from "react-router-dom";
// import boostrap
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import components

const FormSignup = () => {
  const authContext = useContext(AuthContext);
  const {
    name,
    email,
    password,
    passwordConfirm,
    showError,
    showSuccess,
    handleChange,
    clickSubmit,
    isLoading
  } = authContext;
  return (
    <Fragment>
      <Container>
        <p className="auth-redirect-p pt-5 text-center">
          Already have an account?{" "}
          <Link className="product-link" to="/signin">
            Sign in
          </Link>
        </p>
        <h4 className="center pt-5 mb-5">Sign up with email</h4>
        {showError()}
        {showSuccess()}
        <Form>
          <Form.Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group className="custom-auth-form">
                <Form.Label className="form-label-custom">
                  Email address
                </Form.Label>
                <Form.Control
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group className="custom-auth-form mt-4">
                <Form.Label className="form-label-custom">Name</Form.Label>
                <Form.Control
                  onChange={handleChange("name")}
                  type="text"
                  value={name}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group className="custom-auth-form mt-4">
                <Form.Label className="form-label-custom">Password</Form.Label>
                <Form.Control
                  onChange={handleChange("password")}
                  type="password"
                  value={password}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group className="custom-auth-form mt-4">
                <Form.Label className="form-label-custom">
                  confirm password
                </Form.Label>
                <Form.Control
                  onChange={handleChange("passwordConfirm")}
                  type="password"
                  value={passwordConfirm}
                />
              </Form.Group>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="text-center"
            >
              {isLoading()}
              <Button
                className="btn-custom mt-4 mb-2"
                onClick={clickSubmit}
                type="submit"
              >
                Sign up
              </Button>
            </Col>
            <p
              className="mb-5"
              style={{
                margin: "0 auto",
                fontSize: "10px",
                color: "#1C252A"
              }}
            >
              By creating your account, you agree to our
              <Link
                style={{ fontSize: "10px" }}
                className="password-link"
                to="/"
              >
                Terms and Conditions &amp; Privacy Policy
              </Link>
            </p>
          </Form.Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default FormSignup;
