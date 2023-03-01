const GET_FOLLOWERS = "GET_FOLLOWERS";
const getFollowers = (followers) => {
  return {
    type: GET_FOLLOWERS,
    followers,
  };
};

const getTheFollowers = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/followers/users/${user_id}`);

  if (response.ok) {
    const allFollowers = await response.json();
    console.log(allFollowers, " <---- from thunk");
    dispatch(getFollowers(allFollowers));
  } else {
    return { message: "followers not found" };
  }
};

let initialState = {};

const followerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOLLOWERS: {
      console.log(action.followers, ' <---- from reducer');
      const allFollowers = [];
      action.followers.follower.forEach((follower) => {
        allFollowers.push(follower);
      });
      return { ...allFollowers };
    }
    default:
      return state;
  }
};

export default followerReducer;
