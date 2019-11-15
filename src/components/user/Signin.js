import React from "react";
import { LinkContainer } from "react-router-bootstrap";
// import components
import TabCustom from "./tabs/TabCustom";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";

const Signin = () => {
  return (
    <div className="container">
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/signin">
          <Breadcrumb.Item>signin</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      <TabCustom default={"signin"} />
    </div>
  );
};

export default Signin;
