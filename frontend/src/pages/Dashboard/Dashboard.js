import React, { useEffect, useState } from "react";
import Tile from "../../ui/Tile/Tile";
import MediumCarImg from "../../resources/images/compact-car.png";
import CompactCarImg from "../../resources/images/car.png";
import class1CarImg from "../../resources/images/container-truck.png";
import fullSizeCarImg from "../../resources/images/sedan.png";
import class2CarImg from "../../resources/images/truck.png";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./Dashboard.styles";
import DashboardTile from "./components/DashboardTile/DashboardTile";
import { Box, Chip } from "@mui/material";

import { useTheme } from "@mui/material/styles";

// import Graphs from "../../components/Graphs/Graphs";
import Page from "../Page";
import { getDashboardData } from "../../apis/apis";
import { dollar } from "../../utils/utils";
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
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDashboardData()
      .then((res) => {
        console.log(res);
        setDashboardData(res.data);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

  const theme = useTheme();

  return (
    <Page title={"Dashboard"}>
      <styles.Container>
        <styles.TilesContainer>
          <Tile
            isLoading={loading}
            // title={"Total Revenue"}
            Icon={<styles.Img src={class2CarImg} />}
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
              textAlign={"right"}
            >
              {dollar(dashboardData?.totalReveneue)}
            </Box>
            <Box fontSize={"0.8rem"} textAlign={"right"}>
              Total Gained Revenue
            </Box>
          </Tile>
          <Tile
            isLoading={loading}
            // title={"Total Revenue"}
            Icon={<styles.Img src={class2CarImg} />}
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
              titleStyles: {},
            }}
          >
            <Box
              color={theme.palette.error.light}
              fontSize={"3rem"}
              fontWeight={600}
              textAlign={"right"}
            >
              {dollar(dashboardData?.totalTurnedaway)}
            </Box>
            <Box fontSize={"0.8rem"} textAlign={"right"}>
              Total Lost Revenue
            </Box>
          </Tile>

          {data.map((item, index) => {
            return (
              <DashboardTile
                isLoading={loading}
                title={item.title}
                Icon={item.Icon}
                revenue={dollar(
                  dashboardData?.vehicleWise?.[index]?.totalReveneue
                )}
                lostRevenue={dollar(
                  dashboardData?.vehicleWise?.[index]?.totalTurnedaway
                )}
                gainedCustomers={
                  dashboardData?.vehicleWise?.[index]?.totalReveneue /
                  dashboardData?.vehicleWise?.[index]?.id?.charge
                }
                lostCustomers={
                  dashboardData?.vehicleWise?.[index]?.totalTurnedaway /
                  dashboardData?.vehicleWise?.[index]?.id?.charge
                }
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
