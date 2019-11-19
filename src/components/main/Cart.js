import React, { useEffect, useContext } from "react";
// import state
import CartContext from "../../context/cart/CartContext";
//import helpers
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { getCart, removeCart, wishAdd } from "./cartHelpers";
// import components
import Layout from "./Layout";
import Checkout from "./Checkout";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
// import icons
import {
  FaShoppingBasket,
  FaTrash,
  FaHeart,
  FaPlus,
  FaMinus,
  FaUndo
} from "react-icons/fa";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const {
    cartItems,
    setCartItems,
    incrementProductCount,
    decrementProductCount,
    getTotal
  } = cartContext;

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const addToWish = item => {
    wishAdd(item);
    removeCart(item._id, () => setCartItems(getCart()));
  };

  const emptyBag = () => (
    <>
      <Layout
        bgimg={`https://res.cloudinary.com/clothify/image/upload/v1574116544/cart_ninize.jpg`}
        header={"My bag"}
        // @ts-ignore
        icon={
          <FaShoppingBasket style={{ fontSize: "60px", color: "#84bacd" }} />
        }
        name={"Your shopping bag is empty"}
        // @ts-ignore
        link={
          <p className="mb-4">
            <Link to="/wishlist" className="jumbotron-link">
              My wishlist
            </Link>
          </p>
        }
        // @ts-ignore
        buttonName={
          <button className="my-3 btn product-btn">
            <Link className="jumbotron-link-no-style" to="/shop">
              Start shopping
            </Link>
          </button>
        }
      />
      <div style={{ height: "100px" }}></div>
    </>
  );

  const showItems = () => {
    return (
      <>
        <Layout
          jumboPadding={"2%"}
          bgimg={`https://res.cloudinary.com/clothify/image/upload/v1574116544/cart_ninize.jpg`}
          header={"My bag"}
          // @ts-ignore
          icon={
            <FaShoppingBasket style={{ fontSize: "60px", color: "#84bacd" }} />
          }
          name={`${cartItems.length} items in your bag`}
        ></Layout>
        <div style={{ margin: "-20px 0 20px 0" }} className="row">
          <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 cart-items-card">
            {cartItems.map((item, index) => (
              <div className="container card-container my-2" key={index}>
                <div className="row">
                  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 cart-card mb-2">
                    <img
                      src={item.photoUrl[0]}
                      alt="cart"
                      className="cart-image"
                    />
                  </div>
                  <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 cart-card mb-2">
                    <h3 className="ml-2 cart-header">{item.name}</h3>
                    <h3
                      className={
                        item.onSale ? `ml-2 cart-price-sale` : "ml-2 cart-price"
                      }
                    >
                      &euro; {item.price.toFixed(2)}
                    </h3>
                    <div className="cart-info ml-4">
                      <span className="cart-info-span">{item.color}</span>
                      <span className="cart-info-span--line"></span>
                      <span className="cart-info-span">{item.size}</span>
                      <span className="cart-info-span--line"></span>
                      <span className="cart-info-span">
                        Qty
                        <span
                          className="ml-3"
                          onClick={() => decrementProductCount(item._id)}
                        >
                          <FaMinus style={{ fontSize: "12px" }} />
                        </span>
                        <span className="mx-1">{item.count}</span>
                        <span onClick={() => incrementProductCount(item._id)}>
                          <FaPlus style={{ fontSize: "12px" }} />
                        </span>
                      </span>
                    </div>
                    <div className="cart-icons">
                      <div className="mb-2 text-right">
                        <span className="cart-icons-text mr-2">remove</span>
                        <FaTrash
                          onClick={() =>
                            removeCart(item._id, () => setCartItems(getCart()))
                          }
                          className="cart-icons--trash"
                        />
                      </div>
                      <div>
                        <span className="cart-icons-text mr-2">
                          move to wishlist
                        </span>
                        <FaHeart
                          onClick={() => addToWish(item)}
                          className="cart-icons--heart"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="container card-container card-container--total my-2">
              <div className="cart-total-price">
                <span className="cart-total-price--text mr-5">
                  Total price:
                </span>
                <span className="cart-total-price--text">
                  &euro; {getTotal().toFixed(2)}
                </span>
              </div>
            </div>
            <div className="cart-return-div">
              <h5>
                <span className="cart-icon--return mr-2">
                  <FaUndo />
                </span>
                <span className="cart-h5--heading">Free &amp; easy</span>{" "}
                returns
              </h5>
              <p className="cart-p--return">
                We provide free and easy returns,
                <br />
                if you would like to find out more about our return policy, you
                can check
              </p>
              <div style={{ display: "inline-block" }}>
                <Link
                  style={{ color: "#f2f2f0" }}
                  className="product-link product-link--cart-return"
                  to="/return"
                >
                  More info
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4 cart-items-checkout">
            <Checkout />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <Breadcrumb>
        <LinkContainer to="/home">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/cart">
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      {cartItems.length > 0 ? showItems() : emptyBag()}
    </div>
  );
};

export default Cart;
