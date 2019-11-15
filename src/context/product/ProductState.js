import React, { useState, useEffect } from "react";
import ProductContext from "./ProductContext";
// import helpers
import {
  getProducts,
  searchProducts,
  read,
  listRelated
} from "../../components/main/apiMain";
import {
  getCategories,
  getSubCategories,
  getSelections
} from "../../components/admin/apiAdmin";
// import componetns
import Spinner from "../../components/ui/Spinner";

const ProductState = props => {
  const [state, setState] = useState({
    error: "",
    loading: false
  });
  const [collections, setCollections] = useState([]);
  const [editorsChoice, setEditorsChoice] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [mans, setMans] = useState([]);
  const [womans, setWomans] = useState([]);
  const [children, setChildren] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsByOnSale, setProductsByOnSale] = useState([]);
  const [searchState, setSearchState] = useState({
    search: "",
    results: [],
    searched: false
  });
  const [singleProductState, setSingleProductState] = useState({
    name: "",
    brand: "",
    brandDescription: "",
    category: {},
    color: "",
    createdAt: "",
    editorsChoice: Boolean,
    instructions: "",
    onSale: Boolean,
    photoUrl: [],
    price: Number,
    quantity: Number,
    size: "",
    sold: Number,
    subCategory: {},
    id: "",
    photoDisplay: "",
    about: ""
  });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [toast, setToast] = useState(false);
  const [toastWish, setToastWish] = useState(false);

  // ---LOAD AND INIT FUNCTIONS---
  // single product load
  const loadSingleProduct = productId => {
    setState({ ...state, loading: true });
    read(productId).then(data => {
      if (data.error)
        return setState({ ...state, error: data.error, loading: false });
      setSingleProductState({
        ...singleProductState,
        name: data.name,
        brand: data.brand,
        brandDescription: data.brandDescription,
        category: data.category,
        color: data.color,
        createdAt: data.createdAt,
        editorsChoice: data.editorsChoice,
        instructions: data.instructions,
        onSale: data.onSale,
        photoUrl: data.photoUrl,
        price: data.price,
        quantity: data.quantity,
        size: data.size,
        sold: data.sold,
        subCategory: data.subCategory,
        id: data._id,
        photoDisplay: data.photoUrl[0],
        about: data.about
      });
      setState({ ...state, loading: false });
      // populate related products
      listRelated(data._id).then(data => {
        setState({ ...state, loading: true });
        if (data.error) console.log(data.error);

        setRelatedProducts(data);
        setState({ ...state, loading: false });
      });
    });
  };
  // end of single product load
  // populate categories and sub categories
  const loadCategories = () => {
    getCategories()
      .then(data => {
        if (data.error) return setState({ ...state, error: data.error });

        setCategories(data);
      })
      .catch(error => console.log(error));
  };

  const loadSubCategories = () => {
    getSubCategories()
      .then(data => {
        if (data.error) return setState({ ...state, error: data.error });

        setSubCategories(data);
      })
      .catch(error => console.log(error));
  };

  // end of populate categories and sub categories
  // query functions for newest and on sale
  const loadProductsByOnSale = () => {
    setState({ ...state, loading: true });
    getProducts("onSale", 6)
      .then(data => {
        if (data.error)
          return setState({ ...state, error: data.error, loading: false });

        setProductsByOnSale(data);
        setState({ ...state, loading: false });
      })
      .catch(error => console.log(error));
  };

  // load editors choice
  const loadProductsByEditorsChoice = () => {
    setState({ ...state, loading: true });
    getProducts("editorsChoice", 6)
      .then(data => {
        if (data.error)
          return setState({ ...state, error: data.error, loading: false });

        setEditorsChoice(data);
        setState({ ...state, loading: false });
      })
      .catch(error => setState({ ...state, error }));
  };

  const loadProductsByCollection = () => {
    setState({ ...state, loading: true });
    getSelections()
      .then(data => {
        if (data.error)
          return setState({ ...state, error: data.error, loading: false });

        setCollections(data);
        setState({ ...state, loading: false });
      })
      .catch(error => setState({ ...state, error }));
  };

  const loadProductsByArrival = () => {
    setState({ ...state, loading: true });
    getProducts("createdAt", 6)
      .then(data => {
        if (data.error)
          return setState({ ...state, error: data.error, loading: false });

        setProductsByArrival(data);
        setState({ ...state, loading: false });
      })
      .catch(error => console.log(error));
  };
  // end of query functions for newest and on sale
  // load search
  const loadSearch = () => {
    if (searchState.search) {
      setState({ ...state, loading: true });
      searchProducts({ search: searchState.search || undefined }).then(data => {
        if (data.error)
          return setState({ ...state, error: data.error, loading: false });

        setSearchState({ ...searchState, results: data, searched: true });
        setState({ ...state, loading: false });
      });
    }
  };
  // end of load search
  // ---END OF LOAD AND INIT FUNCTIONS---

  // --- HANDLE FUNCTIONS ---
  const filterSubCategories = () => {
    let categoryArr = [];
    let subcategoryArr = [];
    categories.forEach(c => {
      categoryArr.push(c._id);
    });
    subCategories.forEach(sc => {
      subcategoryArr.push(sc);
    });

    const mans = subcategoryArr.filter(sub => sub.category === categoryArr[0]);
    const womans = subcategoryArr.filter(
      sub => sub.category === categoryArr[1]
    );
    const children = subcategoryArr.filter(
      sub => sub.category === categoryArr[2]
    );
    setMans(mans);
    setWomans(womans);
    setChildren(children);
  };

  const handleChangeSearch = event => {
    const search = document.getElementById("search-button");

    if (event.target.value !== "") {
      search.classList.add("moveLeft");
      setSearchState({ ...searchState, search: event.target.value });
    } else {
      search.classList.remove("moveLeft");
      setSearchState({
        ...searchState,
        search: event.target.value,
        results: []
      });
    }
  };
  // change main photo in display single product page
  const handleChangePhotoDisplay = e => {
    setState({ ...state, loading: true });
    let img = e.target.src;
    setSingleProductState({ ...singleProductState, photoDisplay: img });
    setState({ ...state, loading: false });
  };
  // search submit
  const onSubmitSearch = e => {
    e.preventDefault();
    loadSearch();
  };

  // handleToast
  const handleToast = () => {
    setToast(true);
  };
  // handleToast wish
  const handleToastWish = () => {
    setToastWish(true);
  };
  // --- END OF HANDLE FUNCTIONS ---

  useEffect(() => {
    loadSubCategories();
    loadCategories();
    loadProductsByArrival();
    loadProductsByOnSale();
    loadProductsByEditorsChoice();
    loadProductsByCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterSubCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCategories, categories]);

  const isLoading = () => state.loading && <Spinner />;

  return (
    <ProductContext.Provider
      value={{
        // states
        singleProductState,
        relatedProducts,
        searchState,
        categories,
        subCategories,
        mans,
        womans,
        photoDisplay: singleProductState.photoDisplay,
        editorsChoice,
        collections,
        // init
        productsByArrival,
        productsByOnSale,
        loadSingleProduct,
        // handle
        toast,
        setToast,
        handleToast,
        toastWish,
        setToastWish,
        handleToastWish,
        handleChangePhotoDisplay,
        onSubmitSearch,
        handleChangeSearch,
        children,
        isLoading
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
