/*eslint-disable*/
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Slide from "react-reveal/Slide";
import { GoogleLogin } from "react-google-login";
import Problem from "./Problem";
import MathUtil from "./MathUtil";
// TODO: Figure out react-reveal/makeCarousel
// Carousel needs static elements though
// Current elements are created IRL. Think through how to make that work

const API_ENDPOINT = "https://mathbloom.org/api";

const ProblemPanel = (props) => {
  const size = props.size;
  const subject = props.subject;
  const topic = props.topic;
  const [count, setCount] = useState(-1);
  const [currentProblem, setCurrentProblem] = useState({});
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    if (subject !== "" && topic !== "") {
      setCount(-1);
      setCurrentProblem({});
      setProblems([]);
    }
  }, [subject, topic]);

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

  const handleNext = () => {
    if (subject !== "" && topic !== "") {
      if (currentProblem?.id) {
        // push currentProblem onto problem stack
        const tmpProblems = MathUtil.deepCopyObject(problems);
        tmpProblems.push(currentProblem);
        // console.log("NEXT PROBLEMS: ", tmpProblems);
        setProblems(tmpProblems);
      }
      setCurrentProblem(createNewProblem(subject, topic));
      setCount(count + 1);
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

  const responseGoogle = (res) => {
    console.log(res);
    const body = JSON.stringify({
      email: res.profileObj.email,
      googleId: res.profileObj.googleId,	
      familyName: res.profileObj.familyName,
      givenName: res.profileObj.givenName,
      name: res.profileObj.name,
      imageUrl: res.profileObj.imageUrl,
    });
    fetch(`${API_ENDPOINT}/user`, { method: "post", body: body })
      .then((response) => response.json())
      .then((json) => {
        console.log("responseGoogle: ", json);
        // setQtyLoading(true);
      })
      .catch((error) => console.log(error)) // handle this
      .finally(() => {});
  };

  return (
    <div>
      {currentProblem?.id && (
        <Slide right>
          <span
            style={{ display: "flex", justifyContent: "center" }}
            key={currentProblem.id}
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
      {/* count >= NUMPROBLEMS && (
        <div style={{ textAlign: "center", paddingTop: 40 }}>
          <p style={{ fontSize: 24 }}>Done {subject} ...</p>
          <p style={{ fontSize: 18 }}>Get more?</p>
        </div>
      ) */}

      <GoogleLogin
        clientId="694333334914-1tdnugar7cvq666onqqvilnbq97dldr0.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
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
