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

export const data = {
  labels,
  datasets: [
    {
      label: "Served Customers",
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Lost Customers",
      // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const CustomerGraph = () => {
  return (
    <Box component={Paper}>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default CustomerGraph;
