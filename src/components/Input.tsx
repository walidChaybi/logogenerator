import React from "react";

function Input(props: React.ComponentPropsWithoutRef<"input">) {
  return (
    <label className="input">
      <input {...props} className="input__field" placeholder="" />
      <span className="input__label flex">
        <h2 className="text-lg text-gray-400">
          Bodybuilding, strong man with a red t-shirt, full body
        </h2>
      </span>
    </label>
  );
}

export default Input;
