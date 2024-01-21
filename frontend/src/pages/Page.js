import { Box, Paper } from "@mui/material";
import React from "react";

const Page = ({ title, children }) => {
  return (
    <Box
      width={"100%"}
      height={"100%"}
      // component={Paper}
      minWidth={0}
      padding={"20px"}
      // flex={1}
    >
      <Box fontSize={"2rem"}>{title}</Box>
      <Box padding={"0px 0px"}>{children}</Box>
    </Box>
  );
};

export default Page;
