const GET_COMMENTS = "GET_COMMENTS";
const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  };
};

const ADD_COMMENT = "ADD_COMMENT";
const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment,
  };
};

const DELETE_COMMENT = "DELETE_COMMENT";
const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id,
  };
};

const PUT_COMMENT = "PUT_COMMENT";
const putComment = (comment) => {
  return {
    type: PUT_COMMENT,
    comment,
  };
};

export const putTheComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(putComment(data));
    return data;
  }
};

export const deleteTheComment = (id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(id));
    return data;
  }
};

export const addTheComment = (comment) => async (dispatch) => {
  const response = await fetch(`/api/comments/${comment.photo_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addComment(data));
    return data;
  }
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
    case ADD_COMMENT: {
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    }
    case DELETE_COMMENT: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case PUT_COMMENT: {
      const newState = {
        ...state,
        ...action.comment,
      };
      return newState;
    }
    default:
      return state;
  }
};

export default commentReducer;
