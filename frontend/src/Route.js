import React from "react";
import BasePage from "./BasePage";
import { Box } from "@mui/material";
import Nav from "./nav";

export function Routes() {
  return (
    <>
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
        }}
      >
        <Nav openNav={true} onCloseNav={() => {}} />
        <BasePage />
      </Box>
    </>
  );
}
