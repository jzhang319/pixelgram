import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as commentActions from "../../store/comment";
import "./EditCommentFormModal.css";

function EditCommentForm({ id }) {
  const dispatch = useDispatch();
  // const history = useHistory();
  const comments = useSelector((state) => state.comment);

  // console.log(id, " <-- from props");
  // console.log(typeof id);
  // console.log(comments[id], " <---- comment modal");

  const [comment, setComment] = useState(comments[id].comment);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      commentActions.putTheComment({
        id,
        comment,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.error) setErrors(data.error);
    });
    // history.push(`/photos/${id}`);
    closeModal();
  };

  return (
    <form className="edit-photo-form" onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="update-form-elements">
        {/* <img
          className="edit-form-logo"
          src="https://cdn.discordapp.com/attachments/885032629299212308/1235692494579306618/hzz6PR0vetwiRIlSpQoUaJEiRIlSpQoUaJEiRIF0f8B77LBY6DhZLoAAAAASUVORK5CYII.png?ex=66354bd0&is=6633fa50&hm=ad27efd653edee7939f1b5c56970313ce5414d595c54ffc65c7b57c46771652f&"
          alt="logo"
        /> */}
        <div className="edit-form-title">Edit Comment</div>
        <div className="update-comment-section">
          <label>Update Comment</label>
          <input
            type="text"
            value={comment}
            size="40"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="update-button-container">
          <button className="update-btn" type="submit">
            Apply
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditCommentForm;
