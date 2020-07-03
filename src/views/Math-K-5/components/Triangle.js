import React from "react";

// Draws any polygon, not just a triangle
export default function Triangle(props) {
  return (
    <polygon
      points={props.points}
      fill={"#ffa"}
      stroke={"#888"}
      strokeWidth={1}
    />
  );
}
