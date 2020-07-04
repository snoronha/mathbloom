/*eslint-disable*/
import React, { useState, useEffect } from "react";
// import { Motion, spring } from "react-motion";
import Button from "@material-ui/core/Button";
import Problem from "./Problem";
import MathUtil from "./MathUtil";

const ProblemPanel = (props) => {
  const size = props.size;
  const subject = props.subject;
  const topic = props.topic;
  const NUMPROBLEMS = 10;
  // const [open, setOpen] = useState(new Array(NUMPROBLEMS).fill(0));
  const [count, setCount] = useState(-1);
  const [problems, setProblems] = useState([]);

  const createNewProblems = (subject, topic) => {
    let tmpProblems = [];
    let numDigits, newProb;
    for (let i = 0; i < NUMPROBLEMS; i++) {
      switch (subject) {
        case "Addition":
          switch (topic) {
            case "1 digit":
              newProb = MathUtil.getAdditionOperands(1);
              break;
            case "2 digit":
              newProb = MathUtil.getAdditionOperands(2);
              break;
            case "3 digit":
              newProb = MathUtil.getAdditionOperands(3);
              break;
            case "4 digit":
              newProb = MathUtil.getAdditionOperands(4);
              break;
            default:
              newProb = MathUtil.getAdditionOperands(
                Math.floor(Math.random() * 3) + 2
              );
              break;
          }
          tmpProblems.push(newProb);
          break;

        case "Subtraction":
          switch (topic) {
            case "1 digit":
              newProb = MathUtil.getSubtractionOperands(1);
              break;
            case "2 digit":
              newProb = MathUtil.getSubtractionOperands(2);
              break;
            case "3 digit":
              newProb = MathUtil.getSubtractionOperands(3);
              break;
            case "4 digit":
              newProb = MathUtil.getSubtractionOperands(4);
              break;
            default:
              newProb = MathUtil.getAdditionOperands(
                Math.floor(Math.random() * 3) + 2
              );
              break;
          }
          tmpProblems.push(newProb);
          break;
        case "Multiplication":
          switch (topic) {
            case "1 digit":
              newProb = MathUtil.getMultiplicationOperands(1, 1);
              break;
            case "2 digit":
              numDigits = Math.floor(Math.random() * 2) + 1;
              newProb = MathUtil.getMultiplicationOperands(2, numDigits);
              break;
            case "3 digit":
              numDigits = Math.floor(Math.random() * 2) + 1;
              newProb = MathUtil.getMultiplicationOperands(3, numDigits);
              break;
            case "4 digit":
              numDigits = Math.floor(Math.random() * 3) + 1;
              newProb = MathUtil.getMultiplicationOperands(4, numDigits);
              break;
            default:
              numDigits = Math.floor(Math.random() * 2) + 1;
              newProb = MathUtil.getMultiplicationOperands(3, numDigits);
              break;
          }
          tmpProblems.push(newProb);
          break;
        case "Geometry":
          newProb = MathUtil.getGeometryProblem();
          tmpProblems.push(newProb);
          break;
        case "Algebra":
          newProb = MathUtil.getAlgebraFactorizationProblem();
          tmpProblems.push(newProb);
          break;
      }
    }
    setProblems(tmpProblems);
  };

  useEffect(() => {
    createNewProblems(subject, topic);
    setCount(-1);
  }, [subject, topic]);

  /*
  const handleNext = () => {
    if (count < open.length) {
      if (open[count] === 0) {
        let tmpOpen = open.slice();
        tmpOpen[count] = 1;
        setOpen(tmpOpen);
      } else if (open[count] === 1) {
        let tmpOpen = open.slice();
        tmpOpen[count] = 2;
        if (count < tmpOpen.length - 1) {
          tmpOpen[count + 1] = 1;
        }
        setOpen(tmpOpen);
        setCount(count + 1);
      }
    } else {
      // setCount(0);
      // setOpen(new Array(10).fill(0));
    }
  };

  const handlePrevious = () => {
    if (count < open.length) {
      if (open[count] === 2) {
        let tmpOpen = open.slice();
        tmpOpen[count] = 1;
        setOpen(tmpOpen);
      } else if (open[count] === 1) {
        let tmpOpen = open.slice();
        tmpOpen[count] = 0;
        if (count >= 1) {
          tmpOpen[count - 1] = 1;
          setCount(count - 1);
        }
        setOpen(tmpOpen);
      }
    } else {
      // setCount(0);
      // setOpen(new Array(10).fill(0));
    }
  };
  */

  const handleNext = () => {
    if (count < NUMPROBLEMS) {
      setCount(count + 1);
    }
  };

  const handlePrevious = () => {
    if (count >= 0) {
      setCount(count - 1);
    }
  };

  const handleTouchStart = (e) => {
    // e.preventDefault();
    handleMouseDown();
  };

  return (
    <div>
      {problems.map((problem, idx) => (
        <span
          style={{ display: "flex", justifyContent: "center" }}
          key={idx.toString()}
        >
          {count === idx && (
            <Problem
              style={{
                border: "4px solid #eee",
                borderRadius: "10px",
                padding: "10px",
              }}
              problem={problem}
            />
          )}
        </span>
      ))}
      {count < 0 && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <p style={{ fontSize: 24 }}>
            Start {topic} {subject} ...
          </p>
          <p style={{ fontSize: 18 }}>Press Next to begin</p>
        </div>
      )}
      {count >= NUMPROBLEMS && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <p style={{ fontSize: 24 }}>Done {subject} ...</p>
          <p style={{ fontSize: 18 }}>Get more?</p>
        </div>
      )}
      <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
        <Button
          variant="contained"
          color="default"
          onMouseDown={handlePrevious}
          disabled={count < 0}
        >
          Previous
        </Button>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <Button
          variant="contained"
          color="default"
          onMouseDown={handleNext}
          disabled={count >= NUMPROBLEMS}
        >
          Next
        </Button>
      </div>
    </div>
  );

  /*
  return (
    <div>
      {problems.map((problem, idx) => (
        <Motion
          key={problem.id}
          style={{
            x: spring(
              open[idx] === 0
                ? size.width + 50
                : open[idx] === 1
                ? size.width / 2 - 120
                : -300
            ),
          }}
        >
          {({ x }) => (
            <Problem
              style={{
                position: "absolute",
                WebkitTransform: `translate3d(${x}px, 0, 0)`,
                transform: `translate3d(${x}px, 0, 0)`,
                border: "4px solid #eee",
                borderRadius: "10px",
                padding: "10px",
              }}
              problem={problem}
            />
          )}
        </Motion>
      ))}
      {open[0] === 0 && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          {subject === "addition" && (
            <p style={{ fontSize: 36 }}>Starting Addition ...</p>
          )}
          {subject === "subtraction" && (
            <p style={{ fontSize: 36 }}>Starting Subtraction ...</p>
          )}
          {subject === "multiplication" && (
            <p style={{ fontSize: 36 }}>Starting Multiplication ...</p>
          )}
          <p style={{ fontSize: 18 }}>Please press Next to begin</p>
        </div>
      )}
      <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
        <Button
          variant="contained"
          color="default"
          onMouseDown={handlePrevious}
        >
          Previous
        </Button>
      </div>
      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <Button variant="contained" color="default" onMouseDown={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
  */
};

export default ProblemPanel;
