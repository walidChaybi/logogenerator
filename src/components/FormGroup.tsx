import React from "react";

function FormGroup(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className="flex flex-col gap-1" {...props}>
      {props.children}
    </div>
  );
}

export default FormGroup;
