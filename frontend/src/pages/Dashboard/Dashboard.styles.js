import styled from "@emotion/styled";

const Container = styled("div")({
  height: "auto",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gap: "10px",
  padding: "20px",
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
};

export default DashboardStyles;
