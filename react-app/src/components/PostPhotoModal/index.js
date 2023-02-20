import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "../../context/Modal";
import PostPhotoForm from "./PostPhotoForm";

function PostPhotoModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        <i className="fa-solid fa-plus"></i>
        Create Post
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <PostPhotoForm setShowModal={setShowModal} />
          </Modal>
        )}
      </button>
    </div>
  );
}

export default PostPhotoModal;
