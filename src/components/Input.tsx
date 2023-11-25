import React from "react";

function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <label className="input">
      <input {...props} className="input__field" placeholder="" />
      <span className="input__label flex">
        <h2 className="text-xl text-indigo-400">
          1. Icon idea, be as descriptive as possible
        </h2>
      </span>
    </label>
  );
}

export default Input;
