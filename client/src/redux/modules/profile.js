//ACTIONS

const GET_PROFILE_LOADING = "GET_PROFILE_LOADING";
const GET_PROFILE = "GET_PROFILE";
const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";

//ACTION CREATORS
const getProfileLoading = () => ({
  type: GET_PROFILE_LOADING
});

const getProfile = items => ({
  type: GET_PROFILE,
  payload: items
});

const getProfileError = error => ({
  type: GET_PROFILE_ERROR,
  payload: error
});

// const ITEMS_URL = "http://localhost:3001/items/?itemowner=${userid}";
const USERS_URL = "http://localhost:3001/users";

// ASYNC ACTION CREATOR
// const items = fetch(ITEMS_URL).then(r => r.json());
// const users = fetch(USERS_URL).then(r => r.json());

export const fetchProfile = userid => dispatch => {
  dispatch(getProfileLoading());

  return Promise.all(
    [`http://localhost:3001/items/?itemowner=${userid}`, USERS_URL].map(url =>
      fetch(url).then(response => response.json())
    )
  )
    .then(response => {
      const [itemsList, usersList] = response;

      const combined = itemsList.map(item => {
        item.itemowner = usersList.find(user => user.id === item.itemowner);

        item.borrower
          ? (item.borrower = usersList.find(user => user.id === item.borrower))
          : "error";

        return item;
      });
      dispatch(getProfile(combined));
    })
    .catch(error => dispatch(getProfileError(error)));
};
// REDUCER

export default (
  state = {
    isLoading: false,
    items: [],
    profile: [],
    user: [],
    error: ""
  },
  action
) => {
  switch (action.type) {
    case GET_PROFILE_LOADING: {
      return { ...state, isLoading: true, error: "" };
    }
    case GET_PROFILE: {
      return { ...state, isLoading: false, items: action.payload, error: "" };
    }

    case GET_PROFILE_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
