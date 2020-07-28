/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Slide from "react-reveal/Slide";
import Problem from "./Problem";
import MathUtil from "./MathUtil";
import server from "../../conf/server";
// TODO: Figure out react-reveal/makeCarousel
// Carousel needs static elements though
// Current elements are created IRL. Think through how to make that work

const ProblemPanel = (props) => {
  const size = props.size;
  const subject = props.subject;
  const topic = props.topic;
  const [count, setCount] = useState(-1);
  const [currentProblem, setCurrentProblem] = useState({});
  const [problems, setProblems] = useState([]);
  const [savedProblems, setSavedProblems] = useState(null);

  useEffect(() => {
    if (subject !== "" && topic !== "") {
      setCount(-1);
      setCurrentProblem({});
      setProblems([]);
    }
  }, [subject, topic]);

  useEffect(() => {
    if (props.savedProblems) {
      setCount(0);
      if (props.savedProblems.length > 0) {
        setCurrentProblem(props.savedProblems[0]);
        setCount(0);
      }
      setSavedProblems(props.savedProblems);
    }
  }, []);

  const user = useSelector((state) => {
    return state.user;
  });

  const createNewProblem = (subj, tpc) => {
    let numDigits, newProb;
    switch (subj) {
      case "Addition":
        switch (tpc) {
          case "1 digit":
            newProb = MathUtil.getAdditionOperands(1);
            break;
          case "2 digit":
            newProb = MathUtil.getAdditionOperands(2);
            break;
          case "3 digit":
            newProb = MathUtil.getAdditionOperands(3);
            break;
          case "4 digit":
            newProb = MathUtil.getAdditionOperands(4);
            break;
          default:
            newProb = MathUtil.getAdditionOperands(
              Math.floor(Math.random() * 3) + 2
            );
            break;
        }
        break;
      case "Subtraction":
        switch (tpc) {
          case "1 digit":
            newProb = MathUtil.getSubtractionOperands(1);
            break;
          case "2 digit":
            newProb = MathUtil.getSubtractionOperands(2);
            break;
          case "3 digit":
            newProb = MathUtil.getSubtractionOperands(3);
            break;
          case "4 digit":
            newProb = MathUtil.getSubtractionOperands(4);
            break;
          default:
            newProb = MathUtil.getAdditionOperands(
              Math.floor(Math.random() * 3) + 2
            );
            break;
        }
        break;
      case "Multiplication":
        switch (tpc) {
          case "1 digit":
            newProb = MathUtil.getMultiplicationOperands(1, 1);
            break;
          case "2 digit":
            numDigits = Math.floor(Math.random() * 2) + 1;
            newProb = MathUtil.getMultiplicationOperands(2, numDigits);
            break;
          case "3 digit":
            numDigits = Math.floor(Math.random() * 2) + 1;
            newProb = MathUtil.getMultiplicationOperands(3, numDigits);
            break;
          case "4 digit":
            numDigits = Math.floor(Math.random() * 3) + 1;
            newProb = MathUtil.getMultiplicationOperands(4, numDigits);
            break;
          default:
            numDigits = Math.floor(Math.random() * 2) + 1;
            newProb = MathUtil.getMultiplicationOperands(3, numDigits);
            break;
        }
        break;
      case "Geometry":
        newProb = MathUtil.getTriangleProblem();
        break;
      case "Algebra":
        switch (tpc) {
          case "Linear":
            newProb = MathUtil.getAlgebraFactorizationProblem();
            break;
          case "Quadratic":
            newProb = MathUtil.getAlgebraFactorizationProblem();
            break;
          case "Equations":
            newProb = MathUtil.getAlgebraQuadraticProblem();
            break;
          default:
            newProb = MathUtil.getAlgebraQuadraticProblem();
            break;
        }
        break;
    }
    return newProb;
  };

  const saveProblem = (problem) => {
    // TODO figure out how to auth locally for testing
    const email = user?.email || "snoronha@gmail.com";
    // console.log("USER: ", user);
    const body = JSON.stringify({
      guid: problem.guid,
      specs: JSON.stringify(problem.specs),
      answer: problem.answer ? JSON.stringify(problem.answer) : null,
      attempt: problem.attempt ? JSON.stringify(problem.attempt) : null,
    });
    fetch(`${server.domain}/api/problem/email/${email.toLowerCase()}`, {
      method: "post",
      body: body,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("responseProblem: ", json);
      })
      .catch((error) => console.log(error)) // handle this
      .finally(() => {});
  };

  const handleNext = () => {
    if (savedProblems.length > 0) {
      // play back and edit/retry saved problem
      if (currentProblem?.guid) {
        saveProblem(currentProblem);
      }
      if (count < savedProblems.length) {
        setCurrentProblem(savedProblems[count]);
        setCount(count + 1);
      }
    } else {
      // create new problem and attempt
      if (subject !== "" && topic !== "") {
        if (currentProblem?.guid) {
          // Save current problem
          saveProblem(currentProblem);
          // push currentProblem onto problem stack
          const tmpProblems = MathUtil.deepCopyObject(problems);
          tmpProblems.push(currentProblem);
          setProblems(tmpProblems);
        }
        setCurrentProblem(createNewProblem(subject, topic));
        setCount(count + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (count >= 0) {
      const tmpProblems = MathUtil.deepCopyObject(problems).splice(0, count);
      setCurrentProblem(tmpProblems[count - 1]);
      // console.log("PREV PROBLEMS: ", tmpProblems);
      setCount(count - 1);
      if (count > 0) setProblems(tmpProblems.splice(0, count - 1));
    }
  };

  // callback when problem us updated on Problem.js
  const updateCurrentProblem = (problem) => {
    setCurrentProblem(problem);
  };

  const handleTouchStart = (e) => {
    // e.preventDefault();
    handleMouseDown();
  };

  return (
    <div>
      {currentProblem?.guid && (
        <Slide right>
          <span
            style={{ display: "flex", justifyContent: "center" }}
            key={currentProblem.guid}
          >
            <Problem
              style={{
                border: "4px solid #eee",
                borderRadius: "10px",
                padding: "10px",
              }}
              problem={currentProblem}
              updateProblem={updateCurrentProblem}
            />
          </span>
        </Slide>
      )}
      {count < 0 && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <p style={{ fontSize: 24 }}>
            Start {topic} {subject} ...
          </p>
          <p style={{ fontSize: 18 }}>Press Next to begin</p>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          right: "10px",
        }}
      >
        <div style={{ position: "absolute", bottom: "0px", left: "0px" }}>
          <Button
            variant="contained"
            color="default"
            onMouseDown={handlePrevious}
            disabled={count < 0}
          >
            Previous
          </Button>
        </div>
        {count >= 0 && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            Problem {count + 1}
          </div>
        )}
        <div style={{ position: "absolute", bottom: "0px", right: "0px" }}>
          <Button variant="contained" color="default" onMouseDown={handleNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProblemPanel;
