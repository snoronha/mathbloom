import React, { useEffect } from "react";

// Sides a, b, c (c is base), angles A, B, C in degrees
// Input expected: b, c, A (two sides + included angle)

export default function TriangleSidesAngle(props) {
  const r = 20;
  const A = props.A; // A in degrees
  const Arad = (A * Math.PI) / 180;
  const b = props.b; // length of side b
  const c = props.c; // length of side c
  const cx = b * Math.cos(Arad);
  const cy = b * Math.sin(Arad);
  const pointA = `0,${cy}`;
  const pointB = `${c},${cy}`;
  const pointC = `${cx},0`;
  const points = `${pointA} ${pointB} ${pointC}`;
  const a = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(Arad));
  const Brad = Math.asin((Math.sin(Arad) * b) / a);
  const Crad = Math.PI - (Arad + Brad);
  const B = (Brad * 180) / Math.PI;
  const C = (Crad * 180) / Math.PI;
  const pathA = `M ${r} 0 A ${r} ${r} 0 0 1 ${Math.cos(Arad) * r} ${
    Math.sin(Arad) * r
  }`;
  const pathB = `M ${r} 0 A ${r} ${r} 0 0 1 ${Math.cos(Brad) * r} ${
    Math.sin(Brad) * r
  }`;
  const pathC = `M ${r} 0 A ${r} ${r} 0 0 1 ${Math.cos(Crad) * r} ${
    Math.sin(Crad) * r
  }`;
  const transformA = `translate(0,${cy}) rotate(${-A})`;
  const transformB = `translate(${props.c},${cy}) rotate(180)`;
  const transformC = `translate(${cx},0) rotate(${(Brad * 180) / Math.PI})`;
  const textTransformA = `translate(${(c + cx) / 2},${cy / 2}) rotate(${B})`;
  const textTransformB = `translate(${cx / 2},${cy / 2}) rotate(${-A})`;
  const textTransformC = `translate(${c / 2 - 20},${cy + 12})`;
  return (
    <g stroke={"#888"} strokeWidth={1}>
      <polygon points={points} fill={"#ffa"} opacity={0.8} />
      <path fill={"none"} d={pathA} transform={transformA} />
      <path fill={"none"} d={pathB} transform={transformB} />
      <path fill={"none"} d={pathC} transform={transformC} />
      <text x={0} y={0} transform={textTransformA}>
        {Math.floor(a)}
      </text>
      <text x={0} y={0} transform={textTransformB}>
        {b}
      </text>
      <text x={0} y={0} transform={textTransformC}>
        {c}
      </text>
    </g>
  );
}
