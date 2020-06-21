import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// import Close from "@material-ui/icons/Close";
// import Check from "@material-ui/icons/Check";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Danger from "components/Typography/Danger.js";
// import Success from "components/Typography/Success.js";
// import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  tableUpgradeWrapper: {
    display: "block",
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    MsOverflowStyle: "-ms-autohiding-scrollbar",
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    marginBottom: "1rem",
    backgroundColor: "transparent",
    borderCollapse: "collapse",
    display: "table",
    borderSpacing: "2px",
    borderColor: "grey",
    "& thdead tr th": {
      fontSize: "1.063rem",
      padding: "12px 8px",
      verticalAlign: "middle",
      fontWeight: "300",
      borderTopWidth: "0",
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      textAlign: "inherit",
    },
    "& tbody tr td": {
      padding: "12px 8px",
      verticalAlign: "middle",
      borderTop: "1px solid rgba(0, 0, 0, 0.06)",
    },
    "& td, & th": {
      display: "table-cell",
    },
  },
  center: {
    textAlign: "center",
  },
};

const useStyles = makeStyles(styles);

export default function UpgradeToPro() {
  const classes = useStyles();
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info">
            <h4 className={classes.cardTitleWhite}>
              Math For Students By Students
            </h4>
            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>
          <CardBody>
            <div className={classes.tableUpgradeWrapper}>
              <table className={classes.table}>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        <b>What is MathBloom</b>
                      </p>
                      Mathbloom is your one-stop destination for personalized
                      math tutoring, lessons and practice for grades K - 8.
                      Mathbloom was born from conversations about the challenges
                      elementary and middle school kids face with math.
                      <p>
                        <b>Who we are</b>
                      </p>
                      We are students who have seen others struggle with math
                      and even struggled ourselves. We understand your pain. We
                      know the fear. And we will help you overcome it. Our
                      immediate goal is to help you gain math confidence using
                      personalized tutoring, online practice, helpful hints and
                      automated grading. Our eventual goal is to have you pay it
                      forward with other kids who need help.
                      <p>
                        <b>Tutor Profile</b>
                      </p>
                      I am a rising junior at Monta Vista High School, a
                      competitive high school in Cupertino, CA. I have excelled
                      in math courses that I have taken in Middle School and
                      High School. In Middle school, I was placed in the
                      advanced path and took Algebra 1 and Geometry. In High
                      School, I have taken Alg-2/Trig and Pre-Calculus Honors. I
                      have also taken the AMC 8 and AMC 10 tests as well as the
                      Math Olympiad. I would like to offer my help <b>FREE</b>{" "}
                      to anyone who wants a hand at succeeding in Middle School
                      and preparing for High School. Along with my brother, who
                      is on the honor roll for AMC8 and has Straight A's in
                      school, I am also conducting a <b>FREE</b> Math program
                      for students.
                      <p>
                        <b>Program Schedule</b>
                      </p>
                      This is a <b>FREE</b> Tutoring program offered 2x per week
                      till Aug 15th and 1x per week after Aug 15th. We would
                      like to help kids in grades K-8 with all their
                      mathematical needs. Please fill out the Math Class
                      Interest Forms below so we can gather details about both
                      the student and parent:
                      <br />
                      <a
                        href="https://forms.gle/353CD1ZcB6iTP9Mr9"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Grades K - 5
                      </a>{" "}
                      <br />
                      <a
                        href="https://forms.gle/SMnXFe9jkBhiBGeWA"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Grades 6 - 8
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
