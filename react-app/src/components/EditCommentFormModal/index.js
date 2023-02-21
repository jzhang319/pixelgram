import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentActions from "../../store/comment";
import "./EditCommentFormModal.css";

function EditCommentForm({ id }) {
  const dispatch = useDispatch();
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
        <label>Update Comment</label>
        <input
          type="text"
          value={comment}
          size="40"
          onChange={(e) => setComment(e.target.value)}
        />
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
