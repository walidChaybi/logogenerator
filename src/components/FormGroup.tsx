import React from "react";

function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="flex flex-col " {...props}>
      {props.children}
    </div>
  );
}

export default FormGroup;
