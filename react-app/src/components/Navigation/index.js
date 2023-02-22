import React, { useEffect, useState, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import PostPhotoForm from "../PostPhotoModal/PostPhotoForm";


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
      {/* <NavLink to="/following">
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
      </NavLink> */}
      {sessionUser && (
        <div
          // onClick={
          //   <OpenModalButton
          //     buttonText="Create Post"
          //     onItemClick={closeMenu}
          //     modalComponent={<PostPhotoForm />}
          //   />
          // }
        >
          <i className="fa-solid fa-plus"></i>
          <OpenModalButton
            buttonText="Create Post"
            onItemClick={closeMenu}
            modalComponent={<PostPhotoForm />}
          />
        </div>
      )}
      {!sessionUser && (
        <button onClick={handleDemoLogin}>Demo Login</button>
      )}
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
