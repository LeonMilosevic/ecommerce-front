import React, { useState, useEffect } from "react";
//imprt state
import AdminContext from "./AdminContext";
//import helpers
import { isAuthenticated } from "../../components/auth";
// import components
import Spinner from "../../components/ui/Spinner";
// import functions
import {
  createCategory,
  createSubCategory,
  createSelection,
  createProduct,
  getCategories,
  getSubCategories,
  getSelections,
  getProducts,
  deleteSubCategory,
  deleteProduct,
  deleteCategory,
  deleteSelection,
  getSingleProduct,
  productUpdate,
  listOrders
} from "../../components/admin/apiAdmin";

const AdminState = props => {
  const [category, setCategory] = useState({
    name: "",
    error: "",
    success: false,
    loading: false
  });

  const [categories, setCategories] = useState([]);

  const [selections, setSelections] = useState([]);

  const [subCategories, setSubCategories] = useState([]);

  const [subCategory, setSubCategory] = useState({
    name: "",
    category: "",
    error: "",
    success: false,
    loading: false
  });

  const [selection, setSelection] = useState({
    name: "",
    error: "",
    photo: "",
    success: false,
    loading: false,
    formData: undefined
  });

  const [product, setProduct] = useState({
    name: "",
    about: "",
    price: "",
    categories: [],
    category: "",
    subCategories: [],
    subCategory: "",
    onSale: false,
    quantity: "",
    color: "",
    size: "",
    instructions: "",
    brand: "",
    brandDescription: "",
    photo1: "",
    photo2: "",
    photo3: "",
    photo4: "",
    selections: [],
    selection: "",
    sold: "",
    editorsChoice: false,
    loading: false,
    error: "",
    success: false,
    redirectToProfile: false,
    formData: undefined
  });
  // update state
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    about: "",
    price: "",
    categories: [],
    category: "",
    subCategories: [],
    subCategory: "",
    onSale: false,
    quantity: "",
    color: "",
    size: "",
    instructions: "",
    brand: "",
    brandDescription: "",
    photo1: "",
    photo2: "",
    photo3: "",
    photo4: "",
    selections: [],
    selection: "",
    sold: "",
    editorsChoice: false,
    loading: false,
    error: "",
    success: false,
    redirectToProfile: false,
    formData: undefined
  });

  const [orders, setOrders] = useState({
    orderItems: [],
    error: ""
  });

  const [allProducts, setAllProducts] = useState([]);

  // destructure user from isAuthenticated
  const { user, token } = isAuthenticated();

  // -- populate the categories, sub categories, selection and set form data --
  const init = () => {
    getCategories().then(data => {
      getSelections().then(dataSelections => {
        getSubCategories().then(dataSub => {
          if (data.error || dataSelections.error || dataSub.error)
            setProduct({ ...product, error: "something went wrong" });
          setSelection({
            ...selection,
            formData: new FormData()
          });
          setProduct({
            ...product,
            categories: data,
            subCategories: dataSub,
            selections: dataSelections,
            formData: new FormData()
          });
          setUpdateProduct({
            ...updateProduct,
            categories: data,
            subCategories: dataSub,
            selections: dataSelections,
            formData: new FormData()
          });
        });
      });
    });
  };
  // populate products for crud
  const populateUpdateProduct = productId => {
    getSingleProduct(productId).then(data => {
      if (data.error) return console.log(data.error);

      setUpdateProduct({
        ...updateProduct,
        name: data.name,
        about: data.about,
        price: data.price,
        category: data.category._id,
        color: data.color,
        editorsChoice: data.editorsChoice,
        instructions: data.instructions,
        onSale: data.onSale,
        quantity: data.quantity,
        selection: data.selection,
        size: data.size,
        sold: data.sold,
        subCategory: data.subCategory._id,
        brand: data.brand,
        brandDescription: data.brandDescription
      });
    });
  };
  const initProducts = () => {
    getProducts().then(data => {
      if (data.error) return console.log(data.error);

      setAllProducts(data);
    });
  };
  // populate categories for crud

  const initCategories = () => {
    getCategories().then(data => {
      if (data.error) return console.log(data.error);

      setCategories(data);
    });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- CATEGORY FUNCTIONS ---
  // remove category

  const removeCategory = categoryId => {
    deleteCategory(user._id, token, categoryId).then(data => {
      if (data.error) return console.log(data.error);

      initCategories();
    });
  };

  const handleChangeCategory = e => {
    setCategory({ ...category, error: "", name: e.target.value });
  };

  const clickSubmitCategory = e => {
    e.preventDefault();
    setCategory({ ...category, error: "", success: false, loading: true });

    createCategory(user._id, token, { name: category.name }).then(data => {
      if (data.error)
        return setCategory({
          ...category,
          error: "Name is already taken",
          success: false
        });

      if (data.error === "")
        return setCategory({
          ...category,
          error: "fields should not be empty",
          success: false,
          loading: false
        });

      setCategory({ ...category, error: "", success: true, loading: false });
    });
  };
  // --- END OF CATEGORY FUNCTIONS ---
  // --- SUB CATEGORY FUNCTIONS ---

  // init selection
  const initSubCategories = () => {
    getSubCategories().then(data => {
      if (data.error) return console.log(data.error);

      setSubCategories(data);
    });
  };
  // remove selection

  const removeSubCategory = subCategoryId => {
    deleteSubCategory(user._id, token, subCategoryId).then(data => {
      if (data.error) return console.log(data.error);

      initSubCategories();
    });
  };

  const handleChangeSubCategory = name => e => {
    setSubCategory({ ...subCategory, [name]: e.target.value, error: "" });
  };

  const clickSubmitSubCategory = e => {
    e.preventDefault();
    setSubCategory({
      ...subCategory,
      error: "",
      success: false,
      loading: true
    });
    // destructure sub category
    createSubCategory(user._id, token, {
      name: subCategory.name,
      category: subCategory.category
    }).then(data => {
      if (data.error)
        return setSubCategory({
          ...subCategory,
          error: "Name is already taken",
          success: false,
          loading: false
        });

      if (data.error === "")
        return setSubCategory({
          ...subCategory,
          error: "fields should not be empty",
          success: false,
          loading: false
        });

      setSubCategory({
        ...subCategory,
        error: "",
        success: true,
        loading: false
      });
    });
  };
  // --- END OF SUB CATEGORY FUNCTIONS
  // --- SELECTION FUNCTIONS ---
  // init selection
  const initSelections = () => {
    getSelections().then(data => {
      if (data.error) return console.log(data.error);

      setSelections(data);
    });
  };
  // remove selection

  const removeSelection = selectionId => {
    deleteSelection(user._id, token, selectionId).then(data => {
      if (data.error) return console.log(data.error);

      initSelections();
    });
  };

  const handleChangeSelection = name => e => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    selection.formData.set(name, value);

    setSelection({ ...selection, error: "", [name]: e.target.value });
  };

  const clickSubmitSelection = e => {
    e.preventDefault();
    setSelection({ ...selection, error: "", success: false, loading: true });

    createSelection(user._id, token, selection.formData).then(data => {
      if (data.error)
        return setSelection({
          ...selection,
          error: data.error,
          success: false,
          loading: false
        });

      if (data.error === "")
        return setSelection({
          ...selection,
          error: "field should not be empty",
          success: false,
          loading: false
        });

      setSelection({ ...selection, error: "", success: true, loading: false });
    });
  };
  // --- END OF SELECTION FUNCTIONS ---
  // --- PRODUCT FUNCTIONS ---
  // delete product
  const removeProduct = productId => {
    deleteProduct(user._id, token, productId).then(data => {
      if (data.error) return console.log(data.error);

      initProducts();
    });
  };
  const handleChangeProduct = name => e => {
    const value =
      name === "photo1" ||
      name === "photo2" ||
      name === "photo3" ||
      name === "photo4"
        ? e.target.files[0]
        : e.target.value;
    product.formData.set(name, value);

    setProduct({ ...product, [name]: value, error: "" });
  };
  // update product
  const handleChangeUpdateProduct = name => e => {
    const value =
      name === "photo1" ||
      name === "photo2" ||
      name === "photo3" ||
      name === "photo4"
        ? e.target.files[0]
        : e.target.value;
    updateProduct.formData.set(name, value);

    setUpdateProduct({ ...updateProduct, [name]: value, error: "" });
  };

  const clickSubmitProduct = e => {
    e.preventDefault();

    setProduct({ ...product, error: "", loading: true });
    if (
      product.name == "" ||
      product.about == "" ||
      product.price == "" ||
      product.quantity == "" ||
      product.color == "" ||
      product.size == "" ||
      product.instructions == "" ||
      product.brand == "" ||
      product.brandDescription == "" ||
      product.photo1 == "" ||
      product.photo2 == "" ||
      product.photo3 == "" ||
      product.photo4 == "" ||
      product.sold == ""
    )
      return setProduct({
        ...product,
        error: "Please fill in all fields",
        loading: false
      });
    createProduct(user._id, token, product.formData)
      .then(data => {
        if (data.error)
          return setProduct({
            ...product,
            error: data.error,
            loading: false,
            success: false
          });

        setProduct({
          ...product,
          loading: false,
          name: "",
          about: "",
          price: "",
          category: "",
          subCategory: "",
          quantity: "",
          color: "",
          size: "",
          instructions: "",
          brand: "",
          brandDescription: "",
          photo1: "",
          photo2: "",
          photo3: "",
          photo4: "",
          selection: "",
          sold: "",
          success: true,
          error: ""
        });
      })
      .catch(error => console.log(error));
  };

  const clickSubmitUpdateProduct = (e, productId) => {
    e.preventDefault();

    setUpdateProduct({ ...updateProduct, error: "", loading: true });

    productUpdate(productId, user._id, token, updateProduct.formData).then(
      data => {
        if (data.error)
          return setUpdateProduct({
            ...updateProduct,
            error: data.error,
            loading: false,
            success: false
          });

        setUpdateProduct({
          ...updateProduct,
          loading: false,
          name: "",
          about: "",
          price: "",
          category: "",
          subCategory: "",
          quantity: "",
          color: "",
          size: "",
          instructions: "",
          brand: "",
          brandDescription: "",
          photo1: "",
          photo2: "",
          photo3: "",
          photo4: "",
          selection: "",
          sold: "",
          success: true,
          error: ""
        });
      }
    );
  };

  // --- END OF PRODUCT FUNCTIONS ---
  // --- ORDER ---
  const initOrders = (userId, tokenId) => {
    listOrders(userId, tokenId).then(data => {
      if (data.error) setOrders({ ...orders, error: data.error });

      setOrders({ ...orders, orderItems: data });
    });
  };

  // --- END OF ORDER ---
  // --- SUCCESS / ERROR FUNCTIONS ---
  const categoryShowSuccess = () => {
    if (category.success)
      return (
        <h3 className="text-center text-success">
          {category.name} is created!
        </h3>
      );
  };
  const categoryShowError = () => {
    if (category.error)
      return <h3 className="text-center text-danger">{category.error}</h3>;
  };
  const subCategoryShowSuccess = () => {
    if (subCategory.success)
      return (
        <h3 className="text-center text-success">
          {subCategory.name} is created!
        </h3>
      );
  };
  const subCategoryShowError = () => {
    if (subCategory.error)
      return <h3 className="text-center text-danger">{subCategory.error}</h3>;
  };
  const productShowSuccess = () => {
    if (product.success)
      return (
        <h3 className="text-center text-success">{product.name} is created!</h3>
      );
  };
  const productShowError = () => {
    if (product.error)
      return <h3 className="text-center text-danger">{product.error}</h3>;
  };
  const selectionShowSuccess = () => {
    if (selection.success)
      return (
        <h3 className="text-center text-success">
          {selection.name} is created!
        </h3>
      );
  };
  const selectionShowError = () => {
    if (selection.error)
      return <h3 className="text-center text-danger">{selection.error}</h3>;
  };
  // --- END OF SUCCESS / ERROR FUNCTIONS ---

  const isLoading = () => {
    if (
      category.loading ||
      product.loading ||
      subCategory.loading ||
      selection.loading
    ) {
      return <Spinner />;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        // category export
        categoryName: category.name,
        handleChangeCategory,
        clickSubmitCategory,
        categoryShowError,
        categoryShowSuccess,
        //sub category export
        subCategoryName: subCategory.name,
        handleChangeSubCategory,
        clickSubmitSubCategory,
        subCategoryShowSuccess,
        subCategoryShowError,
        // selection export
        selectionName: selection.name,
        handleChangeSelection,
        clickSubmitSelection,
        selectionShowSuccess,
        selectionShowError,
        // product export
        productName: product.name,
        productAbout: product.about,
        productPrice: product.price,
        productCategories: product.categories,
        productSubCategories: product.subCategories,
        productOnSale: product.onSale,
        productQuantity: product.quantity,
        productColor: product.color,
        productSize: product.size,
        instructions: product.instructions,
        productBrand: product.brand,
        productBrandDescription: product.brandDescription,
        productSelections: product.selections,
        productSold: product.sold,
        handleChangeProduct,
        clickSubmitProduct,
        productShowSuccess,
        productShowError,
        isLoading,
        // crud product exports
        subCategories,
        selections,
        categories,
        removeCategory,
        populateUpdateProduct,
        allProducts,
        updateProduct,
        // init
        initSubCategories,
        initSelections,
        initProducts,
        initCategories,
        removeProduct,
        removeSelection,
        removeSubCategory,
        // handle func
        handleChangeUpdateProduct,
        clickSubmitUpdateProduct,
        // order export
        orders,
        initOrders
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
