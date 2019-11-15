import React from "react";
import { LinkContainer } from "react-router-bootstrap";
// import components
import TabCustom from "./tabs/TabCustom";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
const Signup = () => {
  return (
    <div className="container">
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/signup">
          <Breadcrumb.Item>Signup</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      <TabCustom default={"signup"} />
    </div>
  );
};

export default Signup;
