import React, { useState } from "react";
import "./PostPhotoModal.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as photoActions from "../../store/photo";

function PostPhotoForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      photoActions.addThePhoto({
        url,
        caption,
      })
    )
      .then(() => history.push("/"))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className="post-form-container" onSubmit={handleSubmit}>
      <div className="err-container">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>
      <div>
        <label>
          URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Caption
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </label>
        <div className="post-button-section">
          <button className="post-button">POST PHOTO</button>
        </div>
      </div>
    </form>
  );
}

export default PostPhotoForm;
