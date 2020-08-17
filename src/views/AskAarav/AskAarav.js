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
    borderRadius: 8,
    padding: 4,
    width: 150,
    textAlign: "center",
  },
};

const useStyles = makeStyles(styles);

const AskAarav = ({ size }) => {
  const textInput = useRef(null);
  const [problemStr, setProblemStr] = useState("");
  const classes = useStyles();
  const symbols = [
    [
      { htmltext: "&ne;", latex: "\\neq" },
      { htmltext: "&le;", latex: "\\le" },
      { htmltext: "&ge;", latex: "\\ge" },
      { htmltext: "&pm;", latex: "\\pm" },
      { htmltext: "∑", latex: "\\sum" },
    ],
    [
      { htmltext: "x", latex: "\\times" },
      { htmltext: "&Sqrt;", latex: "\\sqrt" },
      { htmltext: "&int;", latex: "\\int" },
      { htmltext: "&#8734;", latex: "\\infinity" },
    ],
    [
      { htmltext: "π", latex: "\\pi" },
      { htmltext: "&alpha;", latex: "\\alpha" },
      { htmltext: "&beta;", latex: "\\beta" },
      { htmltext: "&gamma;", latex: "\\gamma" },
    ],
    [
      { htmltext: "&delta;", latex: "\\delta" },
      { htmltext: "&epsilon;", latex: "\\epsilon" },
      { htmltext: "&phi;", latex: "\\phi" },
      { htmltext: "&omega;", latex: "\\omega" },
    ],
  ];

  const onFieldChange = (mathField) => {
    const fieldVal = mathField.latex().toString();
    // console.log("Fieldval: ", fieldVal, textInput.current.mathField);
    setProblemStr(fieldVal);
  };

  const latexUpdate = (txt) => {
    console.log("problemStr: ", problemStr);
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
            substituteTextarea={() => <textarea rows={5} />}
          />
          <Draggable
            defaultPosition={{ x: 200, y: 0 }}
            position={null}
            scale={1}
          >
            <div className={classes.draggableSymbols}>
              <span>
                Symbols
                <hr />
                {symbols.map((symbolRow, symbolRowIdx) => (
                  <span>
                    {symbolRow.map((symbol, symbolIdx) => (
                      <button
                        key={symbolIdx.toString()}
                        onClick={() => latexUpdate(symbol.latex)}
                        style={{ width: 24, margin: 2 }}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: symbol.htmltext }}
                        />
                      </button>
                    ))}
                    <br />
                  </span>
                ))}
              </span>
            </div>
          </Draggable>
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(AskAarav);
