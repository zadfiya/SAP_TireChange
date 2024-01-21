import axios from "axios";

const URL = "";

const DASHBOARD_URL = URL + "api/v1/statistics/data";
const BOOKING_URL = URL + "api/v1/booking/date/";

export const getDashboardData = () => {
  return axios
    .get(DASHBOARD_URL, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export const getBookingDataForDate = (date) => {
  return axios
    .get(BOOKING_URL + date, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
export const submitBookingDataForDate = (date) => {
  return axios
    .get(BOOKING_URL + date, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};
