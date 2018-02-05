const SET_FILTER_VALUE = 'SET_FILTER_VALUE';

export const setFilterValue = filterValue => ({
    type: SET_FILTER_VALUE,
    payload: filterValue,
});

// REDUCER
export default (
    state = {
        filters: [
            { tagid: 1, title: 'Household Items' },
            { tagid: 2, title: 'Electronics' },
            { tagid: 3, title: 'Tools' },
            { tagid: 4, title: 'Musical Instruments' },
            { tagid: 5, title: 'Physical Media' },
            { tagid: 6, title: 'Recreational Equipment' },
            { tagid: 7, title: 'Sporting Goods' },
        ],
        selectedFilters: [],
    },
    action,
) => {
    // console.log(action);
    // console.log(state);
    switch (action.type) {
    case SET_FILTER_VALUE: {
        return { ...state, selectedFilters: [...action.payload] };
    }
    default:
        return state;
    }
};
