import { lazy } from "react";

const DashboardPage = lazy(() =>
  import("./pages/Dashboard/Dashboard.js" /* webpackChunkName: "Dashboard" */)
);
const BookingsPage = lazy(() =>
  import("./pages/Bookings/Bookings.js" /* webpackChunkName: "Bookings" */)
);

export const customRoutes = [
  {
    path: "/dashboard/*",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/bookings/*",
    Component: BookingsPage,
    isActive: true,
  },
];
