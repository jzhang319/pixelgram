const GET_REACTIONS = "GET_REACTIONS";
const getReactions = (reactions) => {
  return {
    type: GET_REACTIONS,
    reactions,
  };
};

const GET_REACTION_COUNT = "GET_REACTION_COUNT";
const getReactionCount = (reactionCount) => {
  return {
    type: GET_REACTION_COUNT,
    reactionCount,
  };
};

const POST_REACTION = "POST_REACTION";
const postReaction = (reaction) => {
  return {
    type: POST_REACTION,
    reaction,
  };
};

export const postTheReaction = (id, userId) => async (dispatch) => {
  // console.log(id, ' <---- from the thunk')
  // console.log(userId, ' <---- from the thunk')
  const response = await fetch(`/api/reactions/photos/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      photo_id: id,
      user_id: userId,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(postReaction(data));
    return data;
  }
};

export const getTheReactionCount = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/reactions/photos/${photoId}/count`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getReactionCount(data));
    return data;
  }
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
      // console.log(action.reactions, " <----- reaction reducer");
      const allReactions = [];
      action.reactions.reactions.forEach((reaction) => {
        // console.log(reaction, " <--- reaction inside reducer forEach");
        allReactions[reaction.id] = reaction;
      });
      return { ...allReactions };
    }
    case GET_REACTION_COUNT: {
      // console.log(action.reactionCount.reaction.length, " <----- reaction reducer");
      // const allReactions = [];
      // action.reactionCount.reactions.forEach((reaction) => {
      //   // console.log(reaction, " <--- reaction inside reducer forEach");
      //   allReactions[reaction.id] = reaction;
      // });
      return [action.reactionCount.reaction.length];
    }
    case POST_REACTION: {
      console.log(action.reaction, " <----- reaction reducer");
      return {
        ...state,
        [action.reaction.id]: action.reaction,
      };
    }
    default:
      return state;
  }
};

export default reactionReducer;
