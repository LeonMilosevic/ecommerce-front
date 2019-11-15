import React, { useContext } from "react";
//import helpers
import { Link } from "react-router-dom";
import { addItem, removeWish, getWish } from "./cartHelpers";
// import state
import ProductContext from "../../context/product/ProductContext";
// import icons
import { FaShoppingBasket, FaTrash } from "react-icons/fa";

const WishlistCard = ({ setWishList, product }) => {
  const productContext = useContext(ProductContext);

  const { handleToast } = productContext;

  const onSaleDivBackground = () => (
    <div className="on-sale-banner-background"></div>
  );
  const onSaleDiv = () => (
    <div className="on-sale-banner">
      <span className="on-sale-banner--text">sale</span>
      <span className="on-sale-banner--circle"></span>
    </div>
  );

  const addToCart = id => {
    addItem(product);
    handleToast();
    removeWish(id, () => {
      setWishList(getWish());
    });
  };

  const removeFromWishlist = id => {
    removeWish(id, () => {
      setWishList(getWish());
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${product.photoUrl[0]})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
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
          <Link
            id="card-shop"
            onClick={() => addToCart(product._id)}
            className="mx-2"
            to="#!"
          >
            <FaShoppingBasket className="icon-custom" />
          </Link>

          <Link
            onClick={() => removeFromWishlist(product._id)}
            className="mx-2 card-body-custom-wish"
            to="#!"
          >
            <FaTrash className="icon-custom" style={{ color: "#e95b4e" }} />
          </Link>
        </span>
      </div>
    </div>
  );
};

export default WishlistCard;
