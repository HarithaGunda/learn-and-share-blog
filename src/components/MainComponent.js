import React, { Component } from 'react';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import {ARTICLES}  from '../shared/articles';
import {COMMENTS}  from '../shared/comments';
import LoadArticles from './LoadArticlesComponent';
import Header from './HeaderComponent';
import ArticleInfo from './ArticleInfoComponent';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: ARTICLES,
            comments:COMMENTS
        };
    }

  render() {

    const ArticleWithId= ({match}) => {
        return (
            <ArticleInfo 
                article={this.state.articles.filter(article => article.id === +match.params.articleId)[0]} 
                comments={this.state.comments.filter(comment => comment.articleid === +match.params.articleId)}
            />
        );
    };    
      return (
          <div>
              <Header/>
              <Switch>
                  <Route exact path='/home' render={()=>{ return <LoadArticles articles={this.state.articles}/>}}/>
                  <Route path='/home/:articleId' component={ArticleWithId} />
                  <Redirect to='/home'/>
              </Switch>
          </div>
      );
  }
}

export default  withRouter(Main);