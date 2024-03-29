import React from "react";

import { CircularProgress, Paper } from "@mui/material";
import Box from "@mui/material/Box";

const Tile = ({
  isLoading = false,
  title,
  Icon,
  styles: {
    rootStyles = {},
    bodyStyles = {},
    titleStyles = {},
    titleContainerStyles = {},
  } = {},
  children,
}) => {
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        alignItems: "center",
        padding: "8px",
        height: isLoading ? "200px" : "auto",
        // gap: "10px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow:
          "0px 1px 2px rgba(0, 0, 0, 0.1), 0px 5px 15px rgba(0, 0, 0, 0.05), 0px 0px 15px rgba(0, 0, 0, 0.05)",
        ...rootStyles,
      }}
    >
      <Box
        sx={{
          padding: "5px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          height: "75px",
          ...titleContainerStyles,
        }}
      >
        {Icon}
        <Box
          sx={{
            color: "#777",
            marginTop: "4px",
            transition: "opacity 0.3s ease",
          }}
          className={"font-size-h6 "}
          style={{ ...titleStyles }}
        >
          {title}
        </Box>
      </Box>
      <Box
        sx={{
          ...bodyStyles,
          ...(isLoading && {
            alignItems: "center",
            justifyContent: "center",
          }),
        }}
      >
        {isLoading ? <CircularProgress /> : children}
      </Box>
    </Box>
  );
};

export default Tile;
