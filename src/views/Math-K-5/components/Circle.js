import React from "react";

export default function Circle(props) {
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      fill={"#fdd"}
      opacity={0.3}
      stroke={"#a00"}
      strokeWidth={1}
    />
  );
}
