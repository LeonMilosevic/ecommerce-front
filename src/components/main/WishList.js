import React, { useState, useEffect } from "react";
// import helpers
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { getWish } from "./cartHelpers";
// import components
import Layout from "./Layout";
import WishlistCard from "./WishlistCard";
// import icons
import { FaHeartBroken, FaHeart } from "react-icons/fa";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";

const WishList = () => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    setWishList(getWish());
  }, []);

  const emptyBag = () => (
    <Layout
      bgimg={`https://res.cloudinary.com/clothify/image/upload/v1571160597/1mbtest_hyebrz.jpg`}
      header={"My favorites"}
      // @ts-ignore
      icon={<FaHeartBroken style={{ fontSize: "60px", color: "#e95b4e" }} />}
      name={"Your wishlist is empty"}
      // @ts-ignore
      link={
        <p className="mb-4">
          <Link to="/cart" className="jumbotron-link">
            My cart
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
  );

  const showItems = () => {
    return (
      <>
        <Layout
          jumboPadding={"2%"}
          bgimg={`https://res.cloudinary.com/clothify/image/upload/v1571160597/1mbtest_hyebrz.jpg`}
          header={"My wishlist"}
          // @ts-ignore
          icon={<FaHeart style={{ fontSize: "60px", color: "#e95b4e" }} />}
          name={`${wishList.length} items in your wishlist`}
        ></Layout>
        <div className="row">
          {wishList &&
            wishList.map((product, i) => (
              <div key={i} className="col-sm-12 col-md-3 col-lg-3 my-3">
                <WishlistCard setWishList={setWishList} product={product} />
              </div>
            ))}
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
        <LinkContainer to="/wishlist">
          <Breadcrumb.Item>wishlist</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      {wishList.length > 0 ? showItems() : emptyBag()}
    </div>
  );
};

export default WishList;
