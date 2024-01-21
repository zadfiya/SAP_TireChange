import PropTypes from "prop-types";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import Logo from "./assets/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { navConfig } from "./navConfig";

const NAV = {
  WIDTH: 280,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2,mt:3 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          padding: "12px",
        }}
      >
        <img src={Logo} style={{ height: "100%", width: "100%" }} alt=""></img>
      </Box>
      {renderMenu}
    </Box>
  );

  return (
    <Box
      sx={{
        flexShrink: 0,
        width: NAV.WIDTH,
      }}
    >
      <Box
        sx={{
          height: 1,
          position: "fixed",
          width: NAV.WIDTH,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderContent}
      </Box>
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

function NavItem({ item }) {
  const { pathname } = useLocation();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={Link}
      to={item.path}
      
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: "body2",
        color: "text.secondary",
        textTransform: "capitalize",
        fontWeight: "fontWeightMedium",
        ...(active && {
          color: "primary.main",
          fontWeight: "fontWeightSemiBold",
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
