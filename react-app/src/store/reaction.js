const GET_REACTIONS = "GET_REACTIONS";
const getReactions = (reactions) => {
  return {
    type: GET_REACTIONS,
    reactions,
  };
};

export const getTheReactions = () => async (dispatch) => {
  const response = await fetch("/api/reactions/");

  if (response.ok) {
    const data = await response.json();
    dispatch(getReactions(data));
    return data;
  } else {
    return { message: "reaction not found" };
  }
};

let initialState = {};

const reactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REACTIONS: {
      console.log(action.reactions, " <----- reaction reducer");
      const allReactions = [];
      action.reactions.reactions.forEach((reaction) => {
        console.log(reaction, " <--- reaction inside reducer forEach");
        allReactions[reaction.id] = reaction;
      });
      return { ...allReactions };
    }
    default:
      return state;
  }
};

export default reactionReducer;
