import * as ActionTypes from './ActionTypes';

export const HtmlArticles = (state = {
    isLoading: true,
    errMess: null,
    articleshtml: []
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_ARTICLESHTML:
        return {...state, isLoading: false, errMess: null, articleshtml: action.payload};
    case ActionTypes.ARTICLESHTML_LOADING:
        return {...state, isLoading: true, errMess: null, articleshtml: []};
    case ActionTypes.ARTICLESHTML_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};