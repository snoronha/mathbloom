/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Motion, spring } from "react-motion";
import Button from "@material-ui/core/Button";
import Problem from "./Problem";
import MathUtil from "./MathUtil";

const ProblemPanel = (props) => {
  const size = props.size;
  const category = props.category;
  const NUMPROBLEMS = 10;
  const [open, setOpen] = useState(new Array(NUMPROBLEMS).fill(0));
  const [count, setCount] = useState(0);
  const [problems, setProblems] = useState([]);

  const createNewProblems = (category) => {
    let tmpProblems = [];
    for (let i = 0; i < open.length; i++) {
      switch (category) {
        case "addition":
          const numDigits = Math.floor(Math.random() * 3) + 2;
          const problemStr = MathUtil.generateAdditionProblemString(numDigits);
          const newProb = MathUtil.getAdditionOperands(problemStr);
          tmpProblems.push(newProb);
          break;
        case "subtraction":
          break;
      }
    }
    setProblems(tmpProblems);
  };

  useEffect(() => {
    createNewProblems(category);
  }, []);

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

  const handleTouchStart = (e) => {
    // e.preventDefault();
    handleMouseDown();
  };

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
          <p style={{ fontSize: 36 }}>Starting Addition ...</p>
          <p style={{ fontSize: 18 }}>Please press Next to start</p>
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
};

export default ProblemPanel;
