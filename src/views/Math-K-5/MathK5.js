/*eslint-disable*/
import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import { withSize } from "react-sizeme";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Addition from "./Addition";
import MathUtil from "./MathUtil";

const styles = {
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

const MathK5 = ({ size }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(new Array(10).fill(0));
  const [count, setCount] = useState(0);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    let tmpProblems = [];

    for (let i = 0; i < 10; i++) {
      const numDigits = Math.floor(Math.random() * 3) + 2;
      const problemStr = MathUtil.generateAdditionProblemString(numDigits);
      const newProb = MathUtil.getOperands(problemStr);
      tmpProblems.push(newProb);
    }
    setProblems(tmpProblems);
    // console.log("PROBLEM: ", newProb);
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
      setCount(0);
      setOpen(new Array(10).fill(0));
    }
  };

  const handleTouchStart = (e) => {
    // e.preventDefault();
    handleMouseDown();
  };

  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Math Grades K - 5</h4>
      </CardHeader>
      <CardBody style={{ height: 150 }}>
        {problems.map((problem, idx) => (
          <Motion
            key={idx.toString()}
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
              <Addition
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

        <button onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
          Toggle
        </button>
      </CardBody>
    </Card>
  );
};

export default withSize()(MathK5);
