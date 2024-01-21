import styled from "@emotion/styled";

const Container = styled("div")({
  width: "100%",
});

const TilesContainer = styled("div")({
  height: "auto",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "15px",
  padding: "40px 20px",
  "& > div:nth-child(1)": {
    height: "auto",
  },
  "& > div:nth-child(2)": {
    gridRow: 2,
    height: "auto",
  },
  "& > div:nth-child(3),& > div:nth-child(4)": {
    gridRow: "1 / span 2",
  },
  "& > div:nth-child(6),& > div:nth-child(7)": {
    gridRow: "3",
  },
});

const Header = styled("div")({
  height: "auto",
  width: "100%",

  // gap: "10px",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const Img = styled("img")({
  height: "100%",
  width: "auto",
  // backgroundColor: "#efefef",
  borderRadius: "10px",
  padding: "5px",
  boxSizing: "border-box",
  // objectFit: "contain",
});

export const DashboardStyles = {
  Container,
  Img,
  Header,
  TilesContainer,
};

export default DashboardStyles;
