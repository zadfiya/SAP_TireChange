import React from "react";
import Tile from "../../ui/Tile/Tile";
import MediumCarImg from "../../resources/images/compact-car.png";
import CompactCarImg from "../../resources/images/car.png";
import class1CarImg from "../../resources/images/container-truck.png";
import fullSizeCarImg from "../../resources/images/sedan.png";
import class2CarImg from "../../resources/images/truck.png";

import styles from "./Dashboard.styles";

const data = [
  {
    title: "Compact Cars",
    figures: 10,
    Icon: <styles.Img src={CompactCarImg} />,
  },
  {
    title: "Medium Cars",
    figures: 10,
    Icon: <styles.Img src={MediumCarImg} />,
  },
  {
    title: "Full Size Cars",
    figures: 10,
    Icon: <styles.Img src={fullSizeCarImg} />,
  },
  {
    title: "Class 1 Cars",
    figures: 10,
    Icon: <styles.Img src={class1CarImg} />,
  },
  {
    title: "Class 2 Cars",
    figures: 10,
    Icon: <styles.Img src={class2CarImg} />,
  },
];

const Dashboard = () => {
  return (
    <styles.Container>
      {data.map((item, index) => {
        return (
          <Tile
            isLoading={false}
            title={item.title}
            Icon={item.Icon}
            figures={item.figures}
          />
        );
      })}
    </styles.Container>
  );
};

export default Dashboard;
