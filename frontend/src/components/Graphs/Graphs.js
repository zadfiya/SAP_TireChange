import React from "react";

import { Box } from "@mui/material";
import RevenueLossGraph from "./RevenueLossGraph";
import CustomerGraph from "./CustomerGraph";

const Graphs = () => {
  return (
    <Box
      marginTop={"20px"}
      width={"100%"}
      display={"grid"}
      gridTemplateColumns={"50% 50%"}
      gap={"20px"}
      sx={{ "& > div:nth-child(3)": { gridColumn: "span 2" } }}
    >
      <RevenueLossGraph />
      <RevenueLossGraph />
      <CustomerGraph />
    </Box>
  );
};

export default Graphs;
