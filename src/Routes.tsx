import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route path="/main">
          <Main></Main>
        </Route>
      </Switch>
    </Router>
  );
}
