import React, { useState } from "react";
import CartContext from "./CartContext";
// import helpers
import { updateCart } from "../../components/main/cartHelpers";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder
} from "../../components/main/apiMain";
import { emptyCart } from "../../components/main/cartHelpers";
import { isAuthenticated } from "../../components/auth/index";
// import components
import Spinner from "../../components/ui/Spinner";

const CartState = props => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutData, setCheckoutData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: {
      firstName: isAuthenticated()
        ? isAuthenticated().user.address.firstName
        : "",
      lastName: isAuthenticated()
        ? isAuthenticated().user.address.lastName
        : "",
      mobile: isAuthenticated() ? isAuthenticated().user.address.mobile : "",
      country: isAuthenticated() ? isAuthenticated().user.address.country : "",
      city: isAuthenticated() ? isAuthenticated().user.address.city : "",
      postalCode: isAuthenticated()
        ? isAuthenticated().user.address.postalCode
        : "",
      fullAddress: isAuthenticated()
        ? isAuthenticated().user.address.fullAddress
        : ""
    }
  });
  const [verification, setVerification] = useState({
    userId: "",
    token: ""
  });
  // ---INIT FUNC---

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then(data => {
      if (data.error) return setCheckoutData({ ...data, error: data.error });

      setCheckoutData({ ...checkoutData, clientToken: data.clientToken });
      setVerification({ userId, token });
    });
  };

  // total price
  const getTotal = () => {
    return cartItems.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  // ---END OF INIT---

  // ---ONCLICK/ONCHANGE FUNCTIONS---
  const incrementProductCount = id => {
    let tempCart = [...cartItems];
    const cartItem = tempCart.find(item => item._id === id);
    if (cartItem.count === cartItem.quantity) {
      updateCart(cartItem._id, cartItem.count);
      return setCartItems([...tempCart]);
    } else {
      cartItem.count++;
      updateCart(cartItem._id, cartItem.count);
      setCartItems([...tempCart]);
    }
  };

  const decrementProductCount = id => {
    let tempCart = [...cartItems];
    const cartItem = tempCart.find(item => item._id === id);
    if (cartItem.count === 1) {
      updateCart(cartItem._id, cartItem.count);
      return setCartItems([...tempCart]);
    } else {
      cartItem.count = cartItem.count - 1;
      updateCart(cartItem._id, cartItem.count);
      setCartItems([...tempCart]);
    }
  };
  // purchase function
  const buy = () => {
    setCheckoutData({ ...checkoutData, loading: true });
    let nonce;
    let getNonce = checkoutData.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal()
        };

        processPayment(verification.userId, verification.token, paymentData)
          .then(response => {
            // send order to backend
            const createOrderData = {
              products: cartItems,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: checkoutData.address
            };
            createOrder(
              verification.userId,
              verification.token,
              createOrderData
            );

            setCheckoutData({
              ...checkoutData,
              success: response.success,
              loading: false
            });
            emptyCart();
          })
          .catch(error => console.log(error));
      })
      .catch(error => {
        setCheckoutData({
          ...checkoutData,
          error: error.message,
          loading: false
        });
      });
    console.log(getNonce);
  };

  const handleChangeAddress = name => e => {
    const value = e.target.value;
    setCheckoutData({
      ...checkoutData,
      address: {
        ...checkoutData.address,
        [name]: value
      }
    });
  };
  // ---END OF ONCLICK/ONCHANGE FUNCTIONS---
  const showError = error => (
    <div
      className="alert alert-danger text-center"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = success => (
    <div
      className="alert alert-info text-center"
      style={{ display: success ? "" : "none" }}
    >
      Payment Successful!
    </div>
  );

  const isLoading = () => checkoutData.loading && <Spinner />;

  return (
    <CartContext.Provider
      value={{
        //state
        checkoutData,
        setCheckoutData,
        cartItems,
        setCartItems,
        getTotal,
        // init
        getToken,
        //functions
        buy,
        handleChangeAddress,
        showSuccess,
        showError,
        isLoading,
        incrementProductCount,
        decrementProductCount
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
