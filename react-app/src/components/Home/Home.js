import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as photoActions from "../../store/photo";
import * as commentActions from "../../store/comment";
import * as reactionActions from "../../store/reaction";
// import * as sessionActions from "../../store/session";

function Home() {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState("fa-solid fa-heart like-icon");
  const [newComment, setNewComment] = useState("");

  const allPhotos = useSelector((state) =>
    Object.values(state.photo).sort((a, b) => b.id - a.id)
  );
  // console.log(allPhotos, " <--- allPhotos");

  const allComments = useSelector((state) => Object.values(state.comment));
  // console.log(allComments, " <--- allComments here");

  const allUserReactions = useSelector((state) =>
    Object.values(state.session.user.reactions)
  );
  // console.log(allUserReactions, " <--- allReactions here");

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(photoActions.getThePhotos());
    dispatch(commentActions.getTheAllComments());
    dispatch(reactionActions.getTheReactions());
  }, [dispatch]);

  return (
    <div className="homepage-container">
      {/* <div className="user-profile-container">
        =============following user-profiles container =============
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
                  {user?.id === photo?.user_id ? (
                    <button className="photo-btn">Edit Photo</button>
                  ) : (
                    <button className="photo-btn">Comment Photo</button>
                  )}
                </div>
              </NavLink>
              <div className="photo-like-section">
                {/* {allUserReactions.map((reaction) => {
                  if(reaction.user_id === user.id) setLiked("fa-solid fa-heart liked-icon")
                })} */}
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(reactionActions.postTheReaction(photo.id, user.id))
                      .then(() => dispatch(photoActions.getThePhotos()))
                      .then(() =>
                        dispatch(reactionActions.getTheReaction(photo.id))
                      );
                  }}
                  className={liked}
                ></i>
              </div>
              {/* <i className="fa-solid fa-heart"></i>{" "}
              <i className="fa-solid fa-comment"></i> */}
              {/* {photo?.user?.username} */}
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
                {user && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const data = {
                        comment: newComment,
                        photo_id: photo.id,
                        user_id: user.id,
                      };
                      if (newComment === "") {
                        return alert("Please enter a comment");
                      }
                      dispatch(commentActions.addTheComment(data)).then(
                        () => async (res) => {
                          const data = await res.json();
                          if (data.errors) {
                            return alert(data.errors);
                          }
                          // setErrors2()
                        }
                      );
                      setNewComment("");
                    }}
                    className="add-comment-form"
                  >
                    <div className="input-comment-bar-container">
                      {/* {(photoId = photo.id)} */}
                      <input
                        className="input-comment-bar"
                        type="text"
                        placeholder="Add a comment ..."
                        value={newComment}
                        onChange={(e) => {
                          setNewComment(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <button type="submit">Add Comment</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
