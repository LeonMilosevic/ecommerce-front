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
    <Dropdown className="right-links">
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
    <Dropdown className="right-links">
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
        <li className="dropdown-item">
          <span className="dropdown-item-icons">
            <FaBackward />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/about">
              Return information
            </Link>
          </span>
        </li>
        <li className="dropdown-item">
          <span className="dropdown-item-icons">
            <FaQuestionCircle />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/about">
              Help
            </Link>
          </span>
        </li>
        <li className="dropdown-item">
          <span className="dropdown-item-icons">
            <FaPhone />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/about">
              Contact us
            </Link>
          </span>
        </li>
        <Dropdown.Divider />
        <li className="dropdown-item dropdown-item-last">
          <span className="dropdown-item-last--icon">
            <FaSuitcase />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/about">
              Work with us
            </Link>
          </span>

          <div className="dropdown-item-last--span">Join our team</div>
        </li>
      </Dropdown.Menu>
    </Dropdown>
  );
  // end of not signed in display

  // when signed in display
  const signedIn = () => (
    <Dropdown className="right-links">
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
        <li className="dropdown-item">
          <span className="dropdown-item-icons">
            <FaShoppingBasket />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/user/account">
              Purchase history
            </Link>
          </span>
        </li>
        <Dropdown.Item eventKey="3">
          <span className="dropdown-item-icons">
            <FaCreditCard />
          </span>
          Payment methods
        </Dropdown.Item>
        <li className="dropdown-item">
          <span className="dropdown-item-icons">
            <FaQuestionCircle />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/about">
              Help
            </Link>
          </span>
        </li>
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
        <li className="dropdown-item dropdown-item-last">
          <span className="dropdown-item-last--icon">
            <FaSuitcase />
          </span>
          <span>
            <Link className="jumbotron-link-no-style" to="/about">
              Work with us
            </Link>
          </span>

          <div className="dropdown-item-last--span">Join our team</div>
        </li>
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
        <Container className="container-navbar">
          <Link to="/">
            <Navbar.Brand>Clothify</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="navbar-home-icon">
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
                className="right-links"
                to="/wishlist"
              >
                <FaHeart style={{ fontSize: "26px", color: "#e95b4e" }} />
              </Link>
              <Link
                style={isActive(history, "/cart")}
                className="right-links"
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
