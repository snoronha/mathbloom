/*eslint-disable*/
import React, { useState } from "react";
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
};

const useStyles = makeStyles(styles);

export default function Addition(props) {
  // getOperands "53+25=78" => {op1: [5, 3], op2: [2, 5], result: [7, 8]}
  const generateProblem = (numDigits) => {
    const min = Math.pow(10, numDigits - 1);
    const max = Math.pow(10, numDigits) - 1;
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
    return { op1: op1Arr, op2: op2Arr, result: resArr };
  };
  const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");
  // const problemStr = props?.problem;
  const problemStr = generateProblem(3);
  const problem = getOperands(problemStr);
  console.log("PROBLEM: ", problem);

  const onChange = (mathField) => {
    // setLatex(mathField.latex())
    console.log("latex: ", mathField);
  };

  return (
    <>
      {problem.op1.map((digit, digIdx) => (
        <span key={"op1" + digIdx}>
          <StaticMathField style={{ width: 40 }}>{digit}</StaticMathField>
        </span>
      ))}
      <br />
      {problem.op2.map((digit, digIdx) => (
        <span key={"op2" + digIdx}>
          <StaticMathField style={{ width: 40 }}>{digit}</StaticMathField>
        </span>
      ))}
      <br />
      {problem.result.map((digit, digIdx) => (
        <EditableMathField
          style={{ width: 40 }}
          key={"result" + digIdx}
          latex={digit} // latex value for the input field
          onChange={(mathField) => {
            onChange(matchMedia);
          }}
        />
      ))}
    </>
  );
}
