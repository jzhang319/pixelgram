import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from "../../store/photo";
// import * as commentActions from "../../store/comment";

function Home() {
  const dispatch = useDispatch();

  const allPhotos = useSelector((state) =>
    Object.values(state.photo).sort((a, b) => b.id - a.id)
  );
  // console.log(allPhotos, " <--- allPhotos");

  // const comments =

  useEffect(() => {
    dispatch(photoActions.getThePhotos());
    // dispatch(commentActions.getTheComments());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      {/* <div className="user-profile-container">
        ============= user-profiles container =============
      </div> */}
      <div className="photo-container">
        {allPhotos.map((photo) => {
          // console.log(photo?.user?.profile_url, " <--- photo");
          return (
            <div key={photo.id} className="each-photo">
              <div className="profile-pic-username-container">
                {/* <div className="profile-picture"> */}
                <img
                  className="profile-img"
                  src={photo?.user?.profile_url}
                  alt=""
                />
                {/* </div> */}
                <div className="photo-user-profile">
                  {photo?.user?.username}
                </div>
              </div>
              <NavLink className="photo-link" to={`/photos/${photo.id}`}>
                <div className="photo-img-box">
                  <img src={photo.url} alt={photo.caption} />
                </div>
              </NavLink>
              <div className="photo-like-comment-section">
                <i className="fa-solid fa-heart"></i>{" "}
                <i className="fa-solid fa-comment"></i>
              </div>
              {/* {photo?.user?.username} */}
              <div className="photo-caption">{photo.caption}</div>
              <div>Latest comment:</div>
              {/* {photo.comment.map((comment) => {
                return (
                  <div key={comment.id} className="another-each">
                    {comment.comment}
                  </div>
                );
              })} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
