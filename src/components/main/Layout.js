import React from "react";

const Layout = ({
  jumboPadding = "",
  bgimg,
  header = "",
  icon = "",
  name = "",
  link = "",
  children,
  buttonName = ""
}) => {
  return (
    <div
      className="jumbotron jumbotron-background"
      style={{
        padding: jumboPadding,
        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${bgimg}) no-repeat fixed center`,
        backgroundSize: "cover"
      }}
    >
      <h1 className="jumbotron-header mb-4">{header}</h1>
      <div>{icon}</div>
      <h3 className="jumbotron-subheader mb-3">{name}</h3>
      {link}
      {buttonName}
      {children}
    </div>
  );
};

export default Layout;
