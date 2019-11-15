export const addItem = item => {
  let cart = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count: 1
    });
    cart = Array.from(new Set(cart.map(p => p._id))).map(id =>
      cart.find(p => p._id === id)
    );

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const itemTotal = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }

  return 0;
};

export const getCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }

  return [];
};

export const updateCart = (id, count) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === id) {
        return (cart[i].count = count);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeCart = (id, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === id) {
        return cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  next();
};

export const emptyCart = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
  }
};

// wishlist ls

export const wishAdd = item => {
  let wishlist = [];

  if (typeof window !== undefined) {
    if (localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(localStorage.getItem("wishlist"));
    }
    wishlist.push(item);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const getWish = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("wishlist")) {
      return JSON.parse(localStorage.getItem("wishlist"));
    }
  }

  return [];
};

export const removeWish = (id, next) => {
  let wishlist = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(localStorage.getItem("wishlist"));
    }

    wishlist.map((product, i) => {
      if (product._id === id) {
        return wishlist.splice(i, 1);
      }
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
  next();
};
