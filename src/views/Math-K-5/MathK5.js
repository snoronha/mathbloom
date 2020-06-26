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
import AdditionPanel from "./AdditionPanel";
import SubtractionPanel from "./SubtractionPanel";
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
  },
};

const useStyles = makeStyles(styles);

const MathK5 = ({ size }) => {
  const NUMPROBLEMS = 10;
  const classes = useStyles();
  const [open, setOpen] = useState(new Array(NUMPROBLEMS).fill(0));
  const [addOpen, setAddOpen] = useState(new Array(NUMPROBLEMS).fill(0));
  const [count, setCount] = useState(0);
  const [addCount, setAddCount] = useState(0);
  const [problems, setProblems] = useState([]);
  const [addProblems, setAddProblems] = useState([]);

  const createNewProblems = () => {
    let tmpProblems = [];
    let tmpAddProblems = [];
    for (let i = 0; i < open.length; i++) {
      const numDigits = Math.floor(Math.random() * 3) + 2;
      const problemStr = MathUtil.generateSubtractionProblemString(numDigits);
      const newProb = MathUtil.getSubtractionOperands(problemStr);
      tmpProblems.push(newProb);
    }
    setProblems(tmpProblems);
    for (let i = 0; i < addOpen.length; i++) {
      const numDigits = Math.floor(Math.random() * 3) + 2;
      const addProblemStr = MathUtil.generateAdditionProblemString(numDigits);
      const newAddProb = MathUtil.getAdditionOperands(addProblemStr);
      tmpAddProblems.push(newAddProb);
    }
    setAddProblems(tmpAddProblems);
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
      setCount(0);
      setOpen(new Array(10).fill(0));
    }
  };

  const handleTouchStart = (e) => {
    // e.preventDefault();
    handleMouseDown();
  };

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Addition</h4>
        </CardHeader>
        <CardBody style={{ height: 200 }}>
          <AdditionPanel size={size} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Subtraction</h4>
        </CardHeader>
        <CardBody style={{ height: 200 }}>
          <SubtractionPanel size={size} />
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(MathK5);
