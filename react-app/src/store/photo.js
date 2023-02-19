const GET_PHOTOS = "GET_PHOTOS";

const getPhotos = (photos) => {
  return {
    type: GET_PHOTOS,
    photos,
  };
};

const GET_PHOTO = "GET_PHOTO";

const getPhoto = (photo) => {
  return {
    type: GET_PHOTO,
    photo,
  };
};

const EDIT_PHOTO = "EDIT_PHOTO";

const editPhoto = (photo) => {
  return {
    type: EDIT_PHOTO,
    photo,
  };
};

const DELETE_PHOTO = "DELETE_PHOTO";

const deletePhoto = (photoId) => {
  return {
    type: DELETE_PHOTO,
    id: photoId,
  };
};

const ADD_PHOTO = "ADD_PHOTO";

const addPhoto = (photo) => {
  return {
    type: ADD_PHOTO,
    photo,
  };
};

export const addThePhoto = (photo) => async (dispatch) => {
  const { url, caption, username, created_at, updated_at, user_id } = photo;

  const response = await fetch("/api/photos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      caption,
      username,
      created_at,
      updated_at,
      user_id,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    dispatch(addPhoto(data));
    return data;
  } else {
    return data;
  }
};

export const deleteThePhoto = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deletePhoto(photoId));
    return data;
  }
};

export const editThePhoto = (photoData, photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(photoData),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editPhoto(data, photoId));
    return data;
  }
};

export const getThePhotos = () => async (dispatch) => {
  const response = await fetch("/api/photos/");

  if (response.ok) {
    const data = await response.json();
    // console.log(data, " <--- from thunk");
    dispatch(getPhotos(data));
    return data;
  }
};

export const getThePhoto = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`);
  // console.log(photoId, " <---- id from thunk");
  // console.log(response, " <---- from thunk");
  if (response.ok) {
    const data = await response.json();
    // console.log(data, " <--- from thunk");
    dispatch(getPhoto(data));
    return response;
  } else {
    return { message: "Photo not found" };
  }
};

let initialState = {};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS: {
      const allPhotos = [];
      // console.log(action.type, " <--before forEach");
      action.photos.photos.forEach((photo) => {
        // console.log(photo, " <-- inside reducer");
        allPhotos[photo.id] = photo;
      });
      return { ...allPhotos };
    }
    case GET_PHOTO: {
      const newState = {
        ...action.photo,
      };
      return newState;
    }
    case EDIT_PHOTO: {
      const newState = {
        ...state,
        ...action.photo,
      };
      return newState;
    }
    case DELETE_PHOTO: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
};

export default photoReducer;
