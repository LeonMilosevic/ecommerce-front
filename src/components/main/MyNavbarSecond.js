import React, { Fragment, useState, useContext } from "react";
// import helpers
import { Link } from "react-router-dom";
// import state
import ProductContext from "../../context/product/ProductContext";
import ShopContext from "../../context/shop/ShopContext";
// import react bootstrap
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const MyNavbarSecond = () => {
  const [key, setKey] = useState("home");
  const shopContext = useContext(ShopContext);
  const productContext = useContext(ProductContext);
  const { categories, mans, womans, children } = productContext;
  const { handleSetSubCategory } = shopContext;
  return (
    <Fragment>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
        className="tabs-custom"
      >
        <Tab title="New in" eventKey="new">
          <div style={{ padding: "0" }} className="tab-dropdown-custom">
            <div style={{ padding: "0" }} className="container">
              <nav style={{ padding: 0 }} className="navbar navbar-expand-lg">
                {categories.map((c, i) => (
                  <Link
                    onClick={() => handleSetSubCategory(c._id, c.name)}
                    key={i}
                    style={{ backgroundColor: "#595959" }}
                    to={`/shop/${c._id}`}
                    className="nav-custom-links nav-item nav-link"
                  >
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </Tab>
        <Tab title="Man" eventKey="man">
          <div style={{ padding: "0" }} className="tab-dropdown-custom">
            <div style={{ padding: "0" }} className="container">
              <nav style={{ padding: 0 }} className="navbar navbar-expand-lg">
                {mans.map((m, i) => (
                  <Link
                    onClick={() =>
                      handleSetSubCategory(m._id, m.name, m.category)
                    }
                    key={i}
                    style={{ backgroundColor: "#595959" }}
                    to={`/shop/${m._id}`}
                    className="nav-custom-links nav-item nav-link"
                  >
                    {m.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </Tab>
        <Tab title="Woman" eventKey="woman">
          <div style={{ padding: "0" }} className="tab-dropdown-custom">
            <div style={{ padding: "0" }} className="container">
              <nav style={{ padding: 0 }} className="navbar navbar-expand-lg">
                {womans.map((w, i) => (
                  <Link
                    onClick={() =>
                      handleSetSubCategory(w._id, w.name, w.category)
                    }
                    key={i}
                    style={{ backgroundColor: "#595959" }}
                    to={`/shop/${w._id}`}
                    className="nav-custom-links nav-item nav-link"
                  >
                    {w.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </Tab>
        <Tab title="Children" eventKey="children">
          <div style={{ padding: "0" }} className="tab-dropdown-custom">
            <div style={{ padding: "0" }} className="container">
              <nav style={{ padding: 0 }} className="navbar navbar-expand-lg">
                {children.map((c, i) => (
                  <Link
                    onClick={() =>
                      handleSetSubCategory(c._id, c.name, c.category)
                    }
                    key={i}
                    style={{ backgroundColor: "#595959" }}
                    to={`/shop/${c._id}`}
                    className="nav-custom-links nav-item nav-link"
                  >
                    {c.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default MyNavbarSecond;
