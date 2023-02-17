import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navigation-side-panel">
      <NavLink className="nav-home-button" to="/">
        <h1>Pixelgram</h1>
      </NavLink>
      <NavLink to="/">
        <div>
          Home
        </div>
      </NavLink>
      {isLoaded && (
        <div className="user-profile-button">
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
