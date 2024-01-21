import styled from "@emotion/styled";

const Container = styled("div")({
  width: "100%",
});

const TilesContainer = styled("div")({
  height: "auto",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gap: "10px",
  padding: "20px",
  "& > div:nth-child(n+3)": {
    gridRow: "2",
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
  backgroundColor: "#efefef",
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
