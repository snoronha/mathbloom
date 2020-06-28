/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { StaticMathField, EditableMathField } from "react-mathquill";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  staticDigitInstance: {
    "line-height": "35px",
    textAlign: "center",
    width: 42,
    height: 42,
    fontSize: 24,
  },
  editableDigitInstance: {
    textAlign: "center",
    width: 40,
    height: 40,
    "line-height": "35px",
    fontSize: 24,
  },
};

const useStyles = makeStyles(styles);

export default function GeometryPythagorasProblem(props) {
  const classes = useStyles();
  const [problem, setProblem] = useState(props.problem);
  const [soln, setSoln] = useState([]);
  const [resultColor, setResultColor] = useState([]);
  const COLORS = { NOT_TRIED: "#fff", RIGHT: "#8f8", WRONG: "#f88" };

  const onChange = (mathField, idx) => {
    let tmpResColor = resultColor.slice();
    let tmpSoln = soln.slice();
    const fieldVal = mathField.latex();
    tmpSoln[idx] = fieldVal;
    if (problem.result[idx].toString() == fieldVal) {
      tmpResColor[idx] = COLORS.RIGHT;
    } else if (fieldVal) {
      // fieldVal exists
      tmpResColor[idx] = COLORS.WRONG;
    } else {
      tmpResColor[idx] = COLORS.NOT_TRIED;
    }
    setResultColor(tmpResColor);
    setSoln(tmpSoln);
  };

  // Sides a, b, c (c is base), angles A, B, C in degrees
  // Input expected: b, c, A (two sides + included angle)
  const TriangleSidesAngle = (props) => {
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
  };

  const Triangle = (props) => {
    return (
      <polygon
        points={props.points}
        fill={"#ffa"}
        stroke={"#888"}
        strokeWidth={1}
      />
    );
  };

  const Circle = (props) => {
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
  };

  return (
    <div style={props.style}>
      <svg height={200} width={200}>
        <g transform={"translate(25, 25) rotate(0)"}>
          <TriangleSidesAngle b={160} c={150} A={80} />
        </g>
      </svg>
    </div>
  );
}
