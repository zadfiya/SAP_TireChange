import { Box } from "@mui/material";
import React from "react";

const Page = ({ title, children }) => {
  return (
    <Box width={"100%"} height={"100%"} minWidth={0} padding={"0px 20px"}>
      <Box padding={"0px 0px"}>{children}</Box>
    </Box>
  );
};

export default Page;
