import React from "react";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { lighten } from "@mui/system";
import Box from "@mui/material/Box";

const Tile = ({
  isLoading = false,
  title,
  Icon,
  showFighures = true,
  onClickLabel,
  figures,
  onClickCard,
  onClickIcon,
  styles: {
    rootStyles = {},
    content: { titleStyles = {}, figureStyles = {} } = {},
    textBackgroundColor,
    textColor = "#000000",
  } = {},
}) => {
  const theme = useTheme();

  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 14px",
        gap: "10px",
        cursor: onClickCard ? "pointer" : "initial",
        "&:hover": {
          opacity: onClickCard ? 0.7 : 1,
        },
      }}
      onClick={onClickCard}
      style={{ ...rootStyles, backgroundColor: lighten(textColor, 0.8) }}
    >
      <Box
        sx={{
          padding: "5px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "55px",
          height: "55px",
          // backgroundColor: textColor,
          // color: theme.palette.getContrastText(textColor),
          // cursor: onClickIcon ? "pointer" : "initial",
        }}
        onClick={onClickIcon}
      >
        {Icon}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {showFighures &&
          (isLoading ? (
            <div animation="border" style={{ marginTop: "10px" }} />
          ) : (
            <Box
              sx={{
                fontSize: "3rem",
                fontWeight: 600,
                lineHeight: 1,
              }}
              style={{ ...figureStyles }}
            >
              {figures || "-"}
            </Box>
          ))}
        <Box
          sx={{
            color: "#777",
            marginTop: "4px",
            transition: "opacity 0.3s ease",
            // cursor: onClickLabel ? "pointer" : "initial",
            "&:hover": {
              opacity: onClickLabel ? 0.6 : 1,
            },
          }}
          className={"font-size-h6 "}
          style={{ ...titleStyles }}
          onClick={onClickLabel}
        >
          {title}
        </Box>
      </Box>
    </Box>
  );
};

export default Tile;
