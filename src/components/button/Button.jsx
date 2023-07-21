import React from "react";

const Button = ({
  onClick = () => {},
  children,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`p-2 rounded-lg hover:opacity-75 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
