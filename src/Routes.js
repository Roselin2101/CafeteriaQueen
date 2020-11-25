
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./modulos/Home";
import { Cocinero } from "./modulos/Cocinero";
import { Mesonero } from "./modulos/Mesonero";

 const Routes = () => {
  return (
    <Router>
    <Switch>
      <Route path="/cocinero" component={Cocinero}/>
      <Route path="/mesonero" component={Mesonero} />
      <Route path="/" componente={Home}/>
    </Switch>
    </Router>
  );
};
export default Routes;