import React from "react";

function Button(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className="w-[200px] rounded-md bg-blue-400 px-4 py-2 hover:bg-blue-300"
    >
      {props.children}
    </button>
  );
}

export default Button;
