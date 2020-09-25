import Inventory from "views/Inventory/Inventory.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";

// @material-ui/icons

import DashboardIcon from "@material-ui/icons/Dashboard";

var dashRoutes = [
  {
    path: "/inventario",
    name: "Inventario",
    icon: DashboardIcon,
    component: Inventory,
    layout: "/admin",
  },
  {
    path: "/error-page",
    name: "Error Page",
    mini: "E",
    component: ErrorPage,
    layout: "/auth",
  },
];
export default dashRoutes;
