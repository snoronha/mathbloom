/*eslint-disable*/
import React from "react";
// import PropTypes from "prop-types";
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
  const classes = useStyles();

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Addition</h4>
        </CardHeader>
        <CardBody style={{ height: 200 }}>
          <AdditionPanel size={size} />
        </CardBody>
      </Card>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Subtraction</h4>
        </CardHeader>
        <CardBody style={{ height: 200 }}>
          <SubtractionPanel size={size} />
        </CardBody>
      </Card>
    </div>
  );
};

export default withSize()(MathK5);
