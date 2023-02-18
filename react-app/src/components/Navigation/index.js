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
        <h1 className="pixel">
          Pixel<em>gram</em>
        </h1>
      </NavLink>
      <NavLink to="/">
        <div>
          <i className="fa-solid fa-house"></i>
          Home
        </div>
      </NavLink>
      <NavLink to="/following">
        <div>
          <i class="fa-solid fa-star"></i>
          Following
        </div>
      </NavLink>
      <NavLink to="/most-liked">
        <div>
          <i className="fa-solid fa-heart"></i>
          Most Liked
        </div>
      </NavLink>
      <NavLink to="/most-hated">
        <div>
          <i class="fa-solid fa-heart-crack"></i>
          Most Hated
        </div>
      </NavLink>
      <NavLink to="/photos">
        <div>
          <i class="fa-solid fa-plus"></i>
          Create Post
        </div>
      </NavLink>
      {isLoaded && (
        <div className="profile-section-button">
          <ProfileButton user={sessionUser} />
          Profile
        </div>
      )}
    </div>
  );
}

export default Navigation;
