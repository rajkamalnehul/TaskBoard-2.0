/** @format */

import React, { useEffect } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TaskBoard from "./TaskBoard";
import "./App.css";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user is/was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/taskboard" component={TaskBoard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
