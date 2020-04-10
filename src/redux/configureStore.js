import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Articles } from './articles';
import { HtmlArticles } from './articleshtml';
import { JavaArticles } from './articlesjava';
import { Comments } from './comments';
import { createForms } from 'react-redux-form';
import { InitialCommentForm } from './forms';


export const ConfigureStore=()=>
{
    const store=createStore(combineReducers({articles:Articles,articlesjava:JavaArticles,articleshtml:HtmlArticles,comments:Comments,...createForms({addcommentform:InitialCommentForm})}),applyMiddleware(thunk, logger));
    return store;
}