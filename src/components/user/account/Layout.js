import React from "react";
// import bootstrap

const Layout = props => {
  return (
    <div className="container layout-background py-2">
      <div className="account-layout-background">
        <span className="account-layout-icon">{props.icon}</span>
      </div>

      <div className="text-center">
        <h1 className="account-layout-header pt-5">{props.title}</h1>
        <p className="account-layout-subheader">{props.subtitle}</p>
      </div>

      {props.children}
    </div>
  );
};

export default Layout;
