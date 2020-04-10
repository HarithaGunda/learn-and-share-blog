import React from 'react';
import {Button,Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

function RenderArticle({article}) {
    return (
        <React.Fragment>
            <h2 className="mt-3">{article.title}</h2>
            <hr></hr>
            <Row>
                <Col md={10}>
                <span style={{fontWeight:'lighter',fontStyle:'italic'}}>By {article.author} on {article.datepublish}</span>
                </Col>
                <Col md={2}>
                <span className="fa fa-layers">
                    <i className="fa fa-thumbs-up"/>
                    <span className="fa fa-layers-counter">{article.tagcount}</span>
                </span>
                </Col>
            </Row>
            <p style={{marginTop:'20px',marginBottom:'20px',textAlign:'center'}}>
            <img src={baseUrl+article.image} className="img-fluid" alt={article.title}/>
            </p>
            {article.isUpdated ? ( <p>This article was last updated on {article.lastupdated}</p> ) : ""}
            <p>{article.previewcontent}</p>
            <Link to={`/home/${article.id}`}>
                <Button color="warning" size='sm' outline>Read More...</Button>
            </Link>
        </React.Fragment>
    );
}
function LoadArticles(props) {
    
    const article=props.articles.articles.map(article => {
        return (
            <div key={article.id}>
                <RenderArticle article={article} />
            </div>
        );
    })
       
    return (
        <div className="container">
             <div className="row justify-content-md-center">
                <div className="col-lg-8 col-md-10 ">
                    {article}
                </div>
            </div>                
        </div>
    );
}

export default LoadArticles;