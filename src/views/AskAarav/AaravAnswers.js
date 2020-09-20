/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@material-ui/lab";
import { Button, Link } from "@material-ui/core";
import { withSize } from "react-sizeme";
import { StaticMathField } from "react-mathquill";
import Draggable from "react-draggable";
import ReactDOM from "react-dom"; // needed for Draggable
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// core components
import server from "../../conf/server";

const styles = {
  staticDigitInstance: {
    "line-height": "35px",
    textAlign: "center",
    width: 42,
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
  console.log("QUESTION: ", question);

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
  const [pageQuestion, setPageQuestion] = useState({});
  const [modalDisplayed, setModalDisplayed] = useState(false);
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
        console.log("responseQuestions: ", json);
        if (json.questions) {
          setQuestions(json.questions);
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
    console.log("VALUE=", value);
    setPage(value);
    // console.log("question: ", value, questions[value - 1]);
    setPageQuestion(JSON.parse(questions[value - 1].question));
  };

  return (
    <div style={{ height: 360, backgroundColor: "#fff" }}>
      <span>
        {questions.map((qn, qnIdx) => (
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
        ))}
      </span>
      <span>
        {page > 0 && questions.length > 0 && (
          <span>
            Answer
            <hr />
            {pageQuestion.map((part, idx) => (
              <span key={idx.toString()}>
                {part.type === "math" && (
                  <StaticMathField>{part.data}</StaticMathField>
                )}
                {part.type === "text" && <div>{part.data}</div>}
              </span>
            ))}
          </span>
        )}
      </span>
      {questions.length > 0 && (
        <Pagination
          count={questions.length}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
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
