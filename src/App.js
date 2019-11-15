import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/routes/Routes";
//import states
import AuthState from "./context/auth/AuthState";
import ProductState from "./context/product/ProductState";
import ShopState from "./context/shop/ShopState";
// components
import MyNavbar from "./components/main/MyNavbar";
import MyNavbarSecond from "./components/main/MyNavbarSecond";
import Footer from "./components/main/Footer";
// end of components
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Router>
      <AuthState>
        <ProductState>
          <ShopState>
            <MyNavbar />
            <MyNavbarSecond />
            <Routes />
            <Footer />
          </ShopState>
        </ProductState>
      </AuthState>
    </Router>
  );
};

export default App;
