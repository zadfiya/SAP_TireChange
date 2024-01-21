import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export const getData = (data, isGainedRevenue) => ({
  labels: [
    "Compact Cars",
    "Medium Cars",
    "Full Size Cars",
    "Class 1 Cars",
    "Class 2 Cars",
  ],
  datasets: [
    {
      label: isGainedRevenue ? "Gained Revenue" : "Lost Revenue",
      data: data.map((d) =>
        isGainedRevenue ? d.totalRevenue : d.totalTurnedAway
      ),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
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
});

const RevenueLossGraph = ({ data, isGainedRevenue = true, title }) => {
  return (
    <Box component={Paper} flex={1} padding={"20px"}>
      <Box textAlign={"center"}>{title}</Box>
      <Pie width={"100%"} data={getData(data, isGainedRevenue)} />
    </Box>
  );
};

export default RevenueLossGraph;
