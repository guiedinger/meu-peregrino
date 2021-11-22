import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Main from "./pages/Main";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <PrivateRoute path="/main" component={Main} />
      </Switch>
    </Router>
  );
}
