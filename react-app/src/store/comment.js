const GET_COMMENTS = "GET_COMMENTS";
const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

export const getTheComments = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${photoId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(getComments(data));
    return data;
  }
};

let initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS: {
      const allComments = [];
      action.comments.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return { ...allComments };
    }
    default:
      return state;
  }
};

export default commentReducer;
