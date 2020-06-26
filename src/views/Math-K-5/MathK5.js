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
import AdditionPanel from "./AdditionPanel";
import SubtractionPanel from "./SubtractionPanel";

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
  const [option, setOption] = useState("");
  const classes = useStyles();

  const selectOption = (opt) => {
    setOption(opt);
  };

  return (
    <div>
      <Card>
        <CardBody style={{ height: 50, textAlign: "center" }}>
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button
              disabled={option == "add"}
              onMouseDown={() => {
                selectOption("add");
              }}
            >
              Addition
            </Button>
            <Button
              disabled={option == "subtract"}
              onMouseDown={() => {
                selectOption("subtract");
              }}
            >
              Subtraction
            </Button>
            <Button
              disabled={option == "multiply"}
              onMouseDown={() => {
                selectOption("multiply");
              }}
            >
              Multiplication
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
      {option == "add" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Addition</h4>
          </CardHeader>
          <CardBody style={{ height: 300 }}>
            <AdditionPanel size={size} />
          </CardBody>
        </Card>
      )}
      {option == "subtract" && (
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Subtraction</h4>
          </CardHeader>
          <CardBody style={{ height: 300 }}>
            <SubtractionPanel size={size} />
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default withSize()(MathK5);
