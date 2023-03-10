import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import * as photoActions from "../../store/photo";
import * as commentActions from "../../store/comment";
import * as reactionActions from "../../store/reaction";
import * as followerActions from "../../store/follower";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import EditPhotoForm from "../EditPhotoFormModal/EditPhotoForm";
import EditCommentForm from "../EditCommentFormModal";

function PhotoDetail() {
  const { photoId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const comments = useSelector((state) => Object.values(state.comment));
  const currPhoto = useSelector((state) => state.photo);
  const user = useSelector((state) => state.session.user);
  const userReacted = useSelector((state) => state.photo.user_reacted);

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e) => {
    e.preventDefault();

    const data = {
      comment: newComment,
      photo_id: photoId,
      user_id: user.id,
    };
    if (newComment === "") {
      return alert("Please enter a comment");
    }
    dispatch(commentActions.addTheComment(data)).then(() => async (res) => {
      const data = await res.json();
      if (data.errors) {
        return alert(data.errors);
      }
    });
    setNewComment("");
  };

  const handleDeletePhoto = async (e) => {
    e.preventDefault();
    dispatch(photoActions.deleteThePhoto(photoId)).then(() =>
      history.push("/")
    );
  };

  useEffect(() => {
    dispatch(photoActions.getThePhoto(photoId));
    dispatch(commentActions.getTheComments(photoId));
    dispatch(reactionActions.getTheReaction(photoId));

    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, photoId, showMenu, comments.id]);

  const closeMenu = () => setShowMenu(false);

  let content = null;

  if (user?.id) {
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
            <div className="heart-follow-container">
              {userReacted?.includes(user.id) ? (
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      reactionActions.postTheReaction(currPhoto.id, user.id)
                    )
                      .then(() => dispatch(photoActions.getThePhoto(photoId)))
                      .then(() =>
                        dispatch(reactionActions.getTheReaction(currPhoto.id))
                      );
                  }}
                  className="fa-solid fa-heart liked-icon"
                ></i>
              ) : (
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      reactionActions.postTheReaction(currPhoto.id, user.id)
                    )
                      .then(() => dispatch(photoActions.getThePhoto(photoId)))
                      .then(() =>
                        dispatch(reactionActions.getTheReaction(currPhoto.id))
                      );
                  }}
                  className="fa-solid fa-heart like-icon"
                ></i>
              )}

              {user?.id !== currPhoto?.user_id && user ? (
                <div
                  className="follow-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(
                      followerActions.addTheFollower(currPhoto.user_id, user.id)
                    )
                      .then(() =>
                        dispatch(followerActions.getTheAllFollowers())
                      )
                      .then(() => dispatch(sessionActions.authenticate()));
                  }}
                >
                  {user.user_followings?.includes(currPhoto.user_id) ? (
                    <div className="following">Following</div>
                  ) : (
                    <div className="not-follow">Follow</div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>

            {currPhoto?.reaction_length > 0 && (
              <div className="number-likes-section">
                {currPhoto.reaction_length} likes
              </div>
            )}
            {user?.id === currPhoto.user_id && (
              <div className="edit-delete-container">
                <OpenModalButton
                  buttonText="Edit Caption"
                  onItemClick={closeMenu}
                  modalComponent={<EditPhotoForm />}
                />
                <div className="modal-divs" onClick={handleDeletePhoto}>
                  Delete Post
                </div>
              </div>
            )}
          </div>
          <div className="photo-caption">Caption: {currPhoto.caption}</div>
          <div className="comments-section">
            {comments.map((comment) => {
              return (
                <div key={comment.id} className="each-comment">
                  <img
                    className="each-comment-profile-pic"
                    src={comment?.user?.profile_url}
                    alt={comment?.id}
                  ></img>
                  <div className="each-comment-username">
                    {comment.user?.username}
                  </div>
                  <div className="each-comment-button-container">
                    <div className="each-comment-comment">
                      {comment.comment}
                    </div>
                    <div className="each-comment-buttons">
                      {comment.user_id === user.id && (
                        <OpenModalButton
                          buttonText="Edit comment"
                          onItemClick={closeMenu}
                          modalComponent={<EditCommentForm id={comment.id} />}
                        />
                      )}
                      {comment.user_id === user.id && (
                        <div
                          className="modal-divs"
                          onClick={() => {
                            dispatch(
                              commentActions.deleteTheComment(comment.id)
                            );
                          }}
                        >
                          Delete Comment
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleAddComment} className="add-comment-form">
            <div className="input-comment-bar-container">
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
        </div>
      </div>
    ) : (
      <></>
    );
  } else {
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
          <div className="photo-like-comment-section"></div>
          {currPhoto?.user?.username}
          <div className="photo-caption">{currPhoto.caption}</div>
          <div className="reaction-count">
            {currPhoto?.reaction_length > 0 && (
              <div className="number-likes-section">
                {currPhoto.reaction_length} likes
              </div>
            )}
          </div>
          <div className="comments-section">
            {comments.map((comment) => {
              return (
                <div key={comment.id} className="each-comment">
                  <img
                    className="each-comment-profile-pic"
                    src={comment.user.profile_url}
                    alt={comment.id}
                  ></img>
                  <div className="each-comment-username">
                    {comment.user.username}
                  </div>
                  <div className="each-comment-comment">{comment.comment}</div>
                </div>
              );
            })}
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
