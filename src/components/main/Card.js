import React, { useContext } from "react";
//import helpers
import { Link } from "react-router-dom";
import { addItem, wishAdd } from "./cartHelpers";
// import state
import ProductContext from "../../context/product/ProductContext";
// import icons
import { FaHeart, FaShoppingBasket } from "react-icons/fa";

const Card = ({ product }) => {
  const productContext = useContext(ProductContext);

  const { handleToast, handleToastWish } = productContext;

  const onSaleDivBackground = () => (
    <div className="on-sale-banner-background"></div>
  );
  const onSaleDiv = () => (
    <div className="on-sale-banner">
      <span className="on-sale-banner--text">sale</span>
      <span className="on-sale-banner--circle"></span>
    </div>
  );

  const addToCart = () => {
    addItem(product);
    handleToast();
  };

  const addToWish = () => {
    wishAdd(product);
    handleToastWish();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${product.photoUrl[0]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "290px"
      }}
      className="card"
    >
      <Link className="card-click-link" to={`/product/${product._id}`}></Link>
      {product.onSale && onSaleDivBackground()}
      {product.onSale && onSaleDiv()}
      <div className="card-body-custom">
        <div>
          <p>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
          <p className={product.onSale ? "onsale-text" : ""}>
            &euro;
            {parseInt(product.price).toFixed(2)}
          </p>
        </div>

        <span className="mr-2">
          <Link onClick={addToCart} className="mx-2" to="#!">
            <FaShoppingBasket className="icon-custom" />
          </Link>

          <Link
            onClick={addToWish}
            className="mx-2 card-body-custom-wish"
            to="#!"
          >
            <FaHeart className="icon-custom" />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Card;
