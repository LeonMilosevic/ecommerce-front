import React, { useContext, useEffect } from "react";
// import components
import Facebook from "../user/Facebook";
import DropIn from "braintree-web-drop-in-react";
// import state
import CartContext from "../../context/cart/CartContext";
// import helpers
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const Checkout = () => {
  const cartContext = useContext(CartContext);

  const {
    getToken,
    cartItems,
    checkoutData,
    setCheckoutData,
    buy,
    handleChangeAddress,
    getTotal,
    showError,
    showSuccess,
    isLoading
  } = cartContext;

  useEffect(() => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    getToken(userId, token);
  }, []);

  const showDropIn = () => (
    <div onBlur={() => setCheckoutData({ ...checkoutData, error: "" })}>
      {showSuccess(checkoutData.success)}
      {showError(checkoutData.error)}
      {isLoading()}
      {checkoutData.clientToken !== null && cartItems.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: checkoutData.clientToken,
              card: {
                cardholderName: {
                  required: true
                }
              },
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instance => (checkoutData.instance = instance)}
          />
          <button
            onClick={buy}
            style={{ width: "100%" }}
            className="btn cart-checkout--button mb-3"
          >
            Checkout
          </button>
        </div>
      ) : null}
    </div>
  );

  const addressForm = () => (
    <form>
      <h3 className="text-center mt-3 cart-form-text-color">
        Delivery Address
      </h3>
      <div className="form-group">
        <label className="cart-form-text-color">Frist name</label>
        <input
          onChange={handleChangeAddress("firstName")}
          defaultValue={checkoutData.address.firstName}
          type="text"
          className="form-control"
          placeholder="Enter First Name"
        />
      </div>
      <div className="form-group">
        <label className="cart-form-text-color">Last name</label>
        <input
          onChange={handleChangeAddress("lastName")}
          defaultValue={checkoutData.address.lastName}
          type="text"
          className="form-control"
          placeholder="Enter Last Name"
        />
      </div>
      <div className="form-group">
        <label className="cart-form-text-color">Mobile</label>
        <input
          onChange={handleChangeAddress("mobile")}
          defaultValue={checkoutData.address.mobile}
          type="number"
          className="form-control"
          placeholder="Enter Mobile Number"
        />
      </div>
      <div className="form-group">
        <label className="cart-form-text-color">Address</label>
        <input
          onChange={handleChangeAddress("fullAddress")}
          defaultValue={checkoutData.address.fullAddress}
          type="text"
          className="form-control"
          placeholder="Please enter full address"
        />
      </div>
      <div className="form-group">
        <label className="cart-form-text-color">City</label>
        <input
          onChange={handleChangeAddress("city")}
          defaultValue={checkoutData.address.city}
          type="text"
          className="form-control"
          placeholder="Enter City"
        />
      </div>
      <div className="form-group">
        <label className="cart-form-text-color">Post code</label>
        <input
          onChange={handleChangeAddress("postalCode")}
          defaultValue={checkoutData.address.postalCode}
          type="text"
          className="form-control"
          placeholder="Enter Postal Code"
        />
      </div>
      <div className="form-group">
        <label className="cart-form-text-color">Country</label>
        <input
          onChange={handleChangeAddress("country")}
          defaultValue={checkoutData.address.country}
          type="text"
          className="form-control"
          placeholder="Enter State"
        />
      </div>
    </form>
  );

  return (
    <div>
      {!isAuthenticated() ? (
        <>
          <p className="checkout-auth-redirect-p text-center">
            To finish your order please{" "}
            <div className="text-center">
              {" "}
              <Link className="product-link" to="/signin">
                Sign in
              </Link>{" "}
              or{" "}
              <Link className="product-link" to="/signup">
                Sign up
              </Link>
            </div>
          </p>
          <Facebook />
        </>
      ) : (
        <>
          {addressForm()}
          <div className="mb-2">
            <h5 className="cart-checkout-totalprice__heading mb-4">
              total price
            </h5>
            <span className="cart-checkout-totalprice">sub-total:</span>
            <span className="cart-checkout-totalprice__num">
              &euro;{getTotal().toFixed(2)}
            </span>
          </div>
          <div>
            <span className="cart-checkout-totalprice">Delivery:</span>
            <span className="cart-checkout-totalprice__num">Free</span>
          </div>
          {showDropIn()}
        </>
      )}
    </div>
  );
};

export default Checkout;
