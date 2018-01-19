//ACTIONS

const GET_USER_LOADING = "GET_USER_LOADING";
const GET_USER = "GET_USER";
const GET_USER_ERROR = "GET_USER_ERROR";
const GET_PROFILE = "GET_PROFILE";

//ACTION CREATORS
const getUserLoading = () => ({
  type: GET_ITEMS_LOADING
});

const getUser = user => ({
  type: GET_USERS,
  payload: user
});

const getUserError = error => ({
  type: GET_USER_ERROR,
  payload: error
});

const ITEMS_URL = "http://localhost:3001/items";
const USERS_URL = "http://localhost:3001/users";

// ASYNC ACTION CREATOR
const items = fetch(ITEMS_URL).then(r => r.json());
const users = fetch(USERS_URL).then(r => r.json());

export const fetchItemsAndUsers = () => dispatch => {
  dispatch(getItemsLoading());

  return Promise.all(
    [ITEMS_URL, USERS_URL].map(url =>
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
      dispatch(getUser(combined));
    })
    .catch(error => dispatch(getUserError(error)));
};
// REDUCER

export default (
  state = {
    isLoading: false,
    user: [],
    error: ""
  },
  action
) => {
  switch (action.type) {
    case GET_USER_LOADING: {
      return { ...state, isLoading: true, error: "" };
    }
    case GET_USER: {
      return { ...state, isLoading: false, user: action.payload, error: "" };
    }
    case GET_USER_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }
    default:
      return state;
  }
};
