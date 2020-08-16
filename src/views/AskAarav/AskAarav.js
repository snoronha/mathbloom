/*eslint-disable*/
import React, { useState, useRef } from "react";
import { StaticMathField, EditableMathField } from "react-mathquill";
import { makeStyles } from "@material-ui/core/styles";
import { withSize } from "react-sizeme";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

const styles = {
  staticDigitInstance: {
    "line-height": "35px",
    textAlign: "center",
    width: 42,
    height: "auto",
    fontSize: 24,
  },
  editableInstance: {
    textAlign: "center",
    width: "auto",
    minWidth: 80,
    height: "auto",
    fontSize: 24,
  },
};

const useStyles = makeStyles(styles);

const AskAarav = ({ size }) => {
  const textInput = useRef(null);
  const [problemStr, setProblemStr] = useState("");
  const classes = useStyles();

  const onFieldChange = (mathField) => {
    const fieldVal = mathField.latex().toString();
    // console.log("Fieldval: ", fieldVal, textInput.current.mathField);
    setProblemStr(fieldVal);
  };

  const latexUpdate = (txt) => {
    setProblemStr(problemStr + txt);
    textInput.current?.mathField?.focus();
  };

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4>Ask Aarav</h4>
        </CardHeader>
        <CardBody style={{ height: 360 }}>
          <EditableMathField
            ref={textInput}
            style={{
              backgroundColor: "#fff",
            }}
            className={classes.editableInstance}
            latex={problemStr} // latex value for the input field
            onChange={(mathField) => {
              onFieldChange(mathField);
            }}
          />
          <button onClick={() => latexUpdate("+")} style={{ margin: 2 }}>
            +
          </button>
          <button onClick={() => latexUpdate("\\pi")} style={{ margin: 2 }}>
            π
          </button>
          <button onClick={() => latexUpdate("\\le")} style={{ margin: 2 }}>
            &le;
          </button>
          <button onClick={() => latexUpdate("\\sum")} style={{ margin: 2 }}>
            ∑
          </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(AskAarav);
