import React, { useContext } from "react";
// import helpers
import { Link } from "react-router-dom";
// import state
import ProductContext from "../../context/product/ProductContext";
// import components
import Hero from "./Hero";
import Card from "./Card";
import EditorsChoice from "./EditorsChoice";
import CollectionCard from "./CollectionCard";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Toast from "react-bootstrap/Toast";

const Home = () => {
  const productContext = useContext(ProductContext);
  const {
    isLoading,
    productsByOnSale,
    productsByArrival,
    toast,
    setToast,
    toastWish,
    setToastWish,
    collections
  } = productContext;

  return (
    <>
      <div className="container">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        </Breadcrumb>

        <Hero
          bgimg={
            "https://res.cloudinary.com/clothify/image/upload/v1571160597/1mbtest_hyebrz.jpg"
          }
          logo={"logo needs to go here"}
        />
        <h2 className="mb-3 text-center header-home">New In</h2>
        {isLoading()}
        <div id="target-newin" className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-md-6 col-lg-3 col-sm-12 mb-4 ">
              <Card product={product} />
            </div>
          ))}
        </div>
        <h6 className="text-center my-2">
          <Link className="home-link" to="/shop">
            See more
          </Link>
        </h6>
        <div className="home-onsale mt-5">
          <h2 className="text-center header-home">On Sale</h2>
        </div>
        {isLoading()}
        <div className="row mb-3">
          {productsByOnSale.map((product, i) => (
            <div key={i} className="col-md-6 col-lg-3 col-sm-12 mb-4 ">
              <Card product={product} />
            </div>
          ))}
        </div>
        <h6 className="text-center mt-2 mb-5">
          <Link className="home-link" to="/onsale">
            See more
          </Link>
        </h6>
        <h2 className="mb-3 text-center header-home">Collections</h2>
        <div className="row mt-5">
          {collections.slice(0, 2).map((collection, i) => (
            <div key={i} className="col-5 text-center mx-auto">
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>

        <Toast
          onClose={() => setToast(false)}
          show={toast}
          delay={3000}
          autohide
          className="toast-custom"
        >
          <Toast.Body>Added to cart!</Toast.Body>
        </Toast>
        <Toast
          onClose={() => setToastWish(false)}
          show={toastWish}
          delay={3000}
          autohide
          className="toast-custom--wish"
        >
          <Toast.Body>Added to wishlist!</Toast.Body>
        </Toast>
      </div>
      <EditorsChoice />
    </>
  );
};

export default Home;
