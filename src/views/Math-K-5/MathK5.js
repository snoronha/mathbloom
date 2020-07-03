/*eslint-disable*/
import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";
import { withSize } from "react-sizeme";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProblemPanel from "./ProblemPanel";
import GeometryPanel from "./GeometryPanel";

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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MathK5 = ({ size }) => {
  const [grade, setGrade] = useState(0);
  const [option, setOption] = useState("");
  const classes = useStyles();

  const gradeSubjectMap = [
    { name: "Kinder", grade: 0, subjects: ["addition", "number_line"] },
    { name: "1st grade", grade: 1, subjects: ["addition", "subtraction"] },
    { name: "2nd grade", grade: 2, subjects: ["addition", "subtraction"] },
    {
      name: "3rd grade",
      grade: 3,
      subjects: ["addition", "subtraction", "multiplication"],
    },
    {
      name: "4th grade",
      grade: 4,
      subjects: ["addition", "subtraction", "multiplication", "geometry"],
    },
    {
      name: "5th grade",
      grade: 5,
      subjects: [
        "addition",
        "subtraction",
        "multiplication",
        "geometry",
        "algebra",
      ],
    },
  ];
  const selectGradeEvent = (evt) => {
    setGrade(evt.target.value);
  };
  const selectSubjectEvent = (evt) => {
    setOption(evt.target.value);
  };

  return (
    <div>
      <Card>
        <CardBody style={{ height: 100, textAlign: "center" }}>
          <FormControl className={classes.formControl}>
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
          <FormControl className={classes.formControl}>
            <InputLabel id="subject-select-label">Subject</InputLabel>
            <Select
              labelId="subject-select-label"
              id="subject-simple-select"
              value={option}
              onChange={selectSubjectEvent}
            >
              {gradeSubjectMap[grade].subjects.indexOf("addition") >= 0 && (
                <MenuItem value={"add"}>Addition</MenuItem>
              )}
              {gradeSubjectMap[grade].subjects.indexOf("subtraction") >= 0 && (
                <MenuItem value={"subtract"}>Subtraction</MenuItem>
              )}
              {gradeSubjectMap[grade].subjects.indexOf("multiplication") >=
                0 && <MenuItem value={"multiply"}>Multiplication</MenuItem>}
              {gradeSubjectMap[grade].subjects.indexOf("geometry") >= 0 && (
                <MenuItem value={"geometry"}>Geometry</MenuItem>
              )}
              {gradeSubjectMap[grade].subjects.indexOf("algebra") >= 0 && (
                <MenuItem value={"algebra"}>Algebra</MenuItem>
              )}
            </Select>
          </FormControl>
        </CardBody>
      </Card>
      {option == "add" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Addition</h4>
          </CardHeader>
          <CardBody style={{ height: 400 }}>
            <ProblemPanel size={size} category={"addition"} />
          </CardBody>
        </Card>
      )}
      {option == "subtract" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Subtraction</h4>
          </CardHeader>
          <CardBody style={{ height: 400 }}>
            <ProblemPanel size={size} category={"subtraction"} />
          </CardBody>
        </Card>
      )}
      {option == "multiply" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Multiplication</h4>
          </CardHeader>
          <CardBody style={{ height: 400 }}>
            <ProblemPanel size={size} category={"multiplication"} />
          </CardBody>
        </Card>
      )}
      {option == "geometry" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Geometry</h4>
          </CardHeader>
          <CardBody style={{ height: 400 }}>
            <ProblemPanel size={size} category={"geometry"} />
          </CardBody>
        </Card>
      )}
      {option == "algebra" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Algebra</h4>
          </CardHeader>
          <CardBody style={{ height: 400 }}>
            <ProblemPanel size={size} category={"algebra"} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default withSize()(MathK5);
