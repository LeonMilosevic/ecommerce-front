import React from "react";
import { Switch, Route } from "react-router-dom";

// import pages
import Signup from "../user/Signup";
import Signin from "../user/Signin";
import Home from "../main/Home";
import About from "../main/About";
import Account from "../user/Account";
import Shop from "../main/Shop";
import ShopMain from "../main/ShopMain";
import Product from "../main/Product";
import Cart from "../main/Cart";
import WishList from "../main/WishList";
import OnSale from "../main/OnSale";
import Collections from "../main/Collections";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
// admin components
import AdminDashboard from "../admin/AdminDashboard";
import AddCategory from "../admin/category/AddCategory";
import ManageCategory from "../admin/category/ManageCategory";
import AddSubCategory from "../admin/subcategory/AddSubCategory";
import ManageSubCategory from "../admin/subcategory/ManageSubCategory";
import AddSelection from "../admin/selection/AddSelection";
import ManageSelection from "../admin/selection/ManageSelection";
import AddProduct from "../admin/product/AddProduct";
import ManageProducts from "../admin/product/ManageProducts";
import UpdateProduct from "../admin/product/UpdateProduct";
import Orders from "../admin/Orders";
import Order from "../admin/Order";
// end of admin components
// import protected routes
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRoute";
// import context and state
import AdminState from "../../context/admin/AdminState";
import CartState from "../../context/cart/CartState";
import UserState from "../../context/user/UserState";

const Routes = () => {
  return (
    <Switch>
      <CartState>
        <UserState>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/shop" component={ShopMain} />
          <Route exact path="/shop/:shopId" component={Shop} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/wishlist" component={WishList} />
          <Route exact path="/onsale" component={OnSale} />
          <Route exact path="/collections" component={Collections} />
          <Route exact path="/product/:productId" component={Product} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/forgot-password-form/:token"
            component={ResetPassword}
          />
          <PrivateRoute exact path="/user/account" component={Account} />
          <AdminState>
            <AdminRoute
              exact
              path="/admin/dashboard"
              component={AdminDashboard}
            />
            <AdminRoute exact path="/create/category" component={AddCategory} />
            <AdminRoute
              exact
              path="/manage/category"
              component={ManageCategory}
            />
            <AdminRoute
              exact
              path="/create/selection"
              component={AddSelection}
            />
            <AdminRoute
              exact
              path="/manage/selection"
              component={ManageSelection}
            />
            <AdminRoute
              exact
              path="/create/subcategory"
              component={AddSubCategory}
            />
            <AdminRoute
              exact
              path="/manage/subcategory"
              component={ManageSubCategory}
            />
            <AdminRoute exact path="/create/product" component={AddProduct} />
            <AdminRoute
              exact
              path="/manage/product"
              component={ManageProducts}
            />
            <AdminRoute
              exact
              path="/product/update/:productId"
              component={UpdateProduct}
            />
            <AdminRoute exact path="/admin/orders" component={Orders} />
            <AdminRoute exact path="/admin/orders/:orderId" component={Order} />
          </AdminState>
        </UserState>
      </CartState>
    </Switch>
  );
};

export default Routes;
