/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { withSize } from "react-sizeme";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
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
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const API_ENDPOINT = "https://mathbloom.org/api";

const MathK5 = ({ size }) => {
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [userName, setUserName] = useState("");
  const classes = useStyles();

  useEffect(() => {
    /*
    setProblemPanel(
      <ProblemPanel size={size} subject={subject} topic={topic} />
    );
    */
  }, [subject, topic]);

  const gradeSubjectMap = [
    { name: "Kinder", grade: 0, subjects: ["Addition"] },
    { name: "1st grade", grade: 1, subjects: ["Addition", "Subtraction"] },
    { name: "2nd grade", grade: 2, subjects: ["Addition", "Subtraction"] },
    {
      name: "3rd grade",
      grade: 3,
      subjects: ["Addition", "Subtraction", "Multiplication"],
    },
    {
      name: "4th grade",
      grade: 4,
      subjects: ["Addition", "Subtraction", "Multiplication", "Geometry"],
    },
    {
      name: "5th grade",
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

  const responseGoogle = (res) => {
    console.log(res);
    if (res.accessToken) {
      setUserName(res.profileObj.name);
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
    }
  };

  return (
    <div>
      {!userName && (
        <GoogleLogin
          clientId="694333334914-1tdnugar7cvq666onqqvilnbq97dldr0.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
      {userName && <span>Welcome {userName}</span>}
      <Card>
        <CardBody style={{ height: 75, textAlign: "center" }}>
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
          <FormControl className={classes.formControl}>
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
          <CardHeader color="primary">
            <h4>{subject}</h4>
          </CardHeader>
          <CardBody style={{ height: 360 }}>
            <ProblemPanel size={size} subject={subject} topic={topic} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default withSize()(MathK5);
