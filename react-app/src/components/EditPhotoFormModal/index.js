import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../context/Modal";
import * as photoActions from "../../store/photo";
import { useHistory, useParams } from "react-router-dom";
import EditPhotoForm from "./EditPhotoForm";

function EditPhotoFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();

  console.log(photoId, " <---- id from index");

  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(photoActions.deleteThePhoto(photoId))
      .then(() => setShowModal(false))
      .then(() => history.push("/"));
  };

  return (
    <>
      <button className="edit-form-button" onClick={() => setShowModal(true)}>
        Edit Caption
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPhotoForm setShowModal={setShowModal} />
        </Modal>
      )}
      <button className="delete-button" onClick={handleDelete}>
        Delete Photo
      </button>
    </>
  );
}

export default EditPhotoFormModal;
