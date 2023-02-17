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

export const getThePhotos = () => async (dispatch) => {
  const response = await fetch("/api/photos/");

  if (response.ok) {
    const data = await response.json();
    // console.log(data, " <--- from thunk");
    dispatch(getPhotos(data));
    return data;
  }
};

export const getThePhoto = (id) => async (dispatch) => {
  const response = await fetch(`/api/photos/${id}/`);

  if (response.ok) {
    const data = await response.json();
    // console.log(data, " <--- from thunk");
    dispatch(getPhoto(data));
    return data;
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
      const newState = {};
      newState.photo = action.photo;
      return newState;
    }
    default:
      return state;
  }
};

export default photoReducer;
