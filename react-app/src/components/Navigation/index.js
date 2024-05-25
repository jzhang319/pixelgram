import React, { useEffect, useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import PostPhotoForm from "../PostPhotoModal/PostPhotoForm";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  const handleDemoLogin = (e) => {
    let email = "demo@aa.io";
    let password = "password";
    e.preventDefault();
    dispatch(sessionActions.login(email, password));
    history.push("/");
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
  }, [dispatch, showMenu]);

  // const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="navigation-side-panel">
      <NavLink className="nav-home-button" to="/">
        <div className="logo-section">
          <img className="pixel-logo" src="/static/images/logo.png" alt="logo" />
          <h2 className="pixel">
            Pixel<em>gram</em>
          </h2>
        </div>
      </NavLink>
      <NavLink className="home-log" to="/">
        <div className="home-button-section">
          <i className="fa-solid fa-house"></i>
          Home
        </div>
      </NavLink>
      {sessionUser && (
        <NavLink to="/explore">
          <div className="explore-page-tab">
            <i className="fa-solid fa-compass"></i>
            Explore
          </div>
        </NavLink>
      )}
      {/* <NavLink to="/most-liked">
        <div>
          <i className="fa-solid fa-heart"></i>
          Most Liked
        </div>
      </NavLink> */}
      {/* <NavLink to="/most-hated">
        <div>
          <i className="fa-solid fa-heart-crack"></i>
          Most Hated
        </div>
      </NavLink> */}
      {sessionUser && (
        <OpenModalButton
          buttonText="Create Post"
          onItemClick={closeMenu}
          modalComponent={<PostPhotoForm />}
          icon={<i className="fa-solid fa-square-plus"></i>}
        />
      )}
      {!sessionUser && (
        <div onClick={handleDemoLogin} className="demo-login-button">
          <i className="fa-solid fa-user"></i>
          Demo Login
        </div>
      )}
      {!sessionUser && (
        <>
          <OpenModalButton
            buttonText="Log In"
            onItemClick={closeMenu}
            modalComponent={<LoginFormModal />}
            icon={<i className="fa-solid fa-right-to-bracket"></i>}
          />

          <OpenModalButton
            buttonText="Sign Up"
            onItemClick={closeMenu}
            modalComponent={<SignupFormModal />}
            icon={<i className="fa-solid fa-file"></i>}
          />
        </>
      )}
      {sessionUser && <ProfileButton user={sessionUser} />}
    </div>
  );
}

export default Navigation;
