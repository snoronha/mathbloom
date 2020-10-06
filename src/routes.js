/*!

*/

import {
  faCoffee,
  faRunning,
  faMagic,
  faHandsHelping,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import MathK5Page from "views/Math-K-5/MathK5.js";
import MyPractice from "views/MyPractice/MyPractice.js";
import SolveIt from "views/SolveIt/SolveIt.js";
import AskAarav from "views/AskAarav/AskAarav.js";
import AboutPage from "views/About/About.js";

const dashboardRoutes = [
  /*  
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },

  {
    path: "/user",
    name: "Your Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  */

  {
    path: "/mathk5",
    name: "Practice",
    icon: faRunning,
    component: MathK5Page,
    layout: "/admin",
  },
  {
    path: "/myproblems",
    name: "My Problems",
    icon: faUserEdit,
    component: MyPractice,
    layout: "/admin",
  },
  /*
  {
    path: "/solveit",
    name: "Solve It!",
    icon: faMagic,
    component: SolveIt,
    layout: "/admin",
  },
  */
  {
    path: "/askaarav",
    name: "Ask Aarav",
    icon: faHandsHelping,
    component: AskAarav,
    layout: "/admin",
  },
  {
    path: "/about",
    name: "About Us",
    icon: faCoffee,
    component: AboutPage,
    layout: "/admin",
  },
];

export default dashboardRoutes;
