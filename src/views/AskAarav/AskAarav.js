/*eslint-disable*/
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { EditableMathField } from "react-mathquill";
import Draggable from "react-draggable";
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
  draggableSymbols: {
    border: "1px solid #ddd",
    width: "auto",
  },
};

const useStyles = makeStyles(styles);

const AskAarav = ({ size }) => {
  const textInput = useRef(null);
  const [problemStr, setProblemStr] = useState("");
  const classes = useStyles();
  const symbols = [
    { htmltext: "+", latex: "+" },
    { htmltext: "π", latex: "\\pi" },
    { htmltext: "&le;", latex: "\\le" },
    { htmltext: "∑", latex: "\\sum" },
  ];

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
          <Draggable defaultPosition={{ x: 0, y: 0 }} position={null} scale={1}>
            <div className={classes.draggableSymbols}>
              {symbols.map((symbol, symbolIdx) => (
                <button
                  key={symbolIdx.toString()}
                  onClick={() => latexUpdate(symbol.latex)}
                  style={{ margin: 2 }}
                >
                  <span dangerouslySetInnerHTML={{ __html: symbol.htmltext }} />
                </button>
              ))}
            </div>
          </Draggable>
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(AskAarav);
