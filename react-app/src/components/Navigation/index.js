import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import * as photoActions from "../../store/photo";
import OpenModalButton from "../OpenModalButton";
import PostPhotoForm from "../PostPhotoModal/PostPhotoForm";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    // dispatch(photoActions.addThePhoto(photo));
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch]);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

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
          <i className="fa-solid fa-star"></i>
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
          <i className="fa-solid fa-heart-crack"></i>
          Most Hated
        </div>
      </NavLink>
      {sessionUser && (
        <OpenModalButton
          buttonText="Create Post"
          onItemClick={closeMenu}
          modalComponent={<PostPhotoForm />}
        />
      )}
      {/* <NavLink to="/photos">
        <div>
          <i className="fa-solid fa-plus"></i>
          Create Post
          <PostPhotoModal />
        </div>
      </NavLink> */}
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
