import React from "react";
import BasePage from "./BasePage";
import { Box } from "@mui/material";
import Nav from "./nav";
import CustomAppbar from "./CustomAppbar";

export function Routes() {
  return (
    <>
      <Box
        sx={{
          minHeight: 1,
          // display: "flex",
        }}
      >
        {/* <Nav openNav={true} onCloseNav={() => {}} /> */}
        <CustomAppbar />
        <Box sx={{ flex: 1, background: "#FAFBFF", marginTop: "63px" }}>
          {" "}
          <BasePage />
        </Box>
      </Box>
    </>
  );
}
