import React from "react";
import { FcIdea } from "react-icons/fc";

function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <label className="input">
      <input {...props} className="input__field" placeholder="" />
      <span className="input__label flex">
        <p>Icon idea </p>
        <FcIdea />
      </span>
    </label>
  );
}

export default Input;
