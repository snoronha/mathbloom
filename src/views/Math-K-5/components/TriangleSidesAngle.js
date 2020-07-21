import React from "react";
import MathUtil from "../MathUtil";

// Sides a, b, c (c is base), angles A, B, C in degrees
// Input expected: b, c, A (two sides + included angle)
export default function TriangleSidesAngle(props) {
  const r = 20;
  const p = MathUtil.computeTriangleParams(props);
  const ra = p.A < 50 ? 30 : p.A < 90 ? 20 : 15;
  const rb = p.B < 50 ? 30 : p.B < 90 ? 20 : 15;
  const rc = p.C < 50 ? 30 : p.C < 90 ? 20 : 15;
  const pathA = `M ${ra} 0 A ${ra} ${ra} 0 0 1 ${Math.cos(p.Arad) * ra} ${
    Math.sin(p.Arad) * ra
  }`;
  const pathB = `M ${rb} 0 A ${rb} ${rb} 0 0 1 ${Math.cos(p.Brad) * rb} ${
    Math.sin(p.Brad) * rb
  }`;
  const pathC = `M ${rc} 0 A ${rc} ${rc} 0 0 1 ${Math.cos(p.Crad) * rc} ${
    Math.sin(p.Crad) * rc
  }`;
  const cy = p.points[0][1];
  const cx = p.points[2][0];
  const xOffset = cx < 0 ? -cx : 0;
  const transforma = `translate(0,${cy}) rotate(${-p.A})`;
  const transformb = `translate(${p.c},${cy}) rotate(180)`;
  const transformc = `translate(${cx},0) rotate(${p.B})`;
  const transformA = `translate(10,${cy}) rotate(${-p.A / 2})`;
  const transformB = `translate(${p.c - 20},${p.B > 30 ? cy - 5 : cy}) rotate(${
    p.B > 30 ? p.B / 2 : 0
  })`;
  const transformC = `translate(${cx},0) rotate(0)`;
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
      <path fill={"none"} d={pathA} transform={transforma} />
      <path fill={"none"} d={pathB} transform={transformb} />
      <path fill={"none"} d={pathC} transform={transformc} />
      <text x={0} y={0} fontSize={10} transform={transformA}>
        {Math.round(p.A)}
      </text>
      <text x={0} y={0} fontSize={10} transform={transformB}>
        {Math.round(p.B)}
      </text>
      <text
        x={0}
        y={0}
        fontSize={18}
        fontWeight={"bold"}
        transform={transformC}
      >
        {"C"}
      </text>
      <text x={0} y={0} fontSize={10} transform={textTransformA}>
        {Math.floor(p.a)}
      </text>
      <text x={0} y={0} fontSize={10} transform={textTransformB}>
        {p.b}
      </text>
      <text x={0} y={0} fontSize={10} transform={textTransformC}>
        {p.c}
      </text>
    </g>
  );
}
