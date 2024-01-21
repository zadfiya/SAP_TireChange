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
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {" "}
          <BasePage />
        </Box>
      </Box>
    </>
  );
}
