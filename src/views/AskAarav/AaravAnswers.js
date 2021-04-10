/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Button, Link } from "@material-ui/core";
import { withSize } from "react-sizeme";
import "react-tabs/style/react-tabs.css";
import { StaticMathField, EditableMathField } from "react-mathquill";
import Draggable from "react-draggable";
import ReactDOM from "react-dom"; // needed for Draggable
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// core components
import MathUtil from "../Math-K-5/MathUtil";
import server from "../../conf/server";

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
  answerModalContainer: {
    border: "1px solid #ddd",
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 4,
    width: 250,
    textAlign: "center",
  },
};

const useStyles = makeStyles(styles);

// SymbolMap component
const AnswerModal = (props) => {
  const classes = props.classes;
  const questionBlob = props.question;
  const question = JSON.parse(props.question.question);

  return (
    <Draggable defaultPosition={{ x: 200, y: 0 }} position={null} scale={1}>
      <div className={classes.answerModalContainer}>
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            width: 16,
            height: 16,
            top: -10,
            right: 0,
          }}
        >
          <button onClick={props.hideModal}>
            <FontAwesomeIcon icon={faTimes} size={"xs"} />
          </button>
        </div>
        <span>
          Answer
          <hr />
          {question.map((part, idx) => (
            <span key={idx.toString()}>
              {part.type === "math" && (
                <StaticMathField>{part.data}</StaticMathField>
              )}
              {part.type === "text" && <div>{part.data}</div>}
            </span>
          ))}
        </span>
      </div>
    </Draggable>
  );
};

const AaravAnswers = ({ size }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState({});
  const [page, setPage] = useState(0);
  const [answerId, setAnswerId] = useState(null);
  const [descrLines, setDescrLines] = useState([]);
  const [pageQuestion, setPageQuestion] = useState({});
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [textInputs, setTextInputs] = useState(
    Array(10)
      .fill(null)
      .map((i) => React.createRef()),
    []
  );
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    getQuestions();
  }, []);

  const user = useSelector((state) => {
    return state.user;
  });

  const getQuestions = () => {
    const email = user?.email || "snoronha@gmail.com";
    fetch(`${server.domain}/api/questions/email/${email.toLowerCase()}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log("responseQuestions: ", json);
        if (json.questions) {
          let answers = {};
          let files = {};
          if (json.answers) {
            // merge answers into questions
            json.answers.forEach((answer) => {
              answer.answer = JSON.parse(answer.answer);
              if (answer.questionId in answers) {
                answers[answer.questionId].push(answer);
              } else {
                answers[answer.questionId] = [answer];
              }
            });
          }
          if (json.files) {
            // {ticketId1: [fileObj, fileObj], ticketId2: [..]}
            json.files.forEach((fileObj) => {
              if (files[fileObj.ticketId]) {
                files[fileObj.ticketId].push(fileObj);
              } else {
                files[fileObj.ticketId] = [fileObj];
              }
            });
          }
          let questions = [];
          json.questions.forEach((question) => {
            if (question.ID in answers) {
              question.answers = answers[question.ID];
            }
            if (question.fileTicketId && question.fileTicketId > 0) {
              if (files[question.fileTicketId]) {
                question.files = files[question.fileTicketId];
              }
            }
            questions.push(question);
          });
          console.log("QUESTIONS: ", questions);
          setQuestions(questions);
          setPageQuestion(json.questions[0]);
          setPage(1);
        }
      })
      .catch((error) => console.log(error)) // handle this
      .finally(() => {});
  };

  const showModal = (problemId) => {
    console.log("ID: ", problemId);
    questions.forEach((q, qId) => {
      if (problemId === q.ID) {
        setSelectedQuestion(questions[qId]);
      }
    });
    setModalDisplayed(true);
  };

  const hideModal = () => {
    setModalDisplayed(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setPageQuestion(questions[value - 1]);
    setAnswerId(null); // set current answerId = NULL
  };

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

  const saveAnswer = () => {
    const email = user?.email || "snoronha@gmail.com";
    const body = answerId
      ? JSON.stringify({
          id: answerId,
          questionId: pageQuestion.ID,
          answer: JSON.stringify(descrLines),
        })
      : JSON.stringify({
          questionId: pageQuestion.ID,
          answer: JSON.stringify(descrLines),
        });
    console.log("BODY: ", body);
    fetch(`${server.domain}/api/answer/email/${email.toLowerCase()}`, {
      method: "post",
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("responseAnswer: ", json);
        if (json.id) {
          setAnswerId(json.id);
        }
      })
      .catch((error) => console.log(error)) // handle this
      .finally(() => {});
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

  return (
    <div style={{ height: 360, backgroundColor: "#fff" }}>
      <div style={{ position: "absolute", top: "48px", right: "10px" }}>
        <Button
          variant="contained"
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
      <div style={{ position: "absolute", top: "90px", right: "10px" }}>
        <Button
          variant="contained"
          color="default"
          size="small"
          onMouseDown={saveAnswer}
        >
          {answerId && "Update"}
          {!answerId && "Save"}
        </Button>
      </div>
      <span>
        {/* questions.map((qn, qnIdx) => (
          <div key={qnIdx.toString()}>
            <span>{qn.ID}</span>
            <span>{qn.question}</span>
            <Link
              href="#"
              onClick={() => {
                showModal(qn.ID);
              }}
            >
              {qn.isAnswered.toString()}
            </Link>
          </div>
        )) */}
      </span>
      <div style={{ padding: 10 }}>
        {page > 0 && questions.length > 0 && (
          <span>
            {JSON.parse(pageQuestion.question).map((part, idx) => (
              <span key={idx.toString()}>
                {part.type === "math" && (
                  <StaticMathField>{part.data}</StaticMathField>
                )}
                {part.type === "text" && <div>{part.data}</div>}
              </span>
            ))}
            {pageQuestion.files?.map((file, fIdx) => (
              <div key={fIdx.toString()}>
                <img src={file.url} />
              </div>
            ))}
            {pageQuestion.answers?.map((answer, aIdx) => (
              <span key={aIdx.toString()}>
                <hr />
                {answer.answer.map((apart, apIdx) => (
                  <span key={apIdx.toString()}>
                    {apart.type === "math" && (
                      <div>
                        <StaticMathField>{apart.data}</StaticMathField>
                      </div>
                    )}
                    {apart.type === "text" && <div>{apart.data}</div>}
                  </span>
                ))}
              </span>
            ))}
          </span>
        )}
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
      {questions.length > 0 && (
        <span
          style={{
            display: "flex",
            width: "100%",
            position: "absolute",
            justifyContent: "center",
            bottom: "10px",
          }}
        >
          <Pagination
            count={questions.length}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </span>
      )}
      {modalDisplayed && (
        <AnswerModal
          classes={classes}
          question={selectedQuestion}
          hideModal={hideModal}
        />
      )}
    </div>
  );
};

export default withSize()(AaravAnswers);
