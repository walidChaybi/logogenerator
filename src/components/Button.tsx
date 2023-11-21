import React from "react";

function Button(
  props: React.ComponentPropsWithoutRef<"button"> & {
    variant?: "login" | "logout";
  }
) {
  const color = props.variant === "login" ? "login" : "login logout";
  return (
    <button {...props} className={color}>
      {props.children}
    </button>
  );
}

export default Button;
