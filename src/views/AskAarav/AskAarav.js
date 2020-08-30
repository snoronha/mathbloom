/*eslint-disable*/
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom"; // needed for Draggable
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { EditableMathField } from "react-mathquill";
import Button from "@material-ui/core/Button";
import Draggable from "react-draggable";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { withSize } from "react-sizeme";

// core components
import MathUtil from "../Math-K-5/MathUtil";
import server from "../../conf/server";
import AaravAnswers from "./AaravAnswers";
import { ABSOLUTE_VALUE } from "mathsteps/lib/ChangeTypes";

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
    minWidth: 275,
    height: "auto",
    fontSize: 24,
  },
  draggableSymbols: {
    border: "1px solid #ddd",
    backgroundColor: "#eee",
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
    <Draggable defaultPosition={{ x: 200, y: -300 }} position={null} scale={1}>
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
  const [questionId, setQuestionId] = useState(null);
  const [descrLines, setDescrLines] = useState([]);
  // max of 10 equation/text inputs for now - research how to make this dynamic
  const [textInputs, setTextInputs] = useState(
    Array(10)
      .fill(null)
      .map((i) => React.createRef()),
    []
  );
  const user = useSelector((state) => {
    return state.user;
  });
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

  const saveQuestion = () => {
    // TODO figure out how to auth locally for testing
    const email = user?.email || "snoronha@gmail.com";
    const body = questionId
      ? JSON.stringify({
          id: questionId,
          question: JSON.stringify(descrLines),
          isAnswered: false,
        })
      : JSON.stringify({
          question: JSON.stringify(descrLines),
          isAnswered: false,
        });
    fetch(`${server.domain}/api/question/email/${email.toLowerCase()}`, {
      method: "post",
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("responseQuestion: ", json);
        if (json.id) {
          setQuestionId(json.id);
        }
      })
      .catch((error) => console.log(error)) // handle this
      .finally(() => {});
  };

  return (
    <Tabs style={{ marginTop: 30 }}>
      <TabList style={{ margin: 0 }}>
        <Tab>Ask Aarav</Tab>
        <Tab>Aarav Answers</Tab>
      </TabList>

      <TabPanel>
        <div style={{ height: 360, backgroundColor: "#fff" }}>
          <div style={{ position: "absolute", top: "48px", right: "10px" }}>
            <Button
              variant="outlined"
              color="default"
              size="small"
              onMouseDown={() => {
                createField("math");
              }}
            >
              Equation
            </Button>
            <Button
              variant="contained"
              color="default"
              size="small"
              onMouseDown={() => {
                createField("text");
              }}
            >
              Text
            </Button>
          </div>

          {descrLines.map((descr, descrIdx) => (
            <span key={descrIdx.toString()}>
              {descr.type === "math" && (
                <div style={{ display: "flex", paddingTop: 5 }}>
                  <EditableMathField
                    ref={textInputs[descrIdx]}
                    style={{
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
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      width: 16,
                      height: 16,
                      left: -10,
                      top: -10,
                    }}
                  >
                    <button
                      onClick={() => {
                        deleteField(descrIdx);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} size={"xs"} />
                    </button>
                  </div>
                </div>
              )}
              {descr.type === "text" && (
                <div style={{ display: "flex", paddingTop: 5 }}>
                  <textarea
                    ref={textInputs[descrIdx]}
                    style={{
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
                  <div
                    style={{
                      position: "relative",
                      textAlign: "center",
                      width: 16,
                      height: 16,
                      left: -10,
                      top: -10,
                    }}
                  >
                    <button
                      onClick={() => {
                        deleteField(descrIdx);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} size={"xs"} />
                    </button>
                  </div>
                </div>
              )}
            </span>
          ))}

          <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <Button
              variant="contained"
              color="default"
              onMouseDown={saveQuestion}
            >
              {questionId && "Update"}
              {!questionId && "Save"}
            </Button>
          </div>
        </div>
        <span style={{ zIndex: 10, position: "absolute" }}>
          <SymbolMap classes={classes} latexUpdate={latexUpdate} />
        </span>
      </TabPanel>
      <TabPanel>
        <AaravAnswers />
      </TabPanel>
    </Tabs>
  );
};

export default withSize()(AskAarav);
