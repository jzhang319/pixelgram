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
  const [newComment, setNewComment] = useState("");

  const allPhotos = useSelector((state) =>
    Object.values(state.photo).sort((a, b) => b.id - a.id)
  );
  // console.log(allPhotos, " <--- allPhotos");

  const allComments = useSelector((state) => Object.values(state.comment));
  // console.log(allComments, " <--- allComments here");

  const allReactions = useSelector((state) => Object.values(state.reaction));
  // console.log(allReactions, " <--- allReactions here");

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(photoActions.getThePhotos());
    dispatch(commentActions.getTheAllComments());
    dispatch(reactionActions.getTheReactions());
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
                  {user?.id === photo?.user_id ? (
                    <button className="photo-btn">Edit Photo</button>
                  ) : (
                    <button className="photo-btn">Comment Photo</button>
                  )}
                </div>
              </NavLink>
              {/* <div className="photo-like-comment-section">
                <i className="fa-solid fa-heart"></i>{" "}
                <i className="fa-solid fa-comment"></i>
              </div> */}
              {/* {photo?.user?.username} */}
              <div className="reaction-container">
                {allReactions.map((reaction) => {
                  if (reaction.photo_id === photo.id) {
                    liked++;
                  }
                  return liked;
                })}
              </div>
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
