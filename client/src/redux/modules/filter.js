const SET_FILTER_VALUE = 'SET_FILTER_VALUE';
const RESET_TAGS = 'RESET_TAGS';

export const setFilterValue = filterValue => ({
    type: SET_FILTER_VALUE,
    payload: filterValue,
});

export const resetTags = () => ({
    type: RESET_TAGS,
});

// REDUCER
export default (
    state = {
        tagsList: [
            { tagid: 1, title: 'Household Items' },
            { tagid: 2, title: 'Tools' },
            { tagid: 3, title: 'Electronics' },
            { tagid: 4, title: 'Musical Instruments' },
            { tagid: 5, title: 'Physical Media' },
            { tagid: 6, title: 'Recreational Equipment' },
            { tagid: 7, title: 'Sporting Goods' },
        ],
        tagsSelected: [],
    },
    action,
) => {
    switch (action.type) {
    case SET_FILTER_VALUE: {
        return { ...state, tagsSelected: [...action.payload] };
    }
    case RESET_TAGS: {
        return { ...state, tagsSelected: [] };
    }
    default:
        return state;
    }
};
