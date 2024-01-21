import axios from "axios";

const URL = "";

const DASHBOARD_URL = URL + "api/v1/statistics/data";
const BOOKING_URL = URL + "api/v1/booking/date/";

export const getDashboardData = () => {
  return axios.get(DASHBOARD_URL).then((response) => response.data);
};

export const getBookingDataForDate = (date) => {
  return axios.get(BOOKING_URL + date).then((response) => response.data);
};
