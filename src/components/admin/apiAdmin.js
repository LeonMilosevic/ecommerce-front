import { API } from "../../config";

// ---category crud---

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const deleteCategory = (userId, token, categoryId) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

// ---end of category crud---
// ---subcategory crud---
export const createSubCategory = (userId, token, subCategory) => {
  return fetch(`${API}/subcategory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(subCategory)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSubCategories = () => {
  return fetch(`${API}/subcategories`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const deleteSubCategory = (userId, token, subCategoryId) => {
  return fetch(`${API}/subcategory/${subCategoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

//---end of subcategory crud---
// ---product crud---
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const productUpdate = (productId, userId, token, product) => {
  console.log(product);
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: product
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getProducts = () => {
  return fetch(`${API}/products?limit=undefined`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const deleteProduct = (userId, token, productId) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getSingleProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
//---end of product crud
//---selection crud---
export const createSelection = (userId, token, selection) => {
  return fetch(`${API}/selection/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: selection
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};

export const getSelections = () => {
  return fetch(`${API}/selections`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const deleteSelection = (userId, token, selectionId) => {
  return fetch(`${API}/selection/${selectionId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
//---end of selection crud---

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const loadSingleOrder = (userId, token, orderId) => {
  return fetch(`${API}/order/${orderId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/status-update/${orderId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status, orderId })
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};
