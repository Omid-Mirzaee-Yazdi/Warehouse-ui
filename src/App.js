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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <h1>LOGIN </h1>;
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>

          <Route path="/">
            <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
