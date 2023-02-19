import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./EditPhotoFormModal.css";
import * as photoActions from "../../store/photo";

function EditPhotoForm({ setShowModal }) {
  const { photoId } = useParams();
  const dispatch = useDispatch();

  const photo = useSelector((state) => state.photo);

  const [caption, setCaption] = useState(photo.caption);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const err = [];

  useEffect(() => {
    if (caption.length < 1)
      err.push("Caption must be at least 1 character long");
  }, [caption]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    dispatch(
      photoActions.editThePhoto({
        caption: photo.caption,
      })
    )
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.error) setErrors(data.error);
      });
  };

  return (
    <form className="edit-photo-form" onSubmit={handleSubmit}>
      {hasSubmitted && errors.length > 0 && (
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
        <label>Update Caption</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
      </div>
    </form>
  );
}

export default EditPhotoForm;
