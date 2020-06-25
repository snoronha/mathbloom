/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { StaticMathField, EditableMathField } from "react-mathquill";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MathUtil from "./MathUtil";

const styles = {
  staticDigitInstance: {
    textAlign: "center",
    width: 42,
    height: 42,
    fontSize: 24,
  },
  editableDigitInstance: {
    textAlign: "center",
    width: 40,
    height: 40,
    fontSize: 24,
  },
};

const useStyles = makeStyles(styles);

export default function Addition(props) {
  const classes = useStyles();
  const [problem, setProblem] = useState({ op1: [], op2: [], result: [] });
  const [solve, setSolve] = useState([]);
  const [resultColor, setResultColor] = useState([]);
  const COLORS = { NOT_TRIED: "#fff", RIGHT: "#8f8", WRONG: "#f88" };

  useEffect(() => {
    // const problemStr = props?.problem;
    const problemStr = MathUtil.generateAdditionProblem(4);
    const newProb = MathUtil.getOperands(problemStr);
    setProblem(newProb);
    // console.log("PROBLEM: ", newProb);
  }, []);

  const onChange = (mathField, idx) => {
    let tmpResColor = resultColor.slice();
    let tmpSolve = solve.slice();
    const fieldVal = mathField.latex();
    tmpSolve[idx] = fieldVal;
    if (problem.result[idx].toString() == fieldVal) {
      tmpResColor[idx] = COLORS.RIGHT;
    } else if (fieldVal) {
      // fieldVal exists
      tmpResColor[idx] = COLORS.WRONG;
    } else {
      tmpResColor[idx] = COLORS.NOT_TRIED;
    }
    setResultColor(tmpResColor);
    setSolve(tmpSolve);
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
        <EditableMathField
          style={{ backgroundColor: resultColor[digIdx] }}
          className={classes.editableDigitInstance}
          key={"result" + digIdx}
          latex={""} // latex value for the input field
          onChange={(mathField) => {
            onChange(mathField, digIdx);
          }}
        />
      ))}
    </div>
  );
}
