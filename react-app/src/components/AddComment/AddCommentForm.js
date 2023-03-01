import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import * as commentActions from '../../store/comment'


function AddCommentForm({photo, user}) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('')

  return (
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
        dispatch(commentActions.addTheComment(data)).then(() => async (res) => {
          const data = await res.json();
          if (data.errors) {
            return alert(data.errors);
          }
          // setErrors2()
        });
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
  );
}

export default AddCommentForm
