/*!

*/

import {
  faCoffee,
  faRunning,
  faMagic,
  faHandsHelping,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
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
  /*
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },

  {
    path: "/typography",
    name: "Typography",
    icon: LibraryBooks,
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
  },
  */
];

export default dashboardRoutes;
