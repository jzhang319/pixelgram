import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import * as photoActions from "../../store/photo";

function PhotoDetail() {
  const { photoId } = useParams();

  const dispatch = useDispatch();
  const currPhoto = useSelector((state) => state.photo);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(photoActions.getThePhoto(photoId));
  }, [dispatch, photoId]);

  // console.log(photoId, " <--- id");
  // console.log(currPhoto?.user?.profile_url, " <--- current photo useSelector");
  // console.log(currPhoto[id - 1], " <--- current photo useEffect");
  // console.log(user.id, ' <------ ')
  // console.log(currPhoto.user_id, ' <------ ')

  let content = null;

  if (user?.id === currPhoto.user_id) {
    content = currPhoto ? (
      <div className="photodetail-container">
        PhotoDetail
        <div className="photo-detail">
          <div className="profile-pic-username-container">
            <div className="profile-picture">
              <img
                className="profile-picture"
                src={currPhoto.user.profile_url}
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
          <div className="photo-caption">
            {currPhoto.username}
            {currPhoto.caption}
          </div>
          {/* <OpenModalButton buttonText="Edit Caption" onItemClick={closeMenu} /> */}
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
          <div className="photo-caption">
            {currPhoto.username}
            {currPhoto.caption}
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }

  return content;
}

export default PhotoDetail;
