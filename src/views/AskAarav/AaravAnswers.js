/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { withSize } from "react-sizeme";

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
};

const AaravAnswers = ({ size }) => {
  const [questions, setQuestions] = useState([]);

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

  return (
    <span>
      {questions.map((question, questionIdx) => (
        <div key={questionIdx.toString()}>{question.CreatedAt}</div>
      ))}
    </span>
  );
};

export default withSize()(AaravAnswers);
