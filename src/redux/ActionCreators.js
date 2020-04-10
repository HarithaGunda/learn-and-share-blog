import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchArticles=() => dispatch => {
    dispatch(articlesLoading());
    return fetch(baseUrl+'articles')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error=new Error(`Error ${response.status}: ${response.statusText}`);
                error.response=response;
                throw error;
            }
        },
            error => {
                const errMess=new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(articles => dispatch(addArticles(articles)))
        .catch(error => dispatch(articlesFailed(error.message)));
};

export const articlesLoading=() => ({
    type: ActionTypes.ARTICLES_LOADING
});

export const articlesFailed=errMess => ({
    type: ActionTypes.ARTICLES_FAILED,
    payload: errMess
});

export const addArticles=articles => ({
    type: ActionTypes.ADD_ARTICLES,
    payload: articles
});

export const fetchJavaArticles=() => dispatch => {
    dispatch(articlesJavaLoading());
    return fetch(baseUrl+'articlesjava')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error=new Error(`Error ${response.status}: ${response.statusText}`);
                error.response=response;
                throw error;
            }
        },
            error => {
                const errMess=new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(articlesjava => dispatch(addJavaArticles(articlesjava)))
        .catch(error => dispatch(articlesJavaFailed(error.message)));
};

export const articlesJavaLoading=() => ({
    type: ActionTypes.ARTICLESJAVA_LOADING
});

export const articlesJavaFailed=errMess => ({
    type: ActionTypes.ARTICLESJAVA_FAILED,
    payload: errMess
});

export const addJavaArticles=articlesjava => ({
    type: ActionTypes.ADD_ARTICLESJAVA,
    payload: articlesjava
});


export const fetchHtmlArticles=() => dispatch => {
    dispatch(articlesHtmlLoading());
    return fetch(baseUrl+'articleshtml')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error=new Error(`Error ${response.status}: ${response.statusText}`);
                error.response=response;
                throw error;
            }
        },
            error => {
                const errMess=new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(articleshtml => dispatch(addHtmlArticles(articleshtml)))
        .catch(error => dispatch(articlesHtmlFailed(error.message)));
};

export const articlesHtmlLoading=() => ({
    type: ActionTypes.ARTICLESHTML_LOADING
});

export const articlesHtmlFailed=errMess => ({
    type: ActionTypes.ARTICLESHTML_FAILED,
    payload: errMess
});

export const addHtmlArticles=articleshtml => ({
    type: ActionTypes.ADD_ARTICLESHTML,
    payload: articleshtml
});

export const fetchComments=() => dispatch => {
    return fetch(baseUrl+'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error=new Error(`Error ${response.status}: ${response.statusText}`);
                error.response=response;
                throw error;
            }
        },
            error => {
                var errMess=new Error(error.message);
                throw errMess;
            }
        )
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};
export const commentsFailed=errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});
export const addComments=comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const addComment=comment => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment=(commentId, articleId, liked, likedCount, text, author) => dispatch => {


    const newComment={
        id: commentId,
        articleid: articleId,
        liked: liked,
        likedcount: likedCount,
        text: text,
        author: author,
        date: new Date().toISOString(),
        authorimg: 'images/default-profile.png',
        replied: false
    };

    return fetch(baseUrl+'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error=new Error(`Error ${response.status}: ${response.statusText}`);
                error.response=response;
                throw error;
            }
        },
            error => {throw error;}
        )
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => {
            console.log('post comment', error.message);
            alert('Your comment could not be posted\nError: '+error.message);
        });
};

export const updateLikeCount=(inputArr) => dispatch => {
    // return fetch(baseUrl+'comments?id='+commentId)
    //     .then(response => {
    //         if (response.ok) {
    //             return response;
    //         } else {
    //             const error=new Error(`Error ${response.status}: ${response.statusText}`);
    //             error.response=response;
    //             throw error;
    //         }
    //     },
    //         error => {
    //             var errMess=new Error(error.message);
    //             throw errMess;
    //         }
    //     )
    //     .then(response => response.json())
    //     .then(comment => {
    const inputJSON={
        liked: true,
        likedcount: inputArr[1]
    };
    return fetch(baseUrl+'comments/'+inputArr[0], {
        method: "PATCH",
        body: JSON.stringify(inputJSON),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response;
        } else {
            const error=new Error(`Error ${response.status}: ${response.statusText}`);
            error.response=response;
            throw error;
        }
    },
        error => {throw error;}
    )
        .then(response => response.json())
        .then(response => {
            dispatch(updateComment(response));
            dispatch(updateArticleTagCount(inputArr[3], inputArr[2]));
        })
        .catch(error => {
            console.log('Your like count  could not be updated \nError', error.message);
            alert('Your like count  could not be updated\nError: ', error.message);
        });

};
export const updateComment=comment => ({
    type: ActionTypes.UPDATE_COMMENT,
    payload: comment
});

export const updateArticleTagCount=(articleid, tagcount) => dispatch => {
    const inputJSON={
        tagcount: tagcount
    };
    return fetch(baseUrl+'articles/'+articleid, {
        method: "PATCH",
        body: JSON.stringify(inputJSON),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            return response;
        } else {
            const error=new Error(`Error ${response.status}: ${response.statusText}`);
            error.response=response;
            throw error;
        }
    },
        error => {throw error;}
    )
        .then(response => response.json())
        .then(response => dispatch(updateArticle(response)))
        .catch(error => {
            console.log('Tagcount  could not be updated \nError', error.message);
            alert('Tagcount  could not be updated\nError: ', error.message);
        });
};

export const updateArticle=article => ({
    type: ActionTypes.UPDATE_ARTICLE,
    payload: article
});