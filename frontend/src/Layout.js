import React from "react";
import classes from "./components/CoinChart.module.css";
const Layout = ({ title, children }) => {
  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{title}</h3>
      {children}
    </div>
  );
};

export default Layout;
