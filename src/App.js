import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Cocinero } from "./modulos/Cocinero";
import {Mesonero} from "./modulos/Mesonero";
import {Home} from "./modulos/Home";
import {firebase} from "./Firebase"

function App() {
React.useEffect(()=>{
const obtenerDatos = async ()=>{
try {
  const db = firebase.firestore()
  const data = await db.collection("productos").get()
  console.log(data.docs)
  
} catch (error) {
  console.log(error)
}

}
obtenerDatos()
}, [])


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
