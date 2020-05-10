import React from "react";
import css from "./Button.module.css";

const Button = ({ text, onClick, active, disabled = false, className }) => {
  return (
    <button
      disabled={disabled}
      className={`${css.button} ${active ? css.active : ""} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export { Button };
