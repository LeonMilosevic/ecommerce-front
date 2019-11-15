import React, { useEffect, useContext } from "react";
// import helpers
import { addItem, wishAdd } from "./cartHelpers";
import { Link } from "react-router-dom";
import Drift from "drift-zoom";
import Slider from "react-slick";
import { LinkContainer } from "react-router-bootstrap";
// import components
import Card from "./Card";
// import state
import ProductContext from "../../context/product/ProductContext";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Toast from "react-bootstrap/Toast";
// import icons
import { FaHeart } from "react-icons/fa";

const Product = props => {
  const productContext = useContext(ProductContext);
  const {
    relatedProducts,
    loadSingleProduct,
    singleProductState,
    photoDisplay,
    handleChangePhotoDisplay,
    toast,
    setToast,
    handleToast,
    toastWish,
    setToastWish,
    handleToastWish,
    isLoading
  } = productContext;

  useEffect(() => {
    const productId = props.match.params.productId;
    new Drift(document.querySelector("#drift"), {
      paneContainer: document.querySelector("p")
    });
    loadSingleProduct(productId);
  }, [props]);

  const addToCart = () => {
    addItem(singleProductState);
    handleToast();
  };
  const addToWish = () => {
    wishAdd(singleProductState);
    handleToastWish();
  };
  const productDisplay = () => (
    <>
      <div className="row mt-3">
        <div className="col-6">
          <div className="product-grid-container">
            {singleProductState.photoUrl.map((img, i) => (
              <div key={i} className="product-grid-container-div">
                <img
                  className="product-grid-container--images"
                  src={img}
                  alt="images"
                  onClick={handleChangePhotoDisplay}
                />
              </div>
            ))}
            <div className="product-grid-container-div--2">
              <img
                id="drift"
                className="product-grid-container-div--2-displayImg"
                src={photoDisplay}
                alt="main"
                data-zoom={photoDisplay}
              />
            </div>
          </div>
        </div>
        <div className="col-6">
          <h2 className="product-header">{singleProductState.name}</h2>
          <h2
            className={
              singleProductState.onSale ? "product-price-sale" : "product-price"
            }
          >
            <span className="mr-1">&euro;</span>
            {parseInt(singleProductState.price).toFixed(2)}
          </h2>
          <h3 className="my-5 product-color">
            Color : <span className="ml-1">{singleProductState.color}</span>
          </h3>
          <h5 className="mb-5 product-size">
            size : <span>{singleProductState.size}</span>
          </h5>
          <button onClick={addToCart} className="btn product-btn mr-2">
            Add to cart
          </button>
          <button onClick={addToWish} className="btn product-btn">
            Add to wishlist
            <FaHeart className="ml-2" style={{ fontSize: "16px" }} />
          </button>
          <p className="mt-5">
            <Link className="product-link" to="/">
              Delivery and return information
            </Link>
          </p>
        </div>
      </div>
      <div style={{ width: "80%" }} className="row mx-auto my-5">
        <div className="col">
          <h3 className="product-header-information">Product information</h3>
          <h6 className="product-subheader">{singleProductState.name}</h6>

          <ul className="product-information-ul">
            <li className="ml-4">{singleProductState.about}</li>
          </ul>
        </div>
        <div className="col">
          <h3 className="product-header-information">About product</h3>
          <p className="product-p">{singleProductState.instructions}</p>
        </div>
        <div className="col">
          <h3 className="product-header-information">About brand</h3>
          <p className="product-p">{singleProductState.brandDescription}</p>
        </div>
      </div>
    </>
  );
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  };
  const relatedProductsDisplay = () => (
    <>
      <h1 className="mt-5 related-header text-center">Releted products</h1>
      <div style={{ backgroundColor: "#84BACD" }}>
        <div className="container">
          <div style={{ width: "80%" }} className="row mx-auto">
            <Slider className="my-5 mx-auto" {...settings}>
              {relatedProducts.map((product, i) => (
                <Card key={i} product={product} />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="container">
        {isLoading()}
        <Breadcrumb>
          <LinkContainer to="/">
            <Breadcrumb.Item>home</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={`/shop/${singleProductState.category._id}`}>
            <Breadcrumb.Item>
              {singleProductState.category.name}
            </Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={`/shop/${singleProductState.subCategory._id}`}>
            <Breadcrumb.Item>
              {singleProductState.subCategory.name}
            </Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={`/product/${singleProductState.id}`}>
            <Breadcrumb.Item>{singleProductState.name}</Breadcrumb.Item>
          </LinkContainer>
        </Breadcrumb>
        {productDisplay()}
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
      {relatedProductsDisplay()}
    </>
  );
};

export default Product;
