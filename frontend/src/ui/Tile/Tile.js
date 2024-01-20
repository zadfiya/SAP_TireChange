import React from "react";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

const Tile = ({
  isLoading = false,
  title,
  Icon,
  styles: { rootStyles = {}, bodyStyles = {}, titleStyles = {} } = {},
  children,
}) => {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        // alignItems: "center",
        padding: "5px",
        // gap: "10px",
        backgroundColor: "#fff",
        // cursor: onClickCard ? "pointer" : "initial",
        // "&:hover": {
        //   opacity: onClickCard ? 0.7 : 1,
        // },
      }}
      // onClick={onClickCard}
      style={{ ...rootStyles }}
    >
      <Box
        sx={{
          padding: "5px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          height: "55px",
          // backgroundColor: textColor,
          // color: theme.palette.getContrastText(textColor),
          // cursor: onClickIcon ? "pointer" : "initial",
        }}
        // onClick={onClickIcon}
      >
        {Icon}
        <Box
          sx={{
            color: "#777",
            marginTop: "4px",
            transition: "opacity 0.3s ease",
            // cursor: onClickLabel ? "pointer" : "initial",
          }}
          className={"font-size-h6 "}
          style={{ ...titleStyles }}
          // onClick={onClickLabel}
        >
          {title}
        </Box>
      </Box>
      <Box sx={{ ...bodyStyles }}>{children}</Box>
    </Box>
  );
};

export default Tile;
