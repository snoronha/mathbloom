/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Motion, spring } from "react-motion";
import Button from "@material-ui/core/Button";
import SubtractionProblem from "./SubtractionProblem";
import MathUtil from "./MathUtil";

const SubtractionPanel = (props) => {
  const size = props.size;
  const NUMPROBLEMS = 10;
  const [open, setOpen] = useState(new Array(NUMPROBLEMS).fill(0));
  const [count, setCount] = useState(0);
  const [problems, setProblems] = useState([]);

  const createNewProblems = () => {
    let tmpProblems = [];
    for (let i = 0; i < open.length; i++) {
      const numDigits = Math.floor(Math.random() * 3) + 2;
      const problemStr = MathUtil.generateSubtractionProblemString(numDigits);
      const newProb = MathUtil.getSubtractionOperands(problemStr);
      tmpProblems.push(newProb);
    }
    setProblems(tmpProblems);
  };

  useEffect(() => {
    createNewProblems();
  }, []);

  const handleMouseDown = () => {
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
                ? size.width
                : open[idx] === 1
                ? size.width / 2 - 120
                : -300
            ),
          }}
        >
          {({ x }) => (
            <SubtractionProblem
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
      <br />
      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <Button variant="contained" color="info" onMouseDown={handleMouseDown}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default SubtractionPanel;
