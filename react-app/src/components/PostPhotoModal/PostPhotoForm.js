import React, { useState } from "react";
import "./PostPhotoModal.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as photoActions from "../../store/photo";
import * as sessionActions from "../../store/session";
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
    )
      .then(() => dispatch(sessionActions.authenticate()))
      .then(async (res) => {
        const data = await res;
        if (data && data.errors) {
          const newErrors = res.errors.map((ele) => {
            if (ele.includes("url")) {
              return ele.slice(ele.indexOf(":") + 2);
              // return ele
            }
            return (
              ele.slice(0, ele.indexOf(":")) + ele.slice(ele.indexOf(":") + 7)
            );
          });
          setErrors(newErrors);
        } else {
          history.push("/");
          closeModal();
        }
      });
  };

  return (
    <form className="post-form-container" onSubmit={handleSubmit}>
      {/* <div className="login_logo">
        <h1 className="login_pixel">Pixel</h1>
        <h1 className="login_gram">
          <em>gram</em>
        </h1>
      </div> */}
      <img
        className="logo"
        src="https://cdn.discordapp.com/attachments/885032629299212308/1078464745935482910/687474703a2f2f7265732e636c6f7564696e6172792e636f6d2f616e6e616f682f696d6167652f75706c6f61642f635f63726f702c685f3337352c775f3936352c785f34352f76313531323136373130302f4c6f676f6d616b725f3264746e65305f6668756574692e706e67.png"
        alt="logo"
      />
      <div className="post-form-elements">
        {/* <div className="login_logo">
          <h1 className="login_pixel">Pixel</h1>
          <h1 className="login_gram">
            <em>gram</em>
          </h1>
        </div> */}
        <h2 className="post-form-h2">Post a Photo</h2>
        <div className="err-container">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <label className="post-form-label">
          URL
          <input
            type="text"
            value={url}
            placeholder="enter URL here ..."
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <i className="fa-solid fa-image"></i>
        </label>
        <label className="post-form-label">
          Caption
          <input
            type="text"
            value={caption}
            placeholder="enter caption here..."
            onChange={(e) => setCaption(e.target.value)}
            required
          />
          <i className="fa-solid fa-message"></i>
        </label>
        <div className="post-button-section">
          <button className="post-button">POST PHOTO</button>
        </div>
      </div>
    </form>
  );
}

export default PostPhotoForm;
