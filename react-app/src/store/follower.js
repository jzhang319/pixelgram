const GET_FOLLOWERS = "GET_FOLLOWERS";
const getAllFollowers = (followers) => {
  return {
    type: GET_FOLLOWERS,
    followers,
  };
};

const ADD_FOLLOWER = "ADD_FOLLOWER";
const addFollower = (follower) => {
  return {
    type: ADD_FOLLOWER,
    follower,
  };
};

export const addTheFollower = (id, userId) => async (dispatch) => {
  // console.log(id, " <---- id from thunk");
  // console.log(userId, "<---- userId from thunk");
  const response = await fetch(`/api/followers/users/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: id,
      follower_id: userId,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(addFollower(data));
    return data;
  }
};

export const getTheAllFollowers = () => async (dispatch) => {
  const response = await fetch("/api/followers/");

  if (response.ok) {
    const allFollowers = await response.json();
    // console.log(allFollowers, " <---- from thunk");
    dispatch(getAllFollowers(allFollowers));
  } else {
    return { message: "followers not found" };
  }
};

let initialState = {};

const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS: {
      // console.log(action.followers, " <---- from follower reducer");
      const allFollowings = [];
      action.followers?.followers?.forEach((follower) => {
        allFollowings.push(follower);
      });
      return { ...allFollowings };
    }
    case ADD_FOLLOWER: {
      // console.log(action.follower.message, " <---- from follower reducer");
      const newState = {
        ...state,
        [action.follower.id]: { ...action.follower },
      };
      return newState;
    }
    default:
      return state;
  }
};

export default followerReducer;
