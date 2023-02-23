import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from "../../store/photo";
import * as commentActions from "../../store/comment";
// import * as sessionActions from "../../store/session";

function Home() {
  const dispatch = useDispatch();

  const allPhotos = useSelector((state) =>
    Object.values(state.photo).sort((a, b) => b.id - a.id)
  );
  // console.log(allPhotos, " <--- allPhotos");

  const allComments = useSelector((state) => Object.values(state.comment));
  // console.log(allComments, " <--- allComments here");

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(photoActions.getThePhotos());
    dispatch(commentActions.getTheAllComments());
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
                  className="profile-pic"
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
                  <img
                    className="photo-itself"
                    src={photo.url}
                    alt={photo.caption}
                  />
                  {user.id === photo.user_id && <button className="photo-btn">Edit Photo</button>}
                </div>
              </NavLink>
              {/* <div className="photo-like-comment-section">
                <i className="fa-solid fa-heart"></i>{" "}
                <i className="fa-solid fa-comment"></i>
              </div> */}
              {/* {photo?.user?.username} */}
              <div className="photo-caption-container">
                <div className="photo-caption">Caption:{' '}{photo.caption}</div>
                <div>Comment(s):</div>
                {allComments.map((comment) => {
                  if (comment.photo_id === photo.id) {
                    return (
                      <div key={comment.id} className="each-comment">
                        <div className="pic-and-username">
                          <img
                            className="profile-img"
                            src={comment.user.profile_url}
                            alt=""
                          />
                          {comment.user.username}
                        </div>
                        <div className="inside-comment">{comment.comment}</div>
                      </div>
                    );
                  }
                })}
              </div>
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
