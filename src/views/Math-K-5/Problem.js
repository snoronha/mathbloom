/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { StaticMathField, EditableMathField } from "react-mathquill";
import TriangleSidesAngle from "./components/TriangleSidesAngle";
import { makeStyles } from "@material-ui/core/styles";
import MathUtil from "./MathUtil";

const styles = {
  staticDigitInstance: {
    "line-height": "35px",
    textAlign: "center",
    width: 42,
    height: "auto",
    fontSize: 24,
  },
  staticStringInstance: {
    fontSize: 24,
  },
  editableInstance: {
    textAlign: "center",
    width: "auto",
    minWidth: 80,
    height: "auto",
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
  let problem = props.problem;
  // console.log("PROBLEM: ", problem);
  const [answerCorrect, setAnswerCorrect] = useState(null);
  const [answer, setAnswer] = useState([]);
  const [singleAnswer, setSingleAnswer] = useState("");
  const COLORS = { NOT_TRIED: "#fff", RIGHT: "#8f8", WRONG: "#f88" };

  useEffect(() => {
    // clone spec part of problem into tmpAnswer
    if (problem.attempt) {
      setSingleAnswer(problem.attempt);
    } else {
      let tmpAnswer = [];
      problem.specs.forEach((spec) => {
        if (spec.data) {
          let tmpRow = [];
          spec.data.forEach((el, idx) => {
            if (spec.attempt) {
              if (spec.attempt[idx] == el.toString()) {
                tmpRow.push({ color: COLORS.RIGHT, answer: spec.attempt[idx] });
              } else if (spec.attempt[idx]) {
                // fieldVal exists
                tmpRow.push({ color: COLORS.WRONG, answer: spec.attempt[idx] });
              } else {
                tmpRow.push({
                  color: COLORS.NOT_TRIED,
                  answer: spec.attempt[idx],
                });
              }
            } else {
              tmpRow.push({ color: COLORS.NOT_TRIED, answer: "" });
            }
          });
          tmpAnswer.push(tmpRow);
        } else {
          let tmpRow = [{ color: COLORS.NOT_TRIED, answer: "" }];
          tmpAnswer.push(tmpRow);
        }
      });
      setAnswer(tmpAnswer);
    }
  }, []);

  const onChange = (mathField, specIdx, digIdx) => {
    let tmpAnswer = MathUtil.deepCopyObject(answer);
    const fieldVal = mathField.latex();
    // set attempt for each problem type - right now done only for addition
    problem.specs[specIdx].attempt[digIdx] = fieldVal;
    const data = problem.specs[specIdx].data;
    if (data[digIdx].toString() == fieldVal) {
      tmpAnswer[specIdx][digIdx].color = COLORS.RIGHT;
    } else if (fieldVal) {
      // fieldVal exists
      tmpAnswer[specIdx][digIdx].color = COLORS.WRONG;
    } else {
      tmpAnswer[specIdx][digIdx].color = COLORS.NOT_TRIED;
    }
    props.updateProblem(problem);
    setAnswer(tmpAnswer);
  };

  const onFieldChange = (mathField, problem, spec) => {
    const fieldVal = mathField.latex().toString();

    problem.attempt = fieldVal;
    if (fieldVal) {
      let matched = false;
      for (let k in problem.answer) {
        if (problem.answer[k] === fieldVal) {
          matched = true;
        }
      }
      if (problem.answer.indexOf(fieldVal) >= 0) {
        setAnswerCorrect(true);
      } else {
        setAnswerCorrect(false);
      }
    } else {
      setAnswerCorrect(null);
    }
    props.updateProblem(problem);
  };
  const HorizontalRule = () => {
    return (
      <hr
        style={{
          justifyContent: "center",
          width: "100%",
        }}
      />
    );
  };
  const HtmlText = (props) => {
    // return <span dangerouslySetInnerHTML={{ __html: props.data }} />;
    return <span style={props.style}>{props.data}</span>;
  };
  const StaticString = (props) => {
    return (
      <span style={props.style}>
        <StaticMathField className={classes.staticStringInstance}>
          {props.data}
        </StaticMathField>
      </span>
    );
  };
  const StaticDigit = (props) => {
    return (
      <StaticMathField className={classes.staticDigitInstance}>
        {props.digit}
      </StaticMathField>
    );
  };
  const Triangle = ({ props }) => {
    return (
      <svg>
        <g transform={"translate(25, 25) rotate(0)"}>
          <TriangleSidesAngle {...props} />
        </g>
      </svg>
    );
  };
  // <Mixed subspec={subspec} subspecIdx={subspecIdx} />
  // replaces <span key={subspecIdx.toString()}> ... </span>
  // works except the answer field behaves weird
  const Mixed = (props) => {
    const subspec = props.subspec;
    const subspecIdx = props.subspecIdx;
    if (subspec.type === "html") {
      return <HtmlText style={subspec.style} data={subspec.data} />;
    } else if (subspec.type === "staticString") {
      return <StaticString style={subspec.style} data={subspec.data} />;
    } else if (subspec.type === "triangle") {
      return <Triangle style={subspec.style} props={subspec.data} />;
    } else if (subspec.type === "editable") {
      return (
        <EditableMathField
          style={{
            backgroundColor:
              answerCorrect === null ? "#fff" : answerCorrect ? "#cfc" : "#fcc",
          }}
          className={classes.editableInstance}
          key={"result" + subspecIdx}
          latex={singleAnswer} // latex value for the input field
          onChange={(mathField) => {
            onFieldChange(mathField, problem, subspec);
          }}
        />
      );
    }
  };
  /*
  const EditableDigit = (props) => {
    return (
      <EditableMathField
        style={props.style}
        className={classes.editableDigitInstance}
        key={"result" + props.digIdx}
        latex={""} // latex value for the input field
        onChange={(mathField) => {
          onChange(mathField, props.specIdx, props.digIdx);
        }}
      />
    );
  };
  */
  return (
    <div style={props.style}>
      {problem.specs.map((spec, specIdx) => (
        <div style={{ display: "flex" }} key={specIdx.toString()}>
          {spec.type === "html" && <HtmlText data={spec.data} />}
          {spec.type === "staticString" && (
            <StaticString style={spec.style} data={spec.data} />
          )}
          {spec.type === "hr" && <HorizontalRule />}
          {spec.type === "mixed" && (
            <span style={spec.style}>
              {spec.data.map((subspec, subspecIdx) => (
                <span key={subspecIdx.toString()}>
                  {subspec.type === "html" && (
                    <HtmlText style={subspec.style} data={subspec.data} />
                  )}
                  {subspec.type === "staticString" && (
                    <StaticString style={subspec.style} data={subspec.data} />
                  )}
                  {subspec.type === "triangle" && (
                    <Triangle style={subspec.style} props={subspec.data} />
                  )}
                  {subspec.type === "editable" && (
                    <EditableMathField
                      style={{
                        backgroundColor:
                          answerCorrect === null
                            ? "#fff"
                            : answerCorrect
                            ? "#cfc"
                            : "#fcc",
                      }}
                      className={classes.editableInstance}
                      key={"result" + subspecIdx}
                      latex={singleAnswer} // latex value for the input field
                      onChange={(mathField) => {
                        onFieldChange(mathField, problem, subspec);
                      }}
                    />
                  )}
                </span>
              ))}
            </span>
          )}
          {spec.type === "static" && (
            <span style={spec.style}>
              {spec.data.map((digit, digIdx) => (
                <span key={"op1" + digIdx}>
                  <StaticDigit digit={digit} />
                </span>
              ))}
            </span>
          )}
          {spec.type === "editable" && answer.length > 0 && (
            <span>
              {spec.data.map((digit, digIdx) => (
                <span key={`res-${specIdx}-${digIdx}`}>
                  {parseInt(digit) >= 0 ? (
                    <EditableMathField
                      style={{ backgroundColor: answer[specIdx][digIdx].color }}
                      className={classes.editableDigitInstance}
                      key={"result" + digIdx}
                      latex={answer[specIdx][digIdx].answer} // latex value for the input field
                      onChange={(mathField) => {
                        onChange(mathField, specIdx, digIdx);
                      }}
                    />
                  ) : (
                    <StaticDigit digit={digit} />
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
