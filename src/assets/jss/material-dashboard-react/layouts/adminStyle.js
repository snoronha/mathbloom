import {
  drawerWidth,
  transition,
  container,
} from "assets/jss/material-dashboard-react.js";
import mathbloom_bg from "assets/img/mathbloom_bg.png";

const appStyle = (theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
    "background-image": `url(${mathbloom_bg})`,
  },
  content: {
    marginTop: "10px",
    padding: "20px 15px",
    minHeight: "calc(100vh - 123px)",
  },
  container,
  map: {
    marginTop: "60px",
  },
});

export default appStyle;
