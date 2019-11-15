import React from "react";
// import components
import FormSignin from "../forms/auth/FormSignin";
import FormSignup from "../forms/auth/FormSignup";
// import bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const TabCustom = props => {
  const tabsStyle = {
    width: "60%",
    margin: "0 auto"
  };
  const tabStyle = {
    textAlign: "left",
    backgroundColor: "#f2f2f0",
    width: "60%",
    margin: "0 auto"
  };
  return (
    <Row>
      <Col sm={12} md={12} lg={12}>
        <Tabs
          className="justify-content-center"
          defaultActiveKey={props.default}
          id="tab-auth"
          style={tabsStyle}
        >
          <Tab
            eventKey="signin"
            title="Sign in"
            style={tabStyle}
            className="mb-5"
          >
            <FormSignin />
          </Tab>
          <Tab
            eventKey="signup"
            title="New to Clothify?"
            style={tabStyle}
            className="mb-5"
          >
            <FormSignup />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default TabCustom;
