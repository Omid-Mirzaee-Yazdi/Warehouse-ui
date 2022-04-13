import logo from "./logo.svg";
import "./App.css";

import {
  CarCrashRounded,
  InboxRounded,
  ListRounded,
  MailRounded,
} from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { routes } from "./Func/routes";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={routes.login}>
            <h1>LOGIN </h1>;
          </Route>
          <Route path={routes.dashboard}>
            <Dashboard />
          </Route>

          <Route path={routes.base}>
            <Redirect to={routes.dashboard} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
