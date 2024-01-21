import { lazy } from "react";

const NotFoundPage = lazy(() =>
  import("./pages/404/NotFoundPage.js" /* webpackChunkName: "NotFoundPage" */)
);
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
  {
    path: "/404/*",
    Component: NotFoundPage,
    isActive: true,
  },
];
