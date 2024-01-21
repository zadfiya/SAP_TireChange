import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Paper } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Customers served/Lost",
    },
  },
};

const labels = [
  "Compact Cars",
  "Medium Cars",
  "Full Size Cars",
  "Class 1 Cars",
  "Class 2 Cars",
];

export const getData = (data) => ({
  labels,
  datasets: [
    {
      label: "Served Customers",
      data: data.map((d) => d.acceptedCustomers),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: "Turned Away Customers",
      data: data.map((d) => d.turnedAwayCustomers),
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
  ],
});

const CustomerGraph = ({ data }) => {
  return (
    <Box component={Paper}>
      <Bar options={options} data={getData(data)} />
    </Box>
  );
};

export default CustomerGraph;
