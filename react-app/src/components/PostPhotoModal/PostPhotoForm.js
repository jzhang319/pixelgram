import React, { useState } from "react";
import "./PostPhotoModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as photoActions from "../../store/photo";
import { useModal } from "../../context/Modal";

function PostPhotoForm({ setShowModal }) {
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [url, setUrl] = useState("");
  const [caption, setCaption] = useState("");

  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      photoActions.addThePhoto({
        url: url,
        caption: caption,
        user_id: user.id,
      })
    ).then(() => history.push("/"));
    // .then(() => setShowModal(false));
    // .catch(async (res) => {
    //   const data = await res.json();
    //   if (data && data.errors) setErrors(data.errors);
    // });
    closeModal();
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
      {/* <div className="login_logo">
          <h1 className="login_pixel">Pixel</h1>
          <h1 className="login_gram">
            <em>gram</em>
          </h1>
        </div> */}
      <div className="post-form-elements">
        {/* <div className="login_logo">
          <h1 className="login_pixel">Pixel</h1>
          <h1 className="login_gram">
            <em>gram</em>
          </h1>
        </div> */}
        <h2 className="post-form-h2">Post a Photo</h2>
        <label className="post-form-label">
          URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label className="post-form-label">
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
