import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
//import state
import AuthContext from "../../../../context/auth/AuthContext";
// import boostrap
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import components
import Facebook from "../../Facebook";

const FormSignin = () => {
  const authContext = useContext(AuthContext);
  const {
    email,
    password,
    showError,
    handleChange,
    clickSubmitSignin,
    isLoading,
    redirectuser
  } = authContext;

  return (
    <Fragment>
      {redirectuser()}
      <Container>
        <p className="auth-redirect-p pt-5 text-center">
          Don't have an account?{" "}
          <Link className="product-link" to="/signup">
            Sign up
          </Link>
        </p>
        <h4 className="center pt-2">Sign in With...</h4>
        <div className="mt-3 center">
          <Facebook />
        </div>
        <h4 className="center mt-5">OR</h4>
        {showError()}
        <p style={{ fontSize: "24px" }} className="center mt-5">
          Log in with your email address
        </p>
        <Form>
          <Form.Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Group className="custom-auth-form mt-4">
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
                <Form.Label className="form-label-custom">Password</Form.Label>
                <Form.Control
                  onChange={handleChange("password")}
                  type="password"
                  value={password}
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
                onClick={clickSubmitSignin}
                type="submit"
              >
                Sign in
              </Button>
            </Col>
            <Link className="password-link mb-5" to="/forgot-password">
              Forgot your password?
            </Link>
          </Form.Row>
        </Form>
      </Container>
    </Fragment>
  );
};

export default FormSignin;
