/*eslint-disable*/
import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import { withSize } from "react-sizeme";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Addition from "./Addition";

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

const MathK5 = ({ size }) => {
  const classes = useStyles();
  // const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");
  const [open, setOpen] = useState(new Array(10).fill(0));
  const [count, setCount] = useState(0);

  const handleMouseDown = () => {
    if (count < open.length) {
      if (open[count] === 0) {
        let tmpOpen = open.slice();
        tmpOpen[count] = 1;
        setOpen(tmpOpen);
      } else if (open[count] === 1) {
        let tmpOpen = open.slice();
        tmpOpen[count] = 2;
        setOpen(tmpOpen);
        setCount(count + 1);
      }
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
        {open.map((val, idx) => (
          <Motion
            style={{
              x: spring(
                open[idx] === 0
                  ? size.width
                  : open[idx] === 1
                  ? size.width / 2 - 120
                  : -240
              ),
            }}
          >
            {({ x }) => (
              <Addition
                style={{
                  position: "absolute",
                  WebkitTransform: `translate3d(${x}px, 0, 0)`,
                  transform: `translate3d(${x}px, 0, 0)`,
                }}
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
