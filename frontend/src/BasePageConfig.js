import { lazy } from "react";
// import Stats from "./pages/Stats/Stats.js";

// const NotFoundPage = lazy(() =>
//   import("./pages/404/NotFoundPage.js" /* webpackChunkName: "NotFoundPage" */)
// );
const DashboardPage = lazy(() =>
  import("./pages/Dashboard/Dashboard.js" /* webpackChunkName: "Dashboard" */)
);
const BookingsPage = lazy(() =>
  import("./pages/Bookings/Bookings.js" /* webpackChunkName: "Bookings" */)
);
const StatsPage = lazy(() =>
  import("./pages/Stats/Stats.js" /* webpackChunkName: "Stats" */)
);

export const customRoutes = [
  {
    path: "/",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/dashboard/*",
    Component: DashboardPage,
    isActive: true,
  },
  {
    path: "/bookings/*",
    Component: BookingsPage,
    isActive: true,
  },
  {
    path: "/stats/*",
    Component: StatsPage,
    isActive: true,
  },
  // {
  //   path: "/404/*",
  //   Component: NotFoundPage,
  //   isActive: true,
  // },
];
