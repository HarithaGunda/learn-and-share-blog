import * as ActionTypes from './ActionTypes';

export const JavaArticles = (state = {
    isLoading: true,
    errMess: null,
    articlesjava: []
}, action) => {
switch (action.type) {
    case ActionTypes.ADD_ARTICLESJAVA:
        return {...state, isLoading: false, errMess: null, articlesjava: action.payload};
    case ActionTypes.ARTICLESJAVA_LOADING:
        return {...state, isLoading: true, errMess: null, articlesjava: []};
    case ActionTypes.ARTICLESJAVA_FAILED:
        return {...state, isLoading: false, errMess: action.payload};
    default:
        return state;
}
};