import { Box, Divider, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";
import class1CarImg from "../../resources/images/class-1-truck.png";
import class2CarImg from "../../resources/images/class-2-truck.png";
import CompactCarImg from "../../resources/images/compact.png";
import fullSizeCarImg from "../../resources/images/full-size.png";
import MediumCarImg from "../../resources/images/medium.png";

import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "10px",
  },
  tile: {
    padding: "10px",
    margin: "10px",
    color: "#111",
    cursor: "pointer",
    transition: "box-shadow 0.3s ease",
    borderRadius: "10px",
  },
  msgContainer: {
    width: "auto",
    height: "auto",
    minHeight: "80px",
    border: "1px solid #111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "24px",
  },
  btn: {
    width: "fit-content",
    border: "3px solid #111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "16px",
    cursor: "pointer",
    padding: "8px 16px",
  },
};

const carOptions = [
  {
    label: "Compact",
    value: "65ac38201345cb2eea7dd1c1",
    color: "#ef9a9a",
    Icon: <Img src={CompactCarImg} />,
  },
  {
    label: "Medium",
    value: "65ac382f1345cb2eea7dd1c4",
    color: "#ce93d8",
    Icon: <Img src={MediumCarImg} />,
  },
  {
    label: "Full-size",
    value: "65ac38341345cb2eea7dd1c6",
    color: "#90caf9",
    Icon: <Img src={fullSizeCarImg} />,
  },
  {
    label: "Class 1 truck",
    value: "65ac38651345cb2eea7dd1c8",
    color: "#80cbc4",
    Icon: <Img src={class1CarImg} />,
  },
  {
    label: "Class 2 truck",
    value: "65ac38701345cb2eea7dd1ca",
    color: "#a5d6a7",
    Icon: <Img src={class2CarImg} />,
  },
];

const CustomDialog = ({ open, handleClose }) => {
  const [carType, setCarType] = React.useState(null);
  const [status, setStatus] = React.useState("");

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="booking-dialog"
      maxWidth="md"
    >
      <DialogTitle sx={{ fontWeight: "900" }}>{"Schedule Service"}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <DialogContentText id="booking-dialog">
          <div style={styles.container}>
            {carOptions.map((item, index) => (
              <div
                key={index}
                style={{
                  ...styles.tile,
                  opacity: carType === item.value ? "1" : "0.5",
                  color: "#111",
                  backgroundColor: carType === item.value ? item.color : "#ddd",
                  boxShadow:
                    carType === item.value
                      ? "1px 1px 8px 0px rgba(0,0,0,0.2)"
                      : "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                onClick={() => {
                  setCarType(item.value);
                }}
              >
                <div style={{ width: "auto", height: "50px" }}>{item.Icon}</div>
                <Divider />
                {item.label}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button
              variant="outlined"
              disabled={!carType}
              onClick={() => {
                setStatus(0);
              }}
            >
              Check for slot
            </Button>
          </div>

          {status !== "" && (
            <Box
              sx={{
                ...styles.msgContainer,
                ...(status === 0
                  ? {
                      borderColor: "#ddd",
                      color: "#333",
                      backgroundColor: "#ddd",
                    }
                  : status === 2
                  ? {
                      borderColor: "#f44336",
                      color: "#f44336",
                      backgroundColor: "#f4433630",
                    }
                  : {
                      borderColor: "#4caf50",
                      color: "#4caf50",
                      backgroundColor: "#4caf5030",
                    }),
              }}
            >
              {status === 0
                ? "waiting for response..."
                : status === 2
                ? "No slot available"
                : "Slot available"}
            </Box>
          )}
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default CustomDialog;
