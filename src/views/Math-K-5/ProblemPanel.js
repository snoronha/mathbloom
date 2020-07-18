/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Slide from "react-reveal/Slide";
import Problem from "./Problem";
import MathUtil from "./MathUtil";

const ProblemPanel = (props) => {
  const size = props.size;
  const subject = props.subject;
  const topic = props.topic;
  const [count, setCount] = useState(-1);
  const [currentProblem, setCurrentProblem] = useState({});

  const createNewProblem = (subj, tpc) => {
    let numDigits, newProb;
    switch (subj) {
      case "Addition":
        switch (tpc) {
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
        setCurrentProblem(newProb);
        break;

      case "Subtraction":
        switch (tpc) {
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
        setCurrentProblem(newProb);
        break;
      case "Multiplication":
        switch (tpc) {
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
        setCurrentProblem(newProb);
        break;
      case "Geometry":
        newProb = MathUtil.getGeometryProblem();
        setCurrentProblem(newProb);
        break;
      case "Algebra":
        switch (tpc) {
          case "Linear":
            newProb = MathUtil.getAlgebraFactorizationProblem();
            break;
          case "Quadratic":
            newProb = MathUtil.getAlgebraFactorizationProblem();
            break;
          case "Equations":
            newProb = MathUtil.getAlgebraQuadraticProblem();
            break;
          default:
            newProb = MathUtil.getAlgebraQuadraticProblem();
            break;
        }
        setCurrentProblem(newProb);
        break;
    }
  };

  useEffect(() => {
    if (subject !== "" && topic !== "") {
      setCount(-1);
      setCurrentProblem({});
    }
  }, [subject, topic]);

  const handleNext = () => {
    if (subject !== "" && topic !== "") {
      createNewProblem(subject, topic);
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
      {/* problems.map((problem, idx) => (
        <span
          style={{ display: "flex", justifyContent: "center" }}
          key={idx.toString()}
        >
          {count === idx && (
            <Slide right>
              <Problem
                style={{
                  border: "4px solid #eee",
                  borderRadius: "10px",
                  padding: "10px",
                }}
                problem={problem}
              />
            </Slide>
          )}
        </span>
      )) */}
      {currentProblem.specs && (
        <span
          style={{ display: "flex", justifyContent: "center" }}
          key={currentProblem.id}
        >
          <Slide right>
            <Problem
              style={{
                border: "4px solid #eee",
                borderRadius: "10px",
                padding: "10px",
              }}
              problem={currentProblem}
            />
          </Slide>
        </span>
      )}
      {count < 0 && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <p style={{ fontSize: 24 }}>
            Start {topic} {subject} ...
          </p>
          <p style={{ fontSize: 18 }}>Press Next to begin</p>
        </div>
      )}
      {/* count >= NUMPROBLEMS && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <p style={{ fontSize: 24 }}>Done {subject} ...</p>
          <p style={{ fontSize: 18 }}>Get more?</p>
        </div>
      ) */}
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
        <Button variant="contained" color="default" onMouseDown={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProblemPanel;
