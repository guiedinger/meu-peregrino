import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Posting from "./pages/Posting";
import Inventory from "./pages/Inventory";
import Items from "./pages/Items";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/lancamentos" component={Posting} />
        <PrivateRoute path="/inventario" component={Inventory} />
        <PrivateRoute path="/itens" component={Items} />
      </Switch>
    </Router>
  );
}
