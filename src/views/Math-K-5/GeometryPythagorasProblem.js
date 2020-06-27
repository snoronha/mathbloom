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

  return (
    <div style={props.style}>
      <svg height={150} width={150}>
        <polygon
          points={"20,130 130,130 20,0"}
          fill={"#ffa"}
          stroke={"#888"}
          strokeWidth={1}
        />
        <circle
          cx={60}
          cy={60}
          r={50}
          fill={"#fcc"}
          opacity={0.3}
          stroke={"#a00"}
          strokeWidth={1}
        />
        <text x={10} y={65}>
          4
        </text>
        <text x={65} y={145}>
          3
        </text>
        <text x={0} y={0} transform={"translate(80, 65) rotate(50)"}>
          c = ?
        </text>
      </svg>
    </div>
  );
}
