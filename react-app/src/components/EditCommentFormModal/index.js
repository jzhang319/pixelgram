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
        <img
          className="logo"
          src="https://cdn.discordapp.com/attachments/885032629299212308/1078464745935482910/687474703a2f2f7265732e636c6f7564696e6172792e636f6d2f616e6e616f682f696d6167652f75706c6f61642f635f63726f702c685f3337352c775f3936352c785f34352f76313531323136373130302f4c6f676f6d616b725f3264746e65305f6668756574692e706e67.png"
          alt="logo"
        />
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
