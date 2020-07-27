/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
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
  const userName = useSelector((state) => {
    return state.userName;
  });

  useEffect(() => {
    const email = "snoronha@gmail.com";
    fetch(`${server.domain}/api/problems/email/${email.toLowerCase()}`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("responseProblems: ", json);
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
          <ProblemPanel size={size} />
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(MyPractice);
