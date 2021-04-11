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
import ProblemPanel from "./ProblemPanel";

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

const MathK5 = ({ size }) => {
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const classes = useStyles();

  const userName = useSelector((state) => {
    return state.userName;
  });

  useEffect(() => {
    /*
    setProblemPanel(
      <ProblemPanel size={size} subject={subject} topic={topic} />
    );
    */
  }, [subject, topic]);

  const gradeSubjectMap = [
    { name: "K", grade: 0, subjects: ["Addition"] },
    { name: "1", grade: 1, subjects: ["Addition", "Subtraction"] },
    { name: "2", grade: 2, subjects: ["Addition", "Subtraction"] },
    {
      name: "3",
      grade: 3,
      subjects: ["Addition", "Subtraction", "Multiplication"],
    },
    {
      name: "4",
      grade: 4,
      subjects: ["Addition", "Subtraction", "Multiplication", "Geometry"],
    },
    {
      name: "5",
      grade: 5,
      subjects: [
        "Addition",
        "Subtraction",
        "Multiplication",
        "Geometry",
        "Algebra",
      ],
    },
  ];

  const subjectTopicMap = {
    "": [],
    Addition: ["1 digit", "2 digit", "3 digit", "4 digit"],
    Subtraction: ["1 digit", "2 digit", "3 digit", "4 digit"],
    Multiplication: ["1 digit", "2 digit", "3 digit", "4 digit"],
    Geometry: ["Triangles", "Circles", "Polygons"],
    Algebra: ["Linear", "Quadratic", "Equations"],
  };
  const selectGradeEvent = (evt) => {
    setGrade(evt.target.value);
  };
  const selectSubjectEvent = (evt) => {
    setSubject(evt.target.value);
  };
  const selectTopicEvent = (evt) => {
    setTopic(evt.target.value);
  };

  return (
    <div>
      <Card>
        <CardBody style={{ textAlign: "center" }}>
          <FormControl size={"small"} className={classes.formControl}>
            <InputLabel id="grade-select-label">Grade</InputLabel>
            <Select
              labelId="grade-select-label"
              id="grade-simple-select"
              value={grade}
              onChange={selectGradeEvent}
            >
              {gradeSubjectMap.map((grd, grdIdx) => (
                <MenuItem key={grd.grade.toString()} value={grd.grade}>
                  {grd.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size={"small"} className={classes.formControl}>
            <InputLabel id="subject-select-label">Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              id="subject-simple-select"
              value={subject}
              onChange={selectSubjectEvent}
            >
              {gradeSubjectMap[grade].subjects.map((subj, subjIdx) => (
                <MenuItem key={subjIdx.toString()} value={subj}>
                  {subj}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size={"small"} className={classes.formControl}>
            <InputLabel id="topic-select-label">Topic</InputLabel>
            <Select
              labelId="topic-select-label"
              id="topic-simple-select"
              value={topic}
              onChange={selectTopicEvent}
            >
              {subjectTopicMap[subject].map((tpc, tpcIdx) => (
                <MenuItem key={tpcIdx.toString()} value={tpc}>
                  {tpc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardBody>
      </Card>
      {subject && topic && (
        <Card>
          {/*}
          <CardHeader color="primary">
            <h4>{subject}</h4>
          </CardHeader>
          */}
          <CardBody style={{ height: 360 }}>
            <ProblemPanel size={size} subject={subject} topic={topic} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default withSize()(MathK5);
