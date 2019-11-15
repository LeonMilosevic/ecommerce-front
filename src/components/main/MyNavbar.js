import React, { Fragment, useContext } from "react";
// import helpers
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
// import components
import Search from "./Search";
// import state
import ProductContext from "../../context/product/ProductContext";
// import react-bootstrap
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

// import icons
import {
  FaHome,
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaBackward,
  FaQuestionCircle,
  FaPhone,
  FaSuitcase,
  FaShoppingBasket,
  FaCreditCard,
  FaSignOutAlt
} from "react-icons/fa";
// end of icons

const MyNavbar = ({ history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#bfbfbf" };
    } else {
      return { color: "#f2f2f0" };
    }
  };

  const productContext = useContext(ProductContext);
  const { searchState } = productContext;

  // when admin display
  const isAdmin = () => (
    <Dropdown className="mx-3">
      <Dropdown.Toggle as={Link} id="dropdown-custom-2" to="#!">
        <FaUserCircle style={{ fontSize: "26px" }} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-custom">
        <Dropdown.Item as={Link} to="/admin/dashboard" eventKey="1">
          <span className="dropdown-item-icons">
            <FaUserCircle />
          </span>
          Account
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            signout(() => {
              window.location.reload();
            })
          }
          eventKey="3"
        >
          <span className="dropdown-item-icons">
            <FaSignOutAlt style={{ color: "#e95b4e" }} />
          </span>
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  // when not signed in display
  const notSignedIn = () => (
    <Dropdown className="mx-3">
      <Dropdown.Toggle as={Link} id="dropdown-custom-2" to="#!">
        <FaUserCircle style={{ fontSize: "26px" }} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-custom">
        <div className="dropdownDiv">
          <Link className="dropdownLink dropdownLink-left" to="/signin">
            Sign in
          </Link>
          <span className="span-border"></span>
          <Link className="dropdownLink dropdownLink-right" to="/signup">
            Sign up
          </Link>
        </div>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="1">
          <span className="dropdown-item-icons">
            <FaBackward />
          </span>
          Return information
        </Dropdown.Item>
        <Dropdown.Item eventKey="2">
          <span className="dropdown-item-icons">
            <FaQuestionCircle />
          </span>
          Help
        </Dropdown.Item>
        <Dropdown.Item eventKey="3">
          <span className="dropdown-item-icons">
            <FaPhone />
          </span>
          Contact us
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="dropdown-item-last" eventKey="4">
          <span className="dropdown-item-last--icon">
            <FaSuitcase />
          </span>
          Work with us
          <div className="dropdown-item-last--span">Join our team</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  // end of not signed in display

  // when signed in display
  const signedIn = () => (
    <Dropdown className="mx-3">
      <Dropdown.Toggle as={Link} id="dropdown-custom-2" to="#!">
        <FaUserCircle style={{ fontSize: "26px" }} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-custom">
        <Dropdown.Item as={Link} to="/user/account" eventKey="1">
          <span className="dropdown-item-icons">
            <FaUserCircle />
          </span>
          Account
        </Dropdown.Item>
        <Dropdown.Item eventKey="2">
          <span className="dropdown-item-icons">
            <FaShoppingBasket />
          </span>
          Purchase history
        </Dropdown.Item>
        <Dropdown.Item eventKey="3">
          <span className="dropdown-item-icons">
            <FaCreditCard />
          </span>
          Payment methods
        </Dropdown.Item>
        <Dropdown.Item eventKey="3">
          <span className="dropdown-item-icons">
            <FaQuestionCircle />
          </span>
          Help
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() =>
            signout(() => {
              window.location.reload();
            })
          }
          eventKey="3"
        >
          <span className="dropdown-item-icons">
            <FaSignOutAlt style={{ color: "#e95b4e" }} />
          </span>
          Sign out
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className="dropdown-item-last" eventKey="4">
          Work with us
          <div className="dropdown-item-last--span">Join our team</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  // end of when signed in display

  return (
    <Fragment>
      <Navbar
        style={{ backgroundColor: "#1c252a" }}
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Container>
          <Link to="/">
            <Navbar.Brand>Clothify</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Link style={isActive(history, "/")} to="/">
                <FaHome style={{ fontSize: "26px" }} />
              </Link>
            </Nav>
            <Search />

            <div
              style={
                searchState.results.length > 0
                  ? { display: "block" }
                  : { display: "none" }
              }
              id="search-box"
              className="search-box"
              onMouseLeave={() => {
                document.getElementById("search-box").style.display = "none";
              }}
            >
              <ul>
                {searchState.results.map((product, i) => (
                  <Link
                    className="search-box--links"
                    to={`/product/${product._id}`}
                    key={i}
                  >
                    <span>{product.name}</span>
                    <span className="ml-5">{product.category.name}</span>
                    <span className="ml-5">
                      {product.subCategory == null
                        ? ""
                        : product.subCategory.name}
                    </span>
                    <span className="ml-5">{product.brand}</span>
                  </Link>
                ))}
              </ul>
            </div>

            <Nav>
              <Link
                style={isActive(history, "/wishlist")}
                className="mx-3"
                to="/wishlist"
              >
                <FaHeart style={{ fontSize: "26px", color: "#e95b4e" }} />
              </Link>
              <Link
                style={isActive(history, "/cart")}
                className="mx-3"
                to="/cart"
              >
                <sup>
                  <small className="cart-counter-badge">{itemTotal()}</small>
                </sup>
                <FaShoppingBag style={{ fontSize: "26px" }} />
              </Link>
              {/*check if signed in and display nav*/}
              {!isAuthenticated() && notSignedIn()}
              {isAuthenticated() &&
                isAuthenticated().user.role === 0 &&
                signedIn()}
              {/* check if admin */}
              {isAuthenticated() &&
                isAuthenticated().user.role === 1 &&
                isAdmin()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default withRouter(MyNavbar);
