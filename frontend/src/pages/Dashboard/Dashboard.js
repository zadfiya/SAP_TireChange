import React, { useState } from "react";
import Tile from "../../ui/Tile/Tile";
import MediumCarImg from "../../resources/images/medium.png";
import CompactCarImg from "../../resources/images/compact.png";
import class1CarImg from "../../resources/images/class-1-truck.png";
import fullSizeCarImg from "../../resources/images/full-size.png";
import class2CarImg from "../../resources/images/class-2-truck.png";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./Dashboard.styles";
import DashboardTile from "./components/DashboardTile/DashboardTile";
import { Box, Chip } from "@mui/material";

import { useTheme } from "@mui/material/styles";
// import Graphs from "../../components/Graphs/Graphs";
import Page from "../Page";
const data = [
  {
    title: "Compact Cars",
    revenue: 23,
    lostRevenue: 23,
    gainedCustomers: 23,
    lostCustomers: 23,

    Icon: <styles.Img src={CompactCarImg} />,
  },
  {
    title: "Medium Cars",
    revenue: 23,
    lostRevenue: 23,
    gainedCustomers: 23,
    lostCustomers: 23,
    Icon: <styles.Img src={MediumCarImg} />,
  },
  {
    title: "Full Size Cars",
    revenue: 23,
    lostRevenue: 23,
    gainedCustomers: 23,
    lostCustomers: 23,

    Icon: <styles.Img src={fullSizeCarImg} />,
  },
  {
    title: "Class 1 Cars",
    revenue: 23,
    lostRevenue: 23,
    gainedCustomers: 23,
    lostCustomers: 23,

    Icon: <styles.Img src={class1CarImg} />,
  },
  {
    title: "Class 2 Cars",
    revenue: 23,
    lostRevenue: 23,
    gainedCustomers: 23,
    lostCustomers: 23,

    Icon: <styles.Img src={class2CarImg} />,
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const isToday = true;

  return (
    <Page>
      <styles.Container>
        <styles.TilesContainer>
          {/* <Tile
            // title={"Total Revenue"}
            Icon={
              <div style={{ width: "140px" }}>
                <styles.Img src={class2CarImg} />
              </div>
            }
            styles={{
              rootStyles: {
                flexDirection: "row",
                justifyContent: "space-between",
                height: "max-content",
              },

              titleContainerStyles: {
                justifyContent: "left",
                flex: 1,
              },
            }}
          >
            <Box
              color={theme.palette.success.light}
              fontSize={"3rem"}
              fontWeight={600}
            >
              $1200
            </Box>
            <Box fontSize={"0.8rem"} textAlign={"right"}>
              Total Gained Revenue
            </Box>
          </Tile>
          <Tile
            // title={"Total Revenue"}
            Icon={
              <div style={{ width: "140px" }}>
                <styles.Img src={class2CarImg} />
              </div>}
            styles={{
              rootStyles: {
                flexDirection: "row",
                justifyContent: "space-between",
                height: "max-content",
              },

              titleContainerStyles: {
                justifyContent: "left",
                flex: 1,
              },
            }}
          >
            <Box
              color={theme.palette.error.light}
              fontSize={"3rem"}
              fontWeight={600}
            >
              $100
            </Box>
            <Box fontSize={"0.8rem"} textAlign={"right"}>
              Total Lost Revenue
            </Box>
          </Tile> */}

          {data.map((item, index) => {
            return (
              <DashboardTile
                isLoading={false}
                title={item.title}
                Icon={<div style={{ width: "140px" }}>{item.Icon}</div>}
                revenue={item.revenue}
                lostRevenue={item.lostRevenue}
                gainedCustomers={item.gainedCustomers}
                lostCustomers={item.lostCustomers}
                // revenue={item.revenue}
              />
            );
          })}
        </styles.TilesContainer>
      </styles.Container>
    </Page>
  );
};

export default Dashboard;
