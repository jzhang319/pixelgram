const GET_PHOTOS = "GET_PHOTOS";

const getPhotos = (photos) => {
  return {
    type: GET_PHOTOS,
    photos,
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
    default:
      return state;
  }
};

export default photoReducer;
