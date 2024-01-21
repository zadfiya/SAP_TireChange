import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Compact Cars",
    "Medium Cars",
    "Full Size Cars",
    "Class 1 Cars",
    "Class 2 Cars",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const RevenueLossGraph = ({}) => {
  return (
    <Box component={Paper} flex={1} padding={"20px"}>
      <Pie width={"100%"} data={data} />
    </Box>
  );
};

export default RevenueLossGraph;
