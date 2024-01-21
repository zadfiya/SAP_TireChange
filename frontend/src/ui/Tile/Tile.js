import React from "react";
import { useTheme } from "@mui/material/styles";
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
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // gap: "5px",
        // alignItems: "center",
        // padding: "5px",
        // gap: "10px",
        backgroundColor: "#fff",
        borderRadius: "30px",
        padding: "10px 14px",
        boxShadow: "0px 10px 10px 8px #E2ECF9",
        ...rootStyles,
        // cursor: onClickCard ? "pointer" : "initial",
        // "&:hover": {
        //   opacity: onClickCard ? 0.7 : 1,
        // },
      }}
      // onClick={onClickCard}
      // style={{  }}
    >
      <Box
        sx={{
          padding: "5px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          height: "64px",
          ...titleContainerStyles,
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
