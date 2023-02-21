import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
import "./EditPhotoFormModal.css";
import * as photoActions from "../../store/photo";
import { useModal } from "../../context/Modal";
// import { useModal } from "../../context/Modal";

function EditPhotoForm() {
  // const { photoId } = useParams();
  const dispatch = useDispatch();

  const photo = useSelector((state) => state.photo);
  // console.log(photo, " <---- inside edit form");

  const [caption, setCaption] = useState(photo.caption);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const err = [];

  useEffect(() => {
    if (photo.caption.length < 1)
      err.push("Caption must be at least 1 character long");
  }, [caption, err, photo.caption.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      photoActions.editThePhoto({
        id: photo.id,
        caption: caption,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.error) setErrors(data.error);
    });
    closeModal();
    // setShowModal(false);
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
        <div className="detailphoto-img-box">
          <img className="img-itself" src={photo.url} alt={photo.caption} />
        </div>
        <label>Update Caption</label>
        <input
          type="text"
          value={caption}
          size="47"
          onChange={(e) => setCaption(e.target.value)}
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

export default EditPhotoForm;
