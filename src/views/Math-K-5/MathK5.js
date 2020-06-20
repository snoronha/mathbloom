/*eslint-disable*/
import React, { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
addStyles();

export default function MathK5() {
  const classes = useStyles();
  const [tl, setTL] = useState(false);
  const [tc, setTC] = useState(false);
  const [tr, setTR] = useState(false);
  const [bl, setBL] = useState(false);
  const [bc, setBC] = useState(false);
  const [br, setBR] = useState(false);
  const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");

  return (
    <>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Math Grades K - 5</h4>
        </CardHeader>
        <CardBody>
          <EditableMathField
            latex={latex} // latex value for the input field
            onChange={(mathField) => {
              // called everytime the input changes
              setLatex(mathField.latex());
            }}
          />
          <br />
          <EditableMathField
            latex={latex} // latex value for the input field
            onChange={(mathField) => {
              // called everytime the input changes
              setLatex(mathField.latex());
            }}
          />
        </CardBody>
      </Card>
    </>
  );
}
