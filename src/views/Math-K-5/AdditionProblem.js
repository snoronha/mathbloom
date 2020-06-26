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

export default function AdditionProblem(props) {
  const classes = useStyles();
  const [problem, setProblem] = useState(props.problem);
  const [soln, setSoln] = useState([]);
  const [resultColor, setResultColor] = useState([]);
  const COLORS = { NOT_TRIED: "#fff", RIGHT: "#8f8", WRONG: "#f88" };
  console.log("PROBLEM: ", problem);

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
      {problem.op1.map((digit, digIdx) => (
        <span key={"op1" + digIdx}>
          <StaticMathField className={classes.staticDigitInstance}>
            {digit}
          </StaticMathField>
        </span>
      ))}
      <br />
      {problem.op2.map((digit, digIdx) => (
        <span key={"op2" + digIdx}>
          <StaticMathField className={classes.staticDigitInstance}>
            {digit}
          </StaticMathField>
        </span>
      ))}
      <br />
      {problem.result.map((digit, digIdx) => (
        <span key={"res" + digIdx}>
          {parseInt(digit) >= 0 ? (
            <EditableMathField
              style={{ backgroundColor: resultColor[digIdx] }}
              className={classes.editableDigitInstance}
              key={"result" + digIdx}
              latex={""} // latex value for the input field
              onChange={(mathField) => {
                onChange(mathField, digIdx);
              }}
            />
          ) : (
            <StaticMathField className={classes.staticDigitInstance}>
              {""}
            </StaticMathField>
          )}
        </span>
      ))}
    </div>
  );
}
