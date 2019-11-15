import React, { useEffect, useContext } from "react";
// import helpers
import { withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import state
import ShopContext from "../../context/shop/ShopContext";
import ProductContext from "../../context/product/ProductContext";
// import components
import Card from "./Card";
import Spinner from "../ui/Spinner";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import Toast from "react-bootstrap/Toast";

const Shop = () => {
  const shopContext = useContext(ShopContext);
  const {
    // import states
    subCategory,
    state,
    subCategoryProducts,
    // import init functions
    loadProductsBySub,
    sortData,
    redirectToHome,
    loadMore,
    // import handle functions
    handleClickAddActive,
    handleChangeBrand,
    handleChangePrice,
    handleChangeSize,
    handleChangeColor,
    handleChangeSort
  } = shopContext;

  const productContext = useContext(ProductContext);
  const { toast, setToast, toastWish, setToastWish } = productContext;

  useEffect(() => {
    // init sub category products
    let searchParams = {};
    if (
      subCategory.subCategoryName === "Man" ||
      subCategory.subCategoryName === "Woman" ||
      subCategory.subCategoryName === "Children"
    ) {
      searchParams = {
        category: subCategory.subCategoryId
      };
    } else if (
      subCategory.subCategoryName === "Winter Collection" ||
      subCategory.subCategoryName === "Summer Collection" ||
      subCategory.subCategoryName === "Going out collecection"
    ) {
      searchParams = {
        selection: subCategory.subCategoryId
      };
    } else {
      searchParams = {
        subCategory: subCategory.subCategoryId
      };
    }

    // reset active class on mount
    const active = document.querySelectorAll(".checkbox-active");

    active.forEach(div => {
      div.classList.remove("checkbox-active");
    });

    loadProductsBySub(searchParams);
  }, [subCategory]);

  useEffect(() => {
    // init filtering
    sortData();
  }, [
    subCategoryProducts.checkedBrand,
    subCategoryProducts.price,
    subCategoryProducts.checkedSize,
    subCategoryProducts.checkedColor,
    subCategoryProducts.sort
  ]);
  // ===DROPDOWN UI---
  const dropdown = () => {
    return (
      <div className="card-shop card text-center mb-5">
        <h2 className="shop-heading">{subCategory.subCategoryName}</h2>
        <div className="text-center shop-sorting-div ">
          {/* SORT */}
          <Dropdown>
            <Dropdown.Toggle
              className="shop-dropdown-button"
              id="dropdown-basic"
            >
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu className="shop-dropdown-custom">
              <li className="shop-dropdown-custom--item">
                <label className="custom-radio-label">
                  New in
                  <input
                    type="radio"
                    name="sort-radio"
                    value="newIn"
                    onChange={handleChangeSort}
                    defaultChecked
                  />
                  <span className="custom-radio-checkmark"></span>
                </label>
              </li>
              <li className="shop-dropdown-custom--item">
                <label className="custom-radio-label">
                  Price high to low
                  <input
                    type="radio"
                    name="sort-radio"
                    value="highToLow"
                    onChange={handleChangeSort}
                  />
                  <span className="custom-radio-checkmark"></span>
                </label>
              </li>
              <li className="shop-dropdown-custom--item">
                <label className="custom-radio-label">
                  Price low to high
                  <input
                    type="radio"
                    name="sort-radio"
                    value="lowToHigh"
                    onChange={handleChangeSort}
                  />
                  <span className="custom-radio-checkmark"></span>
                </label>
              </li>
            </Dropdown.Menu>
          </Dropdown>
          {/* END OF SORT */}
          {/* SIZE */}
          <Dropdown>
            <Dropdown.Toggle
              className="shop-dropdown-button"
              id="dropdown-basic"
            >
              Size
            </Dropdown.Toggle>
            <Dropdown.Menu className="shop-dropdown-custom">
              {subCategoryProducts.populateSize.map((item, i) => (
                <li key={i} className="shop-dropdown-custom--item">
                  <div className="checkbox-div">
                    <label className={`checkbox-custom-label`}>
                      <span className="ml-2">{item}</span>
                      <input
                        name={`${item}`}
                        className="checkbox-custom"
                        type="checkbox"
                        onClick={handleClickAddActive}
                        onChange={handleChangeSize(`${item}`)}
                      />
                    </label>
                  </div>
                </li>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* END OF SIZE */}
          {/* PRICE */}
          <Dropdown>
            <Dropdown.Toggle
              className="shop-dropdown-button"
              id="dropdown-basic"
            >
              Price
            </Dropdown.Toggle>
            <Dropdown.Menu className="shop-dropdown-custom">
              <p style={{ fontSize: "12px" }} className="ml-2 mb-1">
                Select price range
              </p>
              <p style={{ fontSize: "12px" }} className="ml-2">
                Current price:
                <span style={{ fontSize: "16px" }}>
                  {" "}
                  &euro; {`${subCategoryProducts.price}`}
                </span>
              </p>
              <li className="shop-dropdown-custom--item text-center">
                <label htmlFor="price">
                  <span className="custom-price-span custom-price-span--1">
                    &euro;{subCategoryProducts.min}
                  </span>
                  <span className="custom-price-span custom-price-span--2">
                    &euro;{subCategoryProducts.max}
                  </span>
                  <input
                    className="custom-range"
                    value={subCategoryProducts.price}
                    type="range"
                    name="price"
                    id="price"
                    min={subCategoryProducts.min}
                    max={subCategoryProducts.max}
                    onChange={handleChangePrice}
                  />
                </label>
              </li>
            </Dropdown.Menu>
          </Dropdown>
          {/* END OF PRICE */}
          {/* COLOR */}
          <Dropdown>
            <Dropdown.Toggle
              className="shop-dropdown-button"
              id="dropdown-basic"
            >
              Color
            </Dropdown.Toggle>

            <Dropdown.Menu className="shop-dropdown-custom">
              {subCategoryProducts.populateColor.map((item, i) => (
                <li key={i} className="shop-dropdown-custom--item">
                  <div className="checkbox-div">
                    <label className="checkbox-custom-label">
                      <span className="ml-1">{item}</span>
                      <input
                        name={item}
                        onClick={handleClickAddActive}
                        className="checkbox-custom"
                        type="checkbox"
                        onChange={handleChangeColor(`${item}`)}
                      />
                    </label>
                  </div>
                </li>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* END OF COLOR */}
          {/* BRAND */}
          <Dropdown>
            <Dropdown.Toggle
              className="shop-dropdown-button"
              id="dropdown-basic"
            >
              Brand
            </Dropdown.Toggle>

            <Dropdown.Menu className="shop-dropdown-custom">
              {subCategoryProducts.populateBrand.map((item, i) => (
                <li key={i} className="shop-dropdown-custom--item">
                  <div className="checkbox-div">
                    <label className="checkbox-custom-label">
                      <span className="ml-1">{item}</span>
                      <input
                        name={item}
                        onClick={handleClickAddActive}
                        className="checkbox-custom"
                        type="checkbox"
                        onChange={handleChangeBrand(`${item}`)}
                      />
                    </label>
                  </div>
                </li>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* END OF BRAND */}
        </div>
      </div>
    );
  };
  // ---END OF DROPDOWN UI---
  return (
    <div className="container">
      {redirectToHome()}
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to={`/shop/${subCategory.subCategoryId}`}>
          <Breadcrumb.Item>{subCategory.subCategoryName}</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      {dropdown()}
      <h5 className="text-center shop-header-style-counter mb-3">
        {subCategoryProducts.filteredProducts.length} styles found
      </h5>
      {state.loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            {subCategoryProducts.filteredProducts.map((product, i) => (
              <div key={i} className="col-md-6 col-lg-3 col-sm-12 mb-4 ">
                <Card product={product} />
              </div>
            ))}
          </div>
          <div className="row">
            {state.size > 0 && state.size >= state.limit && (
              <button
                onClick={loadMore}
                className="btn-custom btn mx-auto mb-5"
              >
                Load More
              </button>
            )}
          </div>
        </>
      )}
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
  );
};

export default withRouter(Shop);
