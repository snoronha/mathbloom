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

export default function Problem(props) {
  const classes = useStyles();
  const [problem, setProblem] = useState(props.problem);
  // const [soln, setSoln] = useState([]);
  const [resultColor, setResultColor] = useState([]);
  // single array is for resultColor insufficient.
  // Multiplication has several rows fillable by user
  const COLORS = { NOT_TRIED: "#fff", RIGHT: "#8f8", WRONG: "#f88" };

  useEffect(() => {
    // clone empty problem into resultColor
    let tmpResColor = [];
    problem.specs.forEach((spec) => {
      if (spec.data) {
        tmpResColor.push(new Array(spec.data.length).fill(COLORS.NOT_TRIED));
      } else {
        tmpResColor.push(new Array(1).fill(COLORS.NOT_TRIED));
      }
    });
    setResultColor(tmpResColor);
  }, []);

  const onChange = (mathField, specIdx, digIdx) => {
    let tmpResColor = [];
    resultColor.forEach((row) => {
      tmpResColor.push(row.slice());
    });
    // let tmpSoln = soln.slice();
    const fieldVal = mathField.latex();
    // tmpSoln[digIdx] = fieldVal;
    const data = problem.specs[specIdx].data;
    if (data[digIdx].toString() == fieldVal) {
      tmpResColor[specIdx][digIdx] = COLORS.RIGHT;
    } else if (fieldVal) {
      // fieldVal exists
      tmpResColor[specIdx][digIdx] = COLORS.WRONG;
    } else {
      tmpResColor[specIdx][digIdx] = COLORS.NOT_TRIED;
    }
    setResultColor(tmpResColor);
    // setSoln(tmpSoln);
  };

  return (
    <div style={props.style}>
      {problem.specs.map((spec, specIdx) => (
        <div key={specIdx.toString()}>
          {spec.type === "static" && (
            <span>
              {spec.data.map((digit, digIdx) => (
                <span key={"op1" + digIdx}>
                  <StaticMathField className={classes.staticDigitInstance}>
                    {digit}
                  </StaticMathField>
                </span>
              ))}
            </span>
          )}
          {spec.type === "hr" && <hr style={{ marginBottom: 20 }} />}
          {spec.type === "editable" && resultColor.length > 0 && (
            <span>
              {spec.data.map((digit, digIdx) => (
                <span key={`res-${specIdx}-${digIdx}`}>
                  {parseInt(digit) >= 0 ? (
                    <EditableMathField
                      style={{ backgroundColor: resultColor[specIdx][digIdx] }}
                      className={classes.editableDigitInstance}
                      key={"result" + digIdx}
                      latex={""} // latex value for the input field
                      onChange={(mathField) => {
                        onChange(mathField, specIdx, digIdx);
                      }}
                    />
                  ) : (
                    <StaticMathField className={classes.staticDigitInstance}>
                      {digit}
                    </StaticMathField>
                  )}
                </span>
              ))}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
