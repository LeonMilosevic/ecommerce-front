import React, { useContext } from "react";
// import helpers
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import state
import ProductContext from "../../context/product/ProductContext";
import ShopContext from "../../context/shop/ShopContext";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ShopMain = () => {
  const shopContext = useContext(ShopContext);
  const productContext = useContext(ProductContext);
  const { categories } = productContext;
  const { handleSetSubCategory } = shopContext;
  return (
    <div className="container">
      <Breadcrumb>
        <LinkContainer to="/home">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/shop">
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      <div
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://res.cloudinary.com/clothify/image/upload/v1574116778/wish_fnfavj.jpg)`
        }}
        className="jumbotron jumbotron-background"
      >
        <h1 className="jumbotron-header mb-4">Choose a category</h1>
        {categories.map((c, i) => (
          <Link
            key={i}
            className="jumbotron-link-no-style btn product-btn shop-button-custom"
            onClick={() => handleSetSubCategory(c._id, c.name)}
            to={`/shop/${c._id}`}
          >
            {c.name}
          </Link>
        ))}
      </div>
      <div style={{ height: "300px" }}></div>
    </div>
  );
};

export default ShopMain;
