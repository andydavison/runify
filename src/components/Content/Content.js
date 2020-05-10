import React from "react";
import css from "./Content.module.css";

const Content = ({ children, className }) => (
  <div className={`${css.container} ${className}`}>{children}</div>
);

export { Content };
