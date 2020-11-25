import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Cocinero } from "./modulos/Cocinero";
import {Mesonero} from "./modulos/Mesonero";
import {Home} from "./modulos/Home";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path= "/mesonero" exact>
          <Mesonero/>
        </Route>
        <Route path= "/cocinero" exact>
          <Cocinero/>
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
