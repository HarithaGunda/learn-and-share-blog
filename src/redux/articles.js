import * as ActionTypes from './ActionTypes';

export const Articles=(state={
    isLoading: true,
    errMess: null,
    articles: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_ARTICLES:
            return {...state, isLoading: false, errMess: null, articles: action.payload};
        case ActionTypes.ARTICLES_LOADING:
            return {...state, isLoading: true, errMess: null, articles: []};
        case ActionTypes.ARTICLES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.UPDATE_ARTICLE:
            return {...state, errMess: null, articles: state.articles.map(article => article.id===action.payload.id? action.payload:article)};
        default:
            return state;
    }
};