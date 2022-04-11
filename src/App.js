import logo from "./logo.svg";
import "./App.css";
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
import {
  CarCrashRounded,
  InboxRounded,
  ListRounded,
  MailRounded,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
const drawerWidth = 240;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <h1>LOGIN </h1>;
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
