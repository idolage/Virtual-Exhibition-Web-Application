/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from 'react';
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Test from "views/Test.js";
import { Attendee } from "components/Register/Attendee";
import CustomizeAvatar from "views/CustomizeAvatar";
import GetExhibitions from "components/Exhibitions/GetExhibitions";
import RegisterAdmin from "views/RegisterAdmin";
import RegisterExhibitor from "views/RegisterExhibitor";
import StallsSelect from "views/StallsSelect";
import CustomizeStall from "views/CustomizeStall";
import LiveStream from "views/liveStream";
import AddExhibition from "views/AddExhibition";
import ApproveExhibitors from 'views/ApproveExhibitors';
import SubmitFeedback from 'views/SubmitFeedback';
import ViewFeedbacks from 'views/ViewFeedbacks';
import EditExhibition from "views/EditExhibition";
import ViewMaterials from 'views/ViewMaterials';
import PlattformFB from 'views/PlattformFB';
import Approve from 'views/Approve';
import Stat from 'views/Stat';
// const [userRole, setUserRole] = useState();

// useEffect(() => {
//   setUserRole(localStorage.getItem("userRole"))
// }, [])

const userRole = localStorage.getItem("userRole");
let dashboardRoutes;

switch (userRole) {
  case "ADMIN":
    dashboardRoutes = [
      {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/registerAdmin",
        name: "Register Admins",
        icon: "nc-icon nc-simple-add",
        component: RegisterAdmin,
        layout: ""
      },
      {
        path: "/plattformFeedback",
        name: "Plattform Feedbacks",
        icon: "nc-icon nc-chat-round",
        component: PlattformFB,
        layout: "/admin"
      },
      {
        path: '/exhibitions',
        name: "Exhibitions",
        icon: "nc-icon nc-tv-2",
        component: GetExhibitions,
        layout: "/admin"
      },
      {
        path: '/approve',
        name: "Approve Exhibitions",
        icon: "nc-icon nc-check-2",
        component: Approve,
        layout: "/admin"
      },
      {
        path: '/stat',
        name: "Stats",
        icon: "nc-icon nc-chart-bar-32",
        component: Stat,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-atom",
        component: Icons,
        layout: "/admin"
      },
    ];
    break;

  case "EX_OWNER":
    dashboardRoutes = [
      {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/approve",
        name: "Approve Exhibitors",
        icon: "nc-icon nc-check-2",
        component: ApproveExhibitors,
        layout: "/admin"
      },
      {
        path: "/addExhibition",
        name: "Add Exhibition",
        icon: "nc-icon nc-simple-add",
        component: AddExhibition,
        layout: ""
      },
      {
        path: "/submitFeedback",
        name: "Submit Feedback",
        icon: "nc-icon nc-notes",
        component: SubmitFeedback,
        layout: "/admin"
      },
      {
        path: "/viewFeedback",
        name: "View Feedbacks",
        icon: "nc-icon nc-chat-round",
        component: ViewFeedbacks,
        layout: "/admin"
      },
      {
        path: "/editExhibition",
        name: "Edit Exhibitions",
        icon: "nc-icon nc-ruler-pencil",
        component: EditExhibition,
        layout: ""
      },
      {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-atom",
        component: Icons,
        layout: "/admin"
      },
    ];
    break;

  case "EXHIBITOR":
    dashboardRoutes = [
      {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: "/stalls-select",
        name: "Select Stall",
        icon: "nc-icon nc-tap-01",
        component: StallsSelect,
        layout: ""
      },
      {
        path: "/customize-stall",
        name: "Customize Stall",
        icon: "nc-icon nc-palette",
        component: CustomizeStall,
        layout: ""
      },
      {
        path: "/viewMaterials",
        name: "View Materials",
        icon: "nc-icon nc-cloud-download-93",
        component: ViewMaterials,
        layout: "/admin"
      },
      {
        path: "/live-streaming",
        name: "Live Streaming",
        icon: "nc-icon nc-button-play",
        component: LiveStream,
        layout: ""
      },
      {
        path: '/exhibitions',
        name: "Exhibitions",
        icon: "nc-icon nc-tv-2",
        component: GetExhibitions,
        layout: "/admin"
      },
      {
        path: "/submitFeedback",
        name: "Submit Feedback",
        icon: "nc-icon nc-notes",
        component: SubmitFeedback,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-atom",
        component: Icons,
        layout: "/admin"
      },
    ];
    break;

  case "ATTENDEE":
    dashboardRoutes = [
      {
        path: "/user",
        name: "User Profile",
        icon: "nc-icon nc-circle-09",
        component: UserProfile,
        layout: "/admin"
      },
      {
        path: '/customize-avatar',
        name: "Customize Avatar",
        icon: "nc-icon nc-palette",
        component: CustomizeAvatar,
        layout: ""
      },
      {
        path: '/exhibitions',
        name: "Exhibitions",
        icon: "nc-icon nc-tv-2",
        component: GetExhibitions,
        layout: "/admin"
      },
      {
        path: "/submitFeedback",
        name: "Submit Feedback",
        icon: "nc-icon nc-notes",
        component: SubmitFeedback,
        layout: "/admin"
      },
      {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-atom",
        component: Icons,
        layout: "/admin"
      },
    ];
    break;
    default:
      dashboardRoutes=[{}]
  }  
  export default dashboardRoutes;

// const dashboardRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "nc-icon nc-circle-09",
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
// ];


