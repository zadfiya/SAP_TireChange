import React from "react";
import { useTheme } from "@mui/material/styles";
import { Divider, Paper } from "@mui/material";
import { lighten } from "@mui/system";
import Box from "@mui/material/Box";
import Tile from "../../../../ui/Tile/Tile";

const TileScetion = ({
  title,
  gainedValue,
  gainedTitle,
  lostValue,
  lostTitle,
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: "10px",
      padding: "10px",
      gap: "5px",
    }}
  >
    <Box fontSize={"1rem"} fontWeight={600}>
      {title}
    </Box>
    <Box sx={{ display: "flex", gap: "5px", justifyContent: "center",flexDirection:"column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
        color={(theme) => theme.palette.success.light}
      >
        <Box sx={{ fontSize: "3rem", lineHeight: 1, fontWeight: 500 }}>
          {gainedValue}
        </Box>
        <Box
          sx={{ width: "100%", textAlign: "end" }}
          fontSize={"0.8rem"}
          color={"#555"}
        >
          {gainedTitle}
        </Box>
      </Box>
      <Divider orientation="horizontal" flexItem />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ fontSize: "1.5rem", lineHeight: 1, fontWeight: 500 }}
          color={(theme) => theme.palette.error.light}
        >
          {lostValue}
        </Box>
        <Box
          sx={{ width: "100%", textAlign: "end" }}
          fontSize={"0.8rem"}
          color={"#555"}
        >
          {lostTitle}
        </Box>
      </Box>
    </Box>
  </Box>
);

const DashboardTile = ({
  isLoading = false,
  title,
  Icon,

  styles: {
    rootStyles = {},
    content: { titleStyles = {}, figureStyles = {} } = {},
  } = {},
  revenue,
  lostRevenue,
  gainedCustomers,
  lostCustomers,
}) => {
  const theme = useTheme();

  return (
    <Tile
      isLoading={isLoading}
      Icon={Icon}
      // title={title}
      styles={{
        bodyStyles: {
          display: "flex",
          width: "100%",
          flex: 1,
          flexDirection: "column",
          gap: "5px",
        },
      }}
    >
      <TileScetion
        lostValue={lostRevenue}
        gainedValue={revenue}
        lostTitle={"Lost"}
        gainedTitle={"Gained"}
        title={"Revenue"}
      />
      {/* <Divider orientation="vertical" flexItem />
      <TileScetion
        lostValue={lostCustomers}
        gainedValue={gainedCustomers}
        lostTitle={"Lost"}
        gainedTitle={"Served"}
        title={"Customers"}
      /> */}
    </Tile>
  );
};

export default DashboardTile;
