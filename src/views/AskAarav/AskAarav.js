/*eslint-disable*/
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom"; // needed for Draggable
import { EditableMathField } from "react-mathquill";
import Button from "@material-ui/core/Button";
import Draggable from "react-draggable";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { withSize } from "react-sizeme";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import MathUtil from "../Math-K-5/MathUtil";

const styles = {
  staticDigitInstance: {
    "line-height": "35px",
    textAlign: "center",
    width: 42,
    height: "auto",
    fontSize: 24,
  },
  editableInstance: {
    flex: 1,
    textAlign: "center",
    width: "auto",
    minWidth: 275,
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

// SymbolMap component
const SymbolMap = (props) => {
  const classes = props.classes;
  const latexUpdate = props.latexUpdate;
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
  return (
    <Draggable defaultPosition={{ x: 200, y: 0 }} position={null} scale={1}>
      <div className={classes.draggableSymbols}>
        <span>
          Symbols
          <hr />
          {symbols.map((symbolRow, symbolRowIdx) => (
            <span key={symbolRowIdx.toString()}>
              {symbolRow.map((symbol, symbolIdx) => (
                <button
                  key={symbolIdx.toString()}
                  onClick={() => latexUpdate(symbol.latex)}
                  style={{ width: 24, margin: 2 }}
                >
                  <span dangerouslySetInnerHTML={{ __html: symbol.htmltext }} />
                </button>
              ))}
              <br />
            </span>
          ))}
        </span>
      </div>
    </Draggable>
  );
};

const AskAarav = ({ size }) => {
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const [descrLines, setDescrLines] = useState([]);
  // max of 10 equation/text inputs for now - research how to make this dynamic
  const [textInputs, setTextInputs] = useState(
    Array(10)
      .fill(null)
      .map((i) => React.createRef()),
    []
  );
  const classes = useStyles();

  const onFieldChange = (mathField, idx) => {
    const fieldVal = mathField.latex().toString();
    // console.log("Fieldval: ", fieldVal, textInput.current.mathField);
    let tmpDescrLines = MathUtil.deepCopyObject(descrLines);
    tmpDescrLines[idx].data = fieldVal;
    setDescrLines(tmpDescrLines);
  };

  const onTextChange = (evt, idx) => {
    let tmpDescrLines = MathUtil.deepCopyObject(descrLines);
    tmpDescrLines[idx].data = evt.target.value;
    setDescrLines(tmpDescrLines);
  };

  const onFocus = (idx) => {
    setSelectedIdx(idx);
  };

  const latexUpdate = (txt) => {
    if (selectedIdx >= 0 && descrLines[selectedIdx].type === "math") {
      console.log("problemStr: ", descrLines[selectedIdx]);
      let tmpDescrLines = MathUtil.deepCopyObject(descrLines);
      tmpDescrLines[selectedIdx].data += txt;
      setDescrLines(tmpDescrLines);
      textInputs[selectedIdx].current?.mathField?.focus();
    }
  };

  const createField = (type) => {
    let tmpDescrLines = MathUtil.deepCopyObject(descrLines);
    tmpDescrLines.push({ type: type, data: "" });
    setDescrLines(tmpDescrLines);
  };

  const deleteField = (idx) => {
    let tmpDescrLines = MathUtil.deepCopyObject(descrLines);
    tmpDescrLines.splice(idx, 1);
    setDescrLines(tmpDescrLines);
  };

  const handleSave = () => {
    console.log("Save this");
  };

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4>Ask Aarav</h4>
        </CardHeader>
        <CardBody style={{ height: 360 }}>
          <button
            onClick={() => {
              createField("math");
            }}
            style={{ position: "absolute", right: 20, top: 10 }}
          >
            Equation
          </button>
          <button
            onClick={() => {
              createField("text");
            }}
            style={{ position: "absolute", right: 20, top: 40 }}
          >
            Text
          </button>

          {descrLines.map((descr, descrIdx) => (
            <div
              style={{ justifyContent: "flex-start" }}
              key={descrIdx.toString()}
            >
              {descr.type === "math" && (
                <EditableMathField
                  ref={textInputs[descrIdx]}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#fff",
                  }}
                  className={classes.editableInstance}
                  latex={descr.data} // latex value for the input field
                  onChange={(mathField) => {
                    onFieldChange(mathField, descrIdx);
                  }}
                  onFocus={() => {
                    onFocus(descrIdx);
                  }}
                />
              )}
              {descr.type === "text" && (
                <textarea
                  ref={textInputs[descrIdx]}
                  style={{
                    marginTop: 10,
                    backgroundColor: "#fff",
                  }}
                  onFocus={() => {
                    onFocus(descrIdx);
                  }}
                  defaultValue={descr.data}
                  onChange={(evt) => {
                    onTextChange(evt, descrIdx);
                  }}
                />
              )}
              <button
                onClick={() => {
                  deleteField(descrIdx);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <br />
            </div>
          ))}
          <SymbolMap classes={classes} latexUpdate={latexUpdate} />
          <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <Button
              variant="contained"
              color="default"
              onMouseDown={handleSave}
            >
              Save
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(AskAarav);
