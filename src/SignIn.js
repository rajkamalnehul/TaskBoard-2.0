/** @format */

import React, { useState } from "react";
import "./SignIn.css";
import CustomButton from "./customButton";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("./taskboard");
      })
      .catch((error) => alert(error.message));
    setEmail("");
    setPassword("");
    console.log(auth);
  };

  return (
    <div className="signin-back">
      <div className="sign-up">
        <h1 className="title">Log In!</h1>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="legend-tittle">Email</legend>
            <input
              className="input"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email"
              required
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="legend-tittle">Password</legend>
            <input
              className="input"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password"
              required
            />
          </fieldset>

          <div className="account">
            <Link to="/">
              <span>Create Account?</span>
            </Link>
          </div>
          <div className="buttons">
            <CustomButton type="submit">Log In</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
