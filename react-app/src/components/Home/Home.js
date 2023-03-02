import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from "../../store/photo";
import * as commentActions from "../../store/comment";
import * as reactionActions from "../../store/reaction";
import * as followerActions from "../../store/follower";
import AddCommentForm from "../AddComment/AddCommentForm";

function Home() {
  const dispatch = useDispatch();

  const allPhotos = useSelector((state) =>
    Object.values(state.photo).sort((a, b) => b.id - a.id)
  );
  // console.log(allPhotos, " <--- allPhotos");

  const allComments = useSelector((state) => Object.values(state.comment));
  // console.log(allComments, " <--- allComments here");

  const user = useSelector((state) => state.session.user);

  const followingUsers = useSelector((state) => Object.values(state.follower));
  // console.log(followingUsers, " <--- following users");
  // console.log(followingUsers.includes(user.id), ' <------')

  useEffect(() => {
    dispatch(photoActions.getThePhotos());
    dispatch(commentActions.getTheAllComments());
    dispatch(reactionActions.getTheReactions());
    if (user) {
      dispatch(followerActions.getTheAllFollowers());
    }
  }, [dispatch]);

  return (
    <div className="homepage-container">
      {/* <div className="user-profile-container">
        =============following user-profiles container =============
      </div> */}
      <div className="photo-container">
        {allPhotos.map((photo) => {
          return (
            <div key={photo.id} className="each-photo">
              <div className="profile-pic-username-container">
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
                  {user?.id === photo?.user_id ? (
                    <button className="photo-btn">Edit Photo</button>
                  ) : (
                    <button className="photo-btn">Comment Photo</button>
                  )}
                </div>
              </NavLink>
              <div className="photo-like-section">
                {user ? (
                  photo.user_reacted?.includes(user.id) ? (
                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          reactionActions.postTheReaction(photo.id, user.id)
                        )
                          .then(() => dispatch(photoActions.getThePhotos()))
                          .then(() =>
                            dispatch(reactionActions.getTheReaction(photo.id))
                          );
                      }}
                      className="fa-solid fa-heart liked-icon"
                    ></i>
                  ) : (
                    <i
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(
                          reactionActions.postTheReaction(photo.id, user.id)
                        )
                          .then(() => dispatch(photoActions.getThePhotos()))
                          .then(() =>
                            dispatch(reactionActions.getTheReaction(photo.id))
                          );
                      }}
                      className="fa-solid fa-heart like-icon"
                    ></i>
                  )
                ) : (
                  <></>
                )}
                {user?.id !== photo?.user_id && user ? (
                  <div
                    className="follow-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        followerActions.addTheFollower(photo.user_id, user.id)
                      )
                      // .then(() =>
                      //   dispatch(followerActions.getTheAllFollowers())
                      // );
                    }}
                  >
                    Follow
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {photo?.reaction_length > 0 && (
                <div className="number-likes-section">
                  {photo.reaction_length} likes
                </div>
              )}
              <div className="photo-caption-container">
                <div className="photo-caption">Caption: {photo.caption}</div>
                <div>Comment(s):</div>
                {allComments.map((comment) => {
                  // console.log(comment, " <------ comment");
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
                  return null;
                })}
                {user && <AddCommentForm photo={photo} user={user} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
