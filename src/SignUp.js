/** @format */

import React, { useState } from "react";
import "./SignUp.css";
import CustomButton from "./customButton";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      alert("password don't match");
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("./signin");
          auth.user.updateProfile({
            displayName: username,
          });
        }
      })
      .catch((error) => alert(error.message));

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmpassword("");
  };

  return (
    <div className="signup-back">
      <div className="sign-up">
        <h1 className="title">Sign Up!</h1>

        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset">
            <legend className="legend-tittle">Username</legend>
            <input
              className="input"
              name="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Enter User Name"
              required
            />
          </fieldset>

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

          <fieldset className="fieldset">
            <legend className="legend-tittle">Confirm</legend>
            <input
              className="input"
              name="confirmpassword"
              type="password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              value={confirmpassword}
              placeholder="Confirm Password"
              required
            />
          </fieldset>

          <div className="account">
            <Link to="/signin">
              <span> Already have an account?</span>
            </Link>
          </div>

          <div className="buttons">
            <CustomButton type="submit">Sign Up</CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
