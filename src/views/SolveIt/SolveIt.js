/*eslint-disable*/
import React, { useState } from "react";
import { withSize } from "react-sizeme";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProblemPanel from "../Math-K-5/ProblemPanel";

const SolveIt = ({ size }) => {
  const mathsteps = require("mathsteps");
  const [problems, setProblems] = useState([]);

  const steps = mathsteps.solveEquation("x^2 + x - 6 = 0");
  steps.forEach((step) => {
    console.log("before change: " + step.oldEquation.ascii()); // e.g. before change: 2x + 3x = 35
    console.log("change: " + step.changeType); // e.g. change: SIMPLIFY_LEFT_SIDE
    console.log("after change: " + step.newEquation.ascii()); // e.g. after change: 5x = 35
    console.log("# of substeps: " + step.substeps.length); // e.g. # of substeps: 2
  });

  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4>Solve It!</h4>
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

export default withSize()(SolveIt);
