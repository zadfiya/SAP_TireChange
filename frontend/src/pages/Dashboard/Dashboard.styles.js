import styled from "@emotion/styled";

const Container = styled("div")({
  height: "auto",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(5,1fr)",
  gap: "10px",
});

const Img = styled("img")({
  height: "100%",
  width: "auto",
});

export const DashboardStyles = {
  Container,
  Img,
};

export default DashboardStyles;
