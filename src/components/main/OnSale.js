import React, { useState, useEffect, useContext } from "react";
// import context
import ProductContext from "../../context/product/ProductContext";
// import helpers
import { getProducts } from "./apiMain";
import { LinkContainer } from "react-router-bootstrap";
// import components
import Card from "./Card";
import Spinner from "../ui/Spinner";
// import bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import Toast from "react-bootstrap/Toast";

const OnSale = () => {
  const productContext = useContext(ProductContext);
  const { toast, setToast, toastWish, setToastWish } = productContext;

  const [onSale, setOnSale] = useState({
    products: [],
    productsSize: "",
    filteredProducts: [],
    populateColor: [],
    checkedColor: {},
    populateSize: [],
    checkedSize: {},
    populateBrand: [],
    checkedBrand: {},
    price: "",
    min: 0,
    max: 0,
    sort: {
      "sort-radio": "newIn"
    },
    loading: false,
    error: ""
  });

  const populateSale = () => {
    setOnSale({ ...onSale, loading: true });
    getProducts("onSale", undefined).then(async data => {
      if (data.error)
        return setOnSale({ ...onSale, error: data.error, loading: false });

      // populate onsale
      let onsaleArr = [];
      await data.map(item => {
        if (item.onSale) {
          return onsaleArr.push(item);
        }
      });

      // set max price
      let max = await Math.max(...onsaleArr.map(product => product.price));

      // populate size arr and set false to all
      let populateSize = await [
        ...new Set(onsaleArr.map(product => product.size))
      ];

      let checkedSize = {};

      await populateSize.map(item => {
        return (checkedSize[item] = false);
      });

      // populate color arr and set false to all
      let populateColor = await [
        ...new Set(onsaleArr.map(product => product.color))
      ];

      let checkedColor = {};

      await populateColor.map(item => {
        return (checkedColor[item] = false);
      });

      // populate brand arr and set false to all
      let populateBrand = await [
        ...new Set(onsaleArr.map(product => product.brand))
      ];

      let checkedBrand = {};
      await populateBrand.map(item => {
        return (checkedBrand[item] = false);
      });

      // set filtered products
      let filteredProducts = await [...new Set(onsaleArr)];

      setOnSale({
        ...onSale,
        products: onsaleArr,
        loading: false,
        populateBrand,
        checkedBrand,
        populateSize,
        checkedSize,
        populateColor,
        checkedColor,
        max,
        filteredProducts
      });
    });
  };
  useEffect(() => {
    populateSale();
  }, []);

  useEffect(() => {
    // init filtering
    sortData();
  }, [
    onSale.checkedBrand,
    onSale.price,
    onSale.checkedSize,
    onSale.checkedColor,
    onSale.sort
  ]);

  // ---HANDLE CHANGE FUNCTIONS---
  const handleChangeBrand = name => e => {
    const value = e.target.checked;
    setOnSale({
      ...onSale,
      checkedBrand: { ...onSale.checkedBrand, [name]: value }
    });
  };

  const handleChangeSize = name => e => {
    const value = e.target.checked;
    setOnSale({
      ...onSale,
      checkedSize: { ...onSale.checkedSize, [name]: value }
    });
  };

  const handleChangeColor = name => e => {
    const value = e.target.checked;
    setOnSale({
      ...onSale,
      checkedColor: { ...onSale.checkedColor, [name]: value }
    });
  };

  const handleChangePrice = e => {
    const value = e.target.value;
    setOnSale({ ...onSale, price: value });
  };

  const handleChangeSort = e => {
    const { name, value } = e.target;

    setOnSale({
      ...onSale,
      sort: { ...onSale.sort, [name]: value }
    });
  };

  const handleClickAddActive = e => {
    if (e.target.checked) {
      e.target.parentElement.classList.add("checkbox-active");
    } else {
      e.target.parentElement.classList.remove("checkbox-active");
    }
  };
  // ---END OF HANDLE CHANGE FUNCTIONS ---

  // --- SORTING FUNCTION ---
  const sortData = () => {
    let tempProducts = onSale.products;
    // filter brand
    let tempCheckedBrand = {};

    Object.keys(onSale.checkedBrand).filter(k => {
      if (onSale.checkedBrand[k])
        return (tempCheckedBrand[k] = onSale.checkedBrand[k]);
    });

    let tempCheckedBrandArr = Object.keys(tempCheckedBrand);

    if (tempCheckedBrandArr.length > 0) {
      let finalArr = [];

      tempProducts.filter(item =>
        tempCheckedBrandArr.forEach(item2 => {
          if (item.brand === item2) {
            finalArr.push(item);
          }
        })
      );

      tempProducts = finalArr;
    }
    // filter size
    let tempCheckedSize = {};

    Object.keys(onSale.checkedSize).filter(k => {
      if (onSale.checkedSize[k])
        return (tempCheckedSize[k] = onSale.checkedSize[k]);
    });

    let tempCheckedSizeArr = Object.keys(tempCheckedSize);

    if (tempCheckedSizeArr.length > 0) {
      let finalArr = [];

      tempProducts.filter(item =>
        tempCheckedSizeArr.forEach(item2 => {
          if (item.size === item2) {
            finalArr.push(item);
          }
        })
      );

      tempProducts = finalArr;
    }
    // filter color
    let tempCheckedColor = {};

    Object.keys(onSale.checkedColor).filter(k => {
      if (onSale.checkedColor[k])
        return (tempCheckedColor[k] = onSale.checkedColor[k]);
    });

    let tempCheckedColorArr = Object.keys(tempCheckedColor);

    if (tempCheckedColorArr.length > 0) {
      let finalArr = [];

      tempProducts.filter(item =>
        tempCheckedColorArr.forEach(item2 => {
          if (item.color === item2) {
            return finalArr.push(item);
          }
        })
      );

      tempProducts = finalArr;
    }
    // filter price
    let tempPrice = parseInt(onSale.price);
    if (onSale.price !== "") {
      tempProducts = tempProducts.filter(item => item.price <= tempPrice);
    }

    setOnSale({
      ...onSale,
      filteredProducts: tempProducts
    });
    // filter sort
    //@ts-ignore
    let sortValue = Object.values(onSale.sort);

    if (sortValue[0] === "newIn") {
      tempProducts.sort((a, b) => {
        //@ts-ignore
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sortValue[0] === "highToLow") {
      tempProducts.sort((a, b) => {
        return parseInt(b.price) - parseInt(a.price);
      });
    } else if (sortValue[0] === "lowToHigh") {
      tempProducts.sort((a, b) => {
        return parseInt(a.price) - parseInt(b.price);
      });
    }
  };
  // ---END OF SORTING FUNCTION---

  // ===DROPDOWN UI---
  const dropdown = () => {
    return (
      <div className="card-shop card text-center mb-5">
        <h2 className="shop-heading">On Sale</h2>
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
              {onSale.populateSize.map((item, i) => (
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
                  &euro; {`${onSale.price}`}
                </span>
              </p>
              <li className="shop-dropdown-custom--item text-center">
                <label htmlFor="price">
                  <span className="custom-price-span custom-price-span--1">
                    &euro;{onSale.min}
                  </span>
                  <span className="custom-price-span custom-price-span--2">
                    &euro;{onSale.max}
                  </span>
                  <input
                    className="custom-range"
                    value={onSale.price}
                    type="range"
                    name="price"
                    id="price"
                    min={onSale.min}
                    max={onSale.max}
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
              {onSale.populateColor.map((item, i) => (
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
              {onSale.populateBrand.map((item, i) => (
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
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to={`/onsale`}>
          <Breadcrumb.Item>on sale</Breadcrumb.Item>
        </LinkContainer>
      </Breadcrumb>
      {dropdown()}
      <h5 className="text-center shop-header-style-counter mb-3">
        {onSale.filteredProducts.length} styles found
      </h5>
      {onSale.loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            {onSale.filteredProducts.map((product, i) => (
              <div key={i} className="col-md-6 col-lg-3 col-sm-12 mb-4 ">
                <Card product={product} />
              </div>
            ))}
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

export default OnSale;
