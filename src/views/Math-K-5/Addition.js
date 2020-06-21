/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { StaticMathField, EditableMathField } from "react-mathquill";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
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

  // getOperands "53+25=78" => {op1: [5, 3], op2: [2, 5], result: [7, 8]}
  const generateProblem = (numDigits) => {
    const min = Math.pow(10, numDigits - 1); // e.g. min = 100
    const max = Math.pow(10, numDigits) - min; // e.g. max = 900
    const op1 = Math.floor(Math.random() * max) + min;
    const op2 = Math.floor(Math.random() * max) + min;
    const res = op1 + op2;
    return `${op1.toString()} + ${op2.toString()} = ${res.toString()}`;
  };
  const getOperands = (str) => {
    const equationParts = str.split("=");
    const L = equationParts[0].trim();
    const R = equationParts[1].trim();
    const operands = L.split("+");
    const op1Arr = operands[0]
      .trim()
      .split("")
      .map((s) => parseInt(s));
    const op2Arr = operands[1]
      .trim()
      .split("")
      .map((s) => parseInt(s));
    const resArr = R.split("").map((s) => parseInt(s));
    if (resArr.length > op1Arr.length) {
      for (let i = 0; i < resArr.length - op1Arr.length; i++) {
        op1Arr.unshift("");
      }
    }
    if (resArr.length > op2Arr.length) {
      for (let i = 0; i < resArr.length - op2Arr.length; i++) {
        op2Arr.unshift("");
      }
    }
    return { op1: op1Arr, op2: op2Arr, result: resArr };
  };
  useEffect(() => {
    // const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");
    // const problemStr = props?.problem;
    const problemStr = generateProblem(4);
    setProblem(getOperands(problemStr));
    console.log("PROBLEM: ", problem);
  }, []);

  const onChange = (mathField) => {
    // setLatex(mathField.latex())
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
          className={classes.editableDigitInstance}
          key={"result" + digIdx}
          latex={digit} // latex value for the input field
          onChange={(mathField) => {
            onChange(matchMedia);
          }}
        />
      ))}
    </div>
  );
}
