import React from "react";
import Tile from "../../ui/Tile/Tile";
import MediumCarImg from "../../resources/images/compact-car.png";
import CompactCarImg from "../../resources/images/car.png";
import class1CarImg from "../../resources/images/container-truck.png";
import fullSizeCarImg from "../../resources/images/sedan.png";
import class2CarImg from "../../resources/images/truck.png";

import styles from "./Dashboard.styles";
import DashboardTile from "./components/DashboardTile/DashboardTile";

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
  return (
    <styles.Container>
      {data.map((item, index) => {
        return (
          <DashboardTile
            isLoading={false}
            title={item.title}
            Icon={item.Icon}
            revenue={item.revenue}
            lostRevenue={item.lostRevenue}
            gainedCustomers={item.gainedCustomers}
            lostCustomers={item.lostCustomers}
            // revenue={item.revenue}
          />
        );
      })}
    </styles.Container>
  );
};

export default Dashboard;
