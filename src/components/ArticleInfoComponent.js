import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem,Row,Col,ButtonDropdown,DropdownItem,DropdownToggle,DropdownMenu,Form,Input,Button, FormText} from 'reactstrap';
import {ARTICLES_JAVA}  from '../shared/articles_java';
import {ARTICLES_HTML}  from '../shared/articles_html';
import {Link} from 'react-router-dom';

function RenderArticle({article,contentref}){
    if({contentref} && {article})
    {
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
            <p style={{marginTop:'20px',marginBottom:'20px'}}>
            <img src={article.image} alt={article.title} width="100%" height="300"/>
            </p>
            {article.isUpdated ? ( <p>This article was last updated on {article.lastupdated}</p> ) : ""}
            {contentref.content}
        </React.Fragment>
    );
    }
    return "<div/>"
}

function RenderComments({comments,onClickOfLike,onClickOfReply}){

    if({comments})
    return (
        <React.Fragment>
                    <ul style={{listStyle:'none'}}>
                    {comments.map(comment => <li key={comment.id}>
                        <Row>
                        <Col sm={2} md={2}><img src={comment.authorimg} alt={comment.author} height="40%" width="40%"></img></Col>
                        <Col sm={10} md={10}>
                        <p style={{fontWeight:"bold"}}>{comment.author}</p>
                        <p>{comment.text}</p>
                        <p style={{fontStyle:'italic',fontSize:"small"}}>
                        {'Updated on'}{' '}
                        {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(Date.parse(comment.date))}
                        </p>
                        <p style={{fontSize:"small",marginTop:'1px'}}><Button outline size="sm" onClick={onClickOfLike} color="primary">Like</Button> {" "}{" "}{" "}{" "}<Button outline size="sm" onClick={onClickOfReply} color="primary">Reply</Button></p>
                        </Col>
                        </Row>
                    </li>
                    )
                    }
                    </ul>
        </React.Fragment>
    );
    return <div/>;
}


class ArticleInfo extends Component {

    constructor(props)
    {
        super(props);
        this.state= {
            // file: null,
            dropdownOpen:false,
            dropdownval:"SortBy",
            javaarticles:ARTICLES_JAVA,
            htmlarticles:ARTICLES_HTML,
            comments:this.props.comments,
            likescount:this.props.article.tagcount
        };
       // this.onSelectDropDownItem=this.onSelectDropDownItem.bind(this);
        this.onClickOfLike=this.onClickOfLike.bind(this);
        this.onClickOfReply=this.onClickOfReply.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(event) {
            this.setState({
             //file: URL.createObjectURL(event.dataTransfer.files[0]),
              dropdownOpen: !this.state.dropdownOpen,
              dropdownval: event.target.innerText
            });
          }
    onClickOfLike(event)
    {
        this.setState({likescount:this.state.likescount+1});
        event.preventDefault();
    }
    onClickOfReply(event)
    {
        console.log("in Reply"+event);
        event.preventDefault();
    }
    handleSubmit(event)
    {
        event.preventDefault();
        const currentDate= new Date();
        const addedcomment=[{'id':this.state.comments.length,'articleid':(this.state.comments)[0].articleid,'liked':false,'likedcount':0,'text':this.comment.value,'author':this.username.value,'date':currentDate,'authorimg':"/assets/images/default-profile.png"}];
        this.state.comments.push(addedcomment[0]);   
        this.setState({
             comments: this.state.comments
           });
        this.comment.value="";
        this.username.value="";
    }
    render(){
    if (this.props.article){
        let  contenttobedisplayed,sortedcomments;
        if((this.props.article.reftocontent)==="ARTICLE_JAVA")
        {
             contenttobedisplayed=this.state.javaarticles.filter(content => content.contentid === +this.props.article.contentid)[0];
        }
        else if((this.props.article.reftocontent)==="ARTICLE_HTML")
        {
             contenttobedisplayed=this.state.htmlarticles.filter(content => content.contentid === +this.props.article.contentid)[0];
        }
        if((this.state.dropdownval)==="SortBy")
                sortedcomments=this.state.comments;
        else if((this.state.dropdownval)==="Oldest")
            {
                sortedcomments= (this.state.comments.slice().sort((a, b) => b.date - a.date)).reverse();
            }
        else
        {
                sortedcomments= this.state.comments.slice().sort((a, b) => b.date - a.date);
        }
        this.props.article.tagcount=this.state.likescount;
        return (
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/articles">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Category :{this.props.article.categorytype}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <RenderArticle article={this.props.article} contentref={contenttobedisplayed}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4 className="mt-4">Have your Say</h4>
                        <Row>
                            <Col md={10}>
                                <p>{(this.props.comments).length} Comments</p> 
                            </Col>
                            <Col md={2}>
                                <span>
                                        <ButtonDropdown color="secondary" size="sm" isOpen={this.state.dropdownOpen} toggle={this.handleChange} direction="right">
                                            <DropdownToggle caret color="secondary" size="sm">
                                                {this.state.dropdownval}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem onClick={this.onSelectDropDownItem}>Oldest</DropdownItem>
                                                <DropdownItem onClick={this.onSelectDropDownItem}>Newest</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                </span>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row style={{marginBottom:'4px'}}>
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Form size="sm" onSubmit={this.handleSubmit} style={{marginBottom:'6px'}}>
                                    <Input type="text" id="username" placeholder="Your Name" bsSize="sm" innerRef={input => this.username = input} style={{marginBottom:'2px'}}/>
                                    <Input type="textarea" id="comment" placeholder="Your Comment" bsSize="sm" innerRef={input => this.comment = input} style={{marginBottom:'2px'}} />
                                    <Row>
                                        {/* <Col md={3}><FormText muted>Your profile picture is optional</FormText></Col> */}
                                        {/* <Col md={4}><Input type="file" id="profilepic" name="profilepic" bsSize="sm" onChange={this.handleChange} accept="image/x-png,image/gif,image/jpeg" /> </Col> */}
                                        <Col md={10}></Col>
                                        <Col md={2}><Button outline type="submit" value="submit" size="sm" color="primary">Add Comment</Button></Col>
                                    </Row> 
                                </Form>
                            </Col>
                        </Row>
                        <RenderComments comments={sortedcomments} onClickOfLike={this.onClickOfLike} onClickOfReply={this.onClickOfReply}/>
                    </div>
                </div>
            </div>
            );
    }
    return <div />;
}
}
export default ArticleInfo;