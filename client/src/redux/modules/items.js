// ACTIONS

const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

// ACTION CREATORS
const getItemsLoading = () => ({
    type: GET_ITEMS_LOADING,
});

const getItems = items => ({
    type: GET_ITEMS,
    payload: items,
});

const getItemsError = error => ({
    type: GET_ITEMS_ERROR,
    payload: error,
});

const ITEMS_URL = 'http://localhost:4000/items';
const USERS_URL = 'http://localhost:4000/users';

// ASYNC ACTION CREATOR

export const fetchItemsAndUsers = () => dispatch => {
    dispatch(getItemsLoading());

    return Promise.all(
        [ITEMS_URL, USERS_URL].map(url =>
            fetch(url).then(response => response.json()),
        ),
    )
        .then(response => {
            const [itemsList, usersList] = response;

            const combined = itemsList.map(item => {
                item.itemowner = usersList.find(
                    user => user.id === item.itemowner,
                );

                // item.borrower
                //     ? (item.borrower = usersList.find(
                //         user => user.id === item.borrower,
                //     ))
                //     : 'error';

                return item;
            });
            dispatch(getItems(combined));
        })
        .catch(error => dispatch(getItemsError(error)));
};
// REDUCER

export default (
    state = {
        isLoading: false,
        items: [],
        error: '',
    },
    action,
) => {
    switch (action.type) {
    case GET_ITEMS_LOADING: {
        return { ...state, isLoading: true, error: '' };
    }
    case GET_ITEMS: {
        return {
            ...state,
            isLoading: false,
            items: action.payload,
            error: '',
        };
    }
    case GET_ITEMS_ERROR: {
        return { ...state, isLoading: false, error: action.payload };
    }
    default:
        return state;
    }
};
