import React from "react";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <h1 className={css.h1}>Runify</h1>
      <h2 className={css.h2}>A running playlist creator, based on your taste</h2>
    </header>
  );
};

export { Header };
