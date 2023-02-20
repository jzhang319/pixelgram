import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import * as photoActions from "../../store/photo";
// import EditPhotoFormModal from "../EditPhotoFormModal";
import OpenModalButton from "../OpenModalButton";
import EditPhotoForm from "../EditPhotoFormModal/EditPhotoForm";

function PhotoDetail() {
  const { photoId } = useParams();

  const dispatch = useDispatch();
  const currPhoto = useSelector((state) => state.photo);
  const user = useSelector((state) => state.session.user);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    dispatch(photoActions.getThePhoto(photoId));
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, photoId]);

  // console.log(photoId, " <--- id");
  // console.log(currPhoto?.user?.profile_url, " <--- current photo useSelector");
  // console.log(currPhoto[id - 1], " <--- current photo useEffect");
  // console.log(user.id, ' <------ ')
  // console.log(currPhoto.user_id, ' <------ ')

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  let content = null;

  if (user?.id === currPhoto.user_id) {
    content = currPhoto ? (
      <div className="photodetail-container">

        <div className="photo-detail">
          <div className="profile-pic-username-container">
            <div className="profile-picture">
              <img
                className="profile-picture"
                src={currPhoto?.user?.profile_url}
                alt=""
              />
            </div>
            <div className="photo-user-profile">
              {currPhoto?.user?.username}
            </div>
          </div>
          <div className="detailphoto-img-box">
            <img
              className="img-itself"
              src={currPhoto.url}
              alt={currPhoto.caption}
            />
          </div>
          <div className="photo-like-comment-section">
            <i className="fa-solid fa-heart"></i>{" "}
            <i className="fa-solid fa-comment"></i>
          </div>
          {currPhoto?.user?.username}
          <div className="photo-caption">{currPhoto.caption}</div>
          {/* <EditPhotoFormModal /> */}
          <OpenModalButton
            buttonText="Edit Caption"
            onItemClick={closeMenu}
            modalComponent={<EditPhotoForm />}
          />
        </div>
      </div>
    ) : (
      <></>
    );
  } else {
    content = currPhoto ? (
      <div className="photodetail-container">
        PhotoDetail
        <div className="photo-detail">
          <div className="profile-pic-username-container">
            <div className="profile-picture">
              <img
                className="profile-picture"
                src={currPhoto?.user?.profile_url}
                alt=""
              />
            </div>
            <div className="photo-user-profile">{currPhoto.username}</div>
          </div>
          <div className="detailphoto-img-box">
            <img
              className="img-itself"
              src={currPhoto.url}
              alt={currPhoto.caption}
            />
          </div>
          <div className="photo-like-comment-section">
            <i className="fa-solid fa-heart"></i>{" "}
            <i className="fa-solid fa-comment"></i>
          </div>
          {currPhoto?.user?.username}
          <div className="photo-caption">{currPhoto.caption}</div>
        </div>
      </div>
    ) : (
      <></>
    );
  }

  return content;
}

export default PhotoDetail;
