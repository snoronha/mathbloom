/*eslint-disable*/
import React, { useState } from "react";
// import PropTypes from "prop-types";
import { ButtonGroup, Button } from "@material-ui/core";
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

const useStyles = makeStyles(styles);

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
      subjects: ["addition", "subtraction", "multiplication"],
    },
    {
      name: "5th grade",
      grade: 5,
      subjects: ["addition", "subtraction", "multiplication", "geometry"],
    },
  ];
  const selectGrade = (grd) => {
    setGrade(grd);
  };
  const selectOption = (opt) => {
    setOption(opt);
  };

  return (
    <div>
      <Card>
        <CardBody style={{ height: 100, textAlign: "center" }}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            {gradeSubjectMap.map((grd, grdIdx) => (
              <Button
                key={grd.grade.toString()}
                disabled={grade == grd.grade}
                onMouseDown={() => {
                  selectGrade(grd.grade);
                }}
              >
                {grd.name}
              </Button>
            ))}
          </ButtonGroup>
          <br />
          <br />

          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            {gradeSubjectMap[grade].subjects.indexOf("addition") >= 0 && (
              <Button
                disabled={option == "add"}
                onMouseDown={() => {
                  selectOption("add");
                }}
              >
                Addition
              </Button>
            )}
            {gradeSubjectMap[grade].subjects.indexOf("subtraction") >= 0 && (
              <Button
                disabled={option == "subtract"}
                onMouseDown={() => {
                  selectOption("subtract");
                }}
              >
                Subtraction
              </Button>
            )}
            {gradeSubjectMap[grade].subjects.indexOf("multiplication") >= 0 && (
              <Button
                disabled={option == "multiply"}
                onMouseDown={() => {
                  selectOption("multiply");
                }}
              >
                Multiplication
              </Button>
            )}
            {gradeSubjectMap[grade].subjects.indexOf("geometry") >= 0 && (
              <Button
                disabled={option == "geometry"}
                onMouseDown={() => {
                  selectOption("geometry");
                }}
              >
                Geometry
              </Button>
            )}
          </ButtonGroup>
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
            <GeometryPanel size={size} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default withSize()(MathK5);
