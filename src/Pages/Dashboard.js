import React from "react";
import styles from "./Dashboard.module.css";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { List } from "@mui/material";
import { Divider } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";
import { AppBar } from "@mui/material";
import { Drawer } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import { CarCrashRounded, ListRounded } from "@mui/icons-material";
import { Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Listcomp from "../Components/Listcomp";
import { routes } from "../Func/routes";
const drawerWidth = 240;

const Dashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Warehouse
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              <Link to={routes.dashboardList}>
                <ListItem button key="List">
                  <ListItemIcon>
                    <ListRounded />
                  </ListItemIcon>
                  <ListItemText primary="List" />
                </ListItem>
              </Link>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <Route path={routes.dashboardList}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Listcomp />
                </div>
              </CSSTransition>
            )}
          </Route>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
