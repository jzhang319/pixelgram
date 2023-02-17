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
        <h1 className="pixel">Pixel<em>gram</em></h1>
      </NavLink>
      <NavLink to="/">
        <div>Home</div>
      </NavLink>
      <NavLink to="/following">
        <div>Following</div>
      </NavLink>
      <NavLink to="/newest">
        <div>Newest</div>
      </NavLink>
      <NavLink to="/most-liked">
        <div>Most Liked</div>
      </NavLink>
      <NavLink to="/most-hated">
        <div>Most Hated</div>
      </NavLink>
      {isLoaded && (
        <span className="profile-section-button">
          <ProfileButton user={sessionUser} />
        </span>
      )}
    </div>
  );
}

export default Navigation;
