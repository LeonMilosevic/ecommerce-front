import React, { useState } from "react";
import ShopContext from "./ShopContext";
import { Redirect } from "react-router-dom";
// import functions
import { getProductsBySub } from "../../components/main/apiMain";

const ShopState = props => {
  const [subCategory, setSubCategory] = useState({
    subCategoryName: "",
    subCategoryId: "",
    categoryId: ""
  });

  const [state, setState] = useState({
    error: "",
    loading: false,
    limit: 8,
    skip: 0,
    size: 0
  });
  const [subCategoryProducts, setSubCategoryProducts] = useState({
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
    }
  });
  // ---LOAD PRODUCTS---
  const loadProductsBySub = searchParams => {
    setState({ ...state, loading: true });
    getProductsBySub(state.skip, state.limit, searchParams).then(data => {
      if (data.error)
        return setState({ ...state, loading: false, error: data.error });

      // set max price
      let max = Math.max(...data.data.map(product => product.price));

      // populate size arr and set false to all
      let populateSize = [...new Set(data.data.map(product => product.size))];

      let checkedSize = {};

      populateSize.map(item => {
        return (checkedSize[item] = false);
      });

      // populate color arr and set false to all
      let populateColor = [...new Set(data.data.map(product => product.color))];

      let checkedColor = {};

      populateColor.map(item => {
        return (checkedColor[item] = false);
      });

      // populate brand arr and set false to all
      let populateBrand = [...new Set(data.data.map(product => product.brand))];

      let checkedBrand = {};
      populateBrand.map(item => {
        return (checkedBrand[item] = false);
      });

      // set filtered products
      let filteredProducts = [...new Set(data.data)];

      setSubCategoryProducts({
        ...subCategoryProducts,
        products: data.data,
        populateBrand,
        checkedBrand,
        populateSize,
        checkedSize,
        populateColor,
        checkedColor,
        max,
        filteredProducts
      });
      setState({ ...state, loading: false, size: data.size, skip: 0 });
    });
  };

  // load more button function

  const loadMore = () => {
    let toSkip = state.skip + state.limit;

    setState({ ...state, loading: true });
    getProductsBySub(toSkip, state.limit, {
      subCategory: subCategory.subCategoryId
    }).then(data => {
      if (data.error)
        return setState({ ...state, loading: false, error: data.error });

      // set max price
      let max;
      if (
        subCategoryProducts.max >=
        Math.max(...data.data.map(product => product.price))
      ) {
        max = subCategoryProducts.max;
      } else {
        max = Math.max(...data.data.map(product => product.price));
      }

      // populate size arr and set false to all
      let populateSize = [...new Set(data.data.map(product => product.size))];

      let checkedSize = {};

      populateSize.map(item => {
        return (checkedSize[item] = false);
      });

      // populate color arr and set false to all
      let populateColor = [...new Set(data.data.map(product => product.color))];

      let checkedColor = {};

      populateColor.map(item => {
        return (checkedColor[item] = false);
      });

      // populate brand arr and set false to all
      let populateBrand = [...new Set(data.data.map(product => product.brand))];

      let checkedBrand = {};
      populateBrand.map(item => {
        return (checkedBrand[item] = false);
      });

      // set filtered products
      let filteredProducts = [...new Set(data.data)];

      setSubCategoryProducts({
        ...subCategoryProducts,
        products: [...subCategoryProducts.products, ...data.data],
        populateBrand: [...subCategoryProducts.populateBrand, ...populateBrand],
        checkedBrand: { ...subCategoryProducts.checkedBrand, ...checkedBrand },
        populateSize: [...subCategoryProducts.populateSize, ...populateSize],
        checkedSize: { ...subCategoryProducts.checkedSize, ...checkedSize },
        populateColor: [...subCategoryProducts.populateColor, ...populateColor],
        checkedColor: { ...subCategoryProducts.checkedColor, ...checkedColor },
        max,
        filteredProducts: [
          ...subCategoryProducts.filteredProducts,
          ...filteredProducts
        ]
      });
      setState({ ...state, loading: false, size: data.size, skip: toSkip });
    });
  };
  // end of load more button function
  // ---END OF LOAD PRODUCTS---
  // ---HANDLE CHANGE FUNCTIONS---
  const handleSetSubCategory = (subId, subName, category) => {
    setSubCategory({
      ...subCategory,
      categoryId: category,
      subCategoryId: subId,
      subCategoryName: subName
    });
  };

  const handleChangeBrand = name => e => {
    const value = e.target.checked;
    setSubCategoryProducts({
      ...subCategoryProducts,
      checkedBrand: { ...subCategoryProducts.checkedBrand, [name]: value }
    });
  };

  const handleChangeSize = name => e => {
    const value = e.target.checked;
    setSubCategoryProducts({
      ...subCategoryProducts,
      checkedSize: { ...subCategoryProducts.checkedSize, [name]: value }
    });
  };

  const handleChangeColor = name => e => {
    const value = e.target.checked;
    setSubCategoryProducts({
      ...subCategoryProducts,
      checkedColor: { ...subCategoryProducts.checkedColor, [name]: value }
    });
  };

  const handleChangePrice = e => {
    const value = e.target.value;
    setSubCategoryProducts({ ...subCategoryProducts, price: value });
  };

  const handleChangeSort = e => {
    const { name, value } = e.target;

    setSubCategoryProducts({
      ...subCategoryProducts,
      sort: { ...subCategoryProducts.sort, [name]: value }
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
    let tempProducts = subCategoryProducts.products;
    // filter brand
    let tempCheckedBrand = {};

    Object.keys(subCategoryProducts.checkedBrand).filter(k => {
      if (subCategoryProducts.checkedBrand[k])
        return (tempCheckedBrand[k] = subCategoryProducts.checkedBrand[k]);
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

    Object.keys(subCategoryProducts.checkedSize).filter(k => {
      if (subCategoryProducts.checkedSize[k])
        return (tempCheckedSize[k] = subCategoryProducts.checkedSize[k]);
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

    Object.keys(subCategoryProducts.checkedColor).filter(k => {
      if (subCategoryProducts.checkedColor[k])
        return (tempCheckedColor[k] = subCategoryProducts.checkedColor[k]);
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
    let tempPrice = parseInt(subCategoryProducts.price);
    if (subCategoryProducts.price !== "") {
      tempProducts = tempProducts.filter(item => item.price <= tempPrice);
    }

    setSubCategoryProducts({
      ...subCategoryProducts,
      filteredProducts: tempProducts
    });
    // filter sort
    //@ts-ignore
    let sortValue = Object.values(subCategoryProducts.sort);

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
  // ---REDIRECT FUNCTION---
  const redirectToHome = () => {
    if (subCategory.subCategoryName === "" || subCategory.subCategoryId === "")
      return <Redirect to="/" />;
  };
  // ---END OF REDIRECT FUNCTION---
  return (
    <ShopContext.Provider
      value={{
        // export states
        subCategory,
        state,
        subCategoryProducts,
        // init functions
        sortData,
        loadProductsBySub,
        redirectToHome,
        loadMore,
        // handle functions
        handleSetSubCategory,
        handleClickAddActive,
        handleChangeBrand,
        handleChangePrice,
        handleChangeSize,
        handleChangeColor,
        handleChangeSort
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopState;
