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

export const getThePhoto = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}/`);
  // console.log(photoId, " <---- id from thunk");
  console.log(response, " <---- from thunk");
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
      // return {
      //   ...state,
      //   [action.photo.id]: action.photo,
      // };
      const newState = {
        ...action.photo,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default photoReducer;
