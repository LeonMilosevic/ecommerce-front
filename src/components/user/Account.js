import React, { Fragment } from "react";
// import helpers
import { LinkContainer } from "react-router-bootstrap";
import { signout, isAuthenticated } from "../auth";
// import components
import { FaRegAddressCard, FaHome, FaBox } from "react-icons/fa";
import AccountDetails from "./account/AccountDetails";
import AddressBook from "./account/AddressBook";
import MyOrders from "./account/MyOrders";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import icons
import { FaSignOutAlt } from "react-icons/fa";

const Account = () => {
  const {
    user: { name }
  } = isAuthenticated();

  const accountPageDisplay = () => (
    <Fragment>
      <h1 className="text-center mb-3">My Account</h1>
      <Tab.Container id="account-tabs" defaultActiveKey="first">
        <Row className="mb-5">
          <Col
            className="text-center account-col-header mb-1"
            sm={12}
            md={12}
            lg={12}
          >
            <p className="account-header-1 mt-1">Hello,</p>
            <p className="account-header-2">{name}</p>
          </Col>
          <Col className="account-col-tabs" sm={12} md={4} lg={4}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <div className="account-tab-div">
                    <FaRegAddressCard
                      className="mr-3"
                      style={{ fontSize: "36px" }}
                    />
                    <div className="account-tabs-p">
                      <p className="account-tabs-p--1">Account Details</p>
                      <p className="account-tabs-p--2">
                        View your personal details
                      </p>
                    </div>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <div className="account-tab-div">
                    <FaHome className="mr-3" style={{ fontSize: "36px" }} />
                    <div className="account-tabs-p">
                      <p className="account-tabs-p--1">Address book</p>
                      <p className="account-tabs-p--2">
                        View and update your address
                      </p>
                    </div>
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">
                  <div className="account-tab-div">
                    <FaBox className="mr-3" style={{ fontSize: "36px" }} />
                    <div className="account-tabs-p">
                      <p className="account-tabs-p--1">My orders</p>
                      <p className="account-tabs-p--2">
                        View your order history
                      </p>
                    </div>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <div
              className="account-icon-div"
              onClick={() =>
                signout(() => {
                  window.location.reload();
                })
              }
            >
              <span>
                <FaSignOutAlt className="account-signout-icon mr-3" />
              </span>
              <span className="account-signout-text">Log out</span>
            </div>
          </Col>
          <Col sm={12} md={8} lg={8} className="account-col-content">
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <AccountDetails />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <AddressBook />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <MyOrders />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Fragment>
  );

  return (
    <div className="container">
      <Breadcrumb>
        <LinkContainer to="/user/account">
          <Breadcrumb.Item>account</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      {accountPageDisplay()}
    </div>
  );
};

export default Account;
