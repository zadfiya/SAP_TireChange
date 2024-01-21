import styled from "@emotion/styled";

const Container = styled("div")({
  width: "100%",
});

// const TilesContainer = styled("div")({
//   height: "auto",
//   width: "100%",
//   display: "grid",
//   gridTemplateColumns: "repeat(6,1fr)",
//   gap: "28px",
//   padding: "20px",
//   backgroundColor: "transparent",
//   "& > div:nth-child(1),& > div:nth-child(2)": {
//     gridColumn: "span 2",
//   },
//   "& > div:nth-child(3),& > div:nth-child(4),& > div:nth-child(5)": {
//     gridRow: "2",
//     gridColumn: "span 2",
//   },
//   "& > div:nth-child(6),& > div:nth-child(7)": {
//     gridRow: "3",
//     gridColumn: "span 2",
//   },
// });
const TilesContainer = styled("div")({
  height: "auto",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  backgroundColor: "transparent",
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
  height: "auto",
  width: "100%",
  // backgroundColor: "#efefef",
  borderRadius: "10px",
  // padding: "5px",
  boxSizing: "border-box",
  // objectFit: "contain",
  filter: "drop-shadow(4px 4px 4px rgba(0,0,0,0.25))",
});

export const DashboardStyles = {
  Container,
  Img,
  Header,
  TilesContainer,
};

export default DashboardStyles;
