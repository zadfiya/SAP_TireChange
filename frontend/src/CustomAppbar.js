import { Button } from "@mui/base";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box, alpha, useTheme } from "@mui/system";
import React from "react";
import { navConfig } from "./navConfig";
import Logo from "./assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

const CustomAppbar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        zIndex: theme.zIndex.appBar + 1,
        backdropFilter: `blur(6px)`,
        WebkitBackdropFilter: `blur(6px)`,
        backgroundColor: alpha(theme.palette.background.default, 0.8),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        height: "80px",
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: 5,
        }}
      >
        <Box
          sx={{
            padding: "12px",
            height: "100%",
          }}
        >
          <img
            src={Logo}
            style={{ height: "100%", width: "100%" }}
            alt=""
          ></img>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {navConfig.map((item) => (
            <NavItem item={item} key={item.title} />
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const NavItem = ({ item }) => {
  const { pathname } = useLocation();

  const active = item.path === pathname;

  return (
    <Box
      component={Link}
      sx={{
        textDecoration: active ? "underline" : "unset",
        color: active ? "#000" : "#777",
        transition: "all 0.3s ease",
        "&:hover": {
          color: "#000",
          textDecoration: "underline",
        },
        fontWeight: 600,
      }}
      to={item.path}
    >
      {item.title}
    </Box>
  );
};

export default CustomAppbar;
