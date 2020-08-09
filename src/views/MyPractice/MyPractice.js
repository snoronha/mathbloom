/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { withSize } from "react-sizeme";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProblemPanel from "../Math-K-5/ProblemPanel";
import server from "../../conf/server";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

// const useStyles = makeStyles(styles);
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: "auto",
    minWidth: 80,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MyPractice = ({ size }) => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const email = "snoronha@gmail.com";
    fetch(`${server.domain}/api/problems/email/${email.toLowerCase()}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        let tmpProblems = [];
        json.problems?.forEach((prob) => {
          if (prob.answer || prob.attempt) {
            tmpProblems.push({
              guid: prob.guid,
              specs: JSON.parse(prob.specs),
              answer: JSON.parse(prob.answer),
              attempt: JSON.parse(prob.attempt),
            });
          } else {
            tmpProblems.push({
              guid: prob.guid,
              specs: JSON.parse(prob.specs),
            });
          }
        });
        setProblems(tmpProblems);
      })
      .catch((error) => console.log(error)) // handle this
      .finally(() => {});
  }, []);

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4>My Problems</h4>
        </CardHeader>
        <CardBody style={{ height: 360 }}>
          {problems.length > 0 && (
            <ProblemPanel size={size} savedProblems={problems} />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(MyPractice);
