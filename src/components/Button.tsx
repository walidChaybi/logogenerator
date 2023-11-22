import React from "react";

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return <button {...props}></button>;
}

export default Button;
