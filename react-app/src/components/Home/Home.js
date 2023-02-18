import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from "../../store/photo";
import OpenModalButton from "../OpenModalButton";

function Home() {
  const dispatch = useDispatch();

  const allPhotos = useSelector((state) => Object.values(state.photo));
  // console.log(allPhotos, " <--- allPhotos");
  useEffect(() => {
    dispatch(photoActions.getThePhotos());
  }, [dispatch]);

  return (
    <div className="homepage-container">
     
      <div className="user-profile-container">
        ================ user-profiles container ================
      </div>
      <div className="photo-container">
        {/* <h1>Posts</h1> */}
        {allPhotos.map((photo) => {
          // console.log(photo, " <--- photo");
          return (
            <div key={photo.id} className="each-photo">
              <NavLink className="photo-link" to={`/photos/${photo.id}`}>
                <div className="photo-user-profile">author-info-here</div>
                <div className="photo-img-box">
                  <img src={photo.url} alt={photo.caption} />
                </div>
                <div className="photo-like-comment-section">
                  like icon , comment icon here
                </div>
                <div className="photo-caption">
                  {photo.username}
                  {photo.caption}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
