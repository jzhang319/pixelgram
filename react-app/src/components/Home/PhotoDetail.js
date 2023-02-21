import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import * as photoActions from "../../store/photo";
import * as commentActions from "../../store/comment";
// import EditPhotoFormModal from "../EditPhotoFormModal";
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

  // console.log(user.id, " <--- user");

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const [newComment, setNewComment] = useState("");
  // const [errors2, setErrors2] = useState([]);

  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };

  const addComment = (e) => {
    e.preventDefault();

    const data = {
      comment: newComment,
      photo_id: photoId,
      user_id: user.id,
    };
    dispatch(commentActions.addTheComment(data)).then(() => async (res) => {
      const data = await res.json();
      if (data.errors) {
        return alert(data.errors);
      }
      // setErrors2()
    });
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

    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, photoId, showMenu]);

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
            <i className="fa-solid fa-heart"></i>{" "}
            <i className="fa-solid fa-comment"></i>
            {user?.id === currPhoto.user_id && (
              <>
                <OpenModalButton
                  buttonText="Edit Caption"
                  onItemClick={closeMenu}
                  modalComponent={<EditPhotoForm />}
                />
                <button onClick={handleDeletePhoto}>DELETE POST</button>
              </>
            )}
          </div>
          {currPhoto?.user?.username}
          <div className="photo-caption">{currPhoto.caption}</div>
          <div className="comments-section">
            {comments.map((comment) => {
              return (
                <div key={comment.id} className="each-comment">
                  <img
                    className="each-comment-profile-pic"
                    src={comment?.user?.profile_url}
                  ></img>
                  <div className="each-comment-username">
                    {comment.user?.username}
                  </div>
                  <div className="each-comment-comment">
                    {comment.comment}
                    {comment.user_id === user.id && (
                      <OpenModalButton
                        buttonText="edit comment"
                        onItemClick={closeMenu}
                        modalComponent={<EditCommentForm id={comment.id} />}
                      />
                    )}
                    {comment.user_id === user.id && (
                      <button
                        onClick={() => {
                          dispatch(commentActions.deleteTheComment(comment.id));
                        }}
                      >
                        DELETE COMMENT
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={addComment} className="add-comment-form">
            {/* add comment form here */}
            <div>
              <input
                type="text"
                placeholder="Comment here"
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                cols={60}
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
          <div className="photo-like-comment-section">
            <i className="fa-solid fa-heart"></i>{" "}
            <i className="fa-solid fa-comment"></i>
          </div>
          {currPhoto?.user?.username}
          <div className="photo-caption">{currPhoto.caption}</div>
          <div className="comments-section">
            {comments.map((comment) => {
              return (
                <div key={comment.id} className="each-comment">
                  <img
                    className="each-comment-profile-pic"
                    src={comment.user.profile_url}
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
