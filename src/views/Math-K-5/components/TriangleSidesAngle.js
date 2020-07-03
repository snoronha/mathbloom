import React from "react";
import MathUtil from "../MathUtil";

// Sides a, b, c (c is base), angles A, B, C in degrees
// Input expected: b, c, A (two sides + included angle)
export default function TriangleSidesAngle(props) {
  const r = 20;
  const p = MathUtil.computeTriangleParams(props);
  const pathA = `M ${r} 0 A ${r} ${r} 0 0 1 ${Math.cos(p.Arad) * r} ${
    Math.sin(p.Arad) * r
  }`;
  const pathB = `M ${r} 0 A ${r} ${r} 0 0 1 ${Math.cos(p.Brad) * r} ${
    Math.sin(p.Brad) * r
  }`;
  const pathC = `M ${r} 0 A ${r} ${r} 0 0 1 ${Math.cos(p.Crad) * r} ${
    Math.sin(p.Crad) * r
  }`;
  const cy = p.points[0][1];
  const cx = p.points[2][0];
  const xOffset = cx < 0 ? -cx : 0;
  const transformA = `translate(0,${cy}) rotate(${-p.A})`;
  const transformB = `translate(${p.c},${cy}) rotate(180)`;
  const transformC = `translate(${cx},0) rotate(${(p.Brad * 180) / Math.PI})`;
  const textTransformA = `translate(${(p.c + cx) / 2},${cy / 2}) rotate(${
    p.B
  })`;
  const textTransformB = `translate(${cx / 2},${cy / 2}) rotate(${-p.A})`;
  const textTransformC = `translate(${p.c / 2},${cy + 12})`;
  const points = `${p.points[0].join(",")} ${p.points[1].join(
    ","
  )} ${p.points[2].join(",")}`;

  return (
    <g stroke={"#888"} transform={`translate(${xOffset},0)`} strokeWidth={1}>
      <polygon points={points} fill={"#ffa"} opacity={0.8} />
      <path fill={"none"} d={pathA} transform={transformA} />
      <path fill={"none"} d={pathB} transform={transformB} />
      <path fill={"none"} d={pathC} transform={transformC} />
      <text x={0} y={0} transform={textTransformA}>
        {Math.floor(p.a)}
      </text>
      <text x={0} y={0} transform={textTransformB}>
        {p.b}
      </text>
      <text x={0} y={0} transform={textTransformC}>
        {p.c}
      </text>
    </g>
  );
}
