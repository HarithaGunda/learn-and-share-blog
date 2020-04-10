import React, { Component } from 'react';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import LoadArticles from './LoadArticlesComponent';
import Header from './HeaderComponent';
import ArticleInfo from './ArticleInfoComponent';
import { connect } from 'react-redux';
import { fetchArticles, fetchJavaArticles, fetchHtmlArticles, fetchComments, postComment,updateLikeCount} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        articles: state.articles,
        comments: state.comments,
        articlesjava: state.articlesjava,
        articleshtml:state.articleshtml
    };
};

const mapDispatchToProps = {

    fetchArticles: () => (fetchArticles()),
    fetchJavaArticles: () => (fetchJavaArticles()),
    fetchHtmlArticles: () => (fetchHtmlArticles()),
    fetchComments: () => (fetchComments()),
    resetAddCommentForm:()=>(actions.reset('addcommentform')),
    postComment: (sourceEventFrm,commentId,articleId, liked, likedCount, text,author) => (postComment(sourceEventFrm,commentId,articleId, liked, likedCount, text,author)),
    updateLikeCount: (commentId,likeCount) =>(updateLikeCount(commentId,likeCount))
};

class Main extends Component {

    componentDidMount() {
        this.props.fetchArticles();
        this.props.fetchJavaArticles();
        this.props.fetchHtmlArticles();
        this.props.fetchComments();
    }

  render() {

    const ArticleWithId= ({match}) => {
        return (
            <ArticleInfo 
                article={this.props.articles.articles.filter(article => article.id === +match.params.articleId)[0]} 
                comments={this.props.comments.comments.filter(comment => comment.articleid === +match.params.articleId)}
                commentslength={this.props.comments.comments.length}
                articlesjava={this.props.articlesjava.articlesjava.filter(articlejava =>articlejava.contentid === +match.params.articleId)[0]}
                articleshtml={this.props.articleshtml.articleshtml.filter(articlehtml =>articlehtml.contentid === +match.params.articleId)[0]}
                postComment={this.props.postComment}
                updateLikeCount={this.props.updateLikeCount}
                resetAddCommentForm={this.props.resetAddCommentForm}
            />
        );
    };    
      return (
          <div>
              <Header/>
              <Switch>
                  <Route exact path='/home' render={()=>{ return <LoadArticles articles={this.props.articles} />}}/>
                  <Route path='/home/:articleId' component={ArticleWithId} />
                  <Redirect to='/home'/>
              </Switch>
          </div>
      );
  }
}

export default  withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
