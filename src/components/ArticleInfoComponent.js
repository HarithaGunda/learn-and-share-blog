import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Row, Col, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu, Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {baseUrl} from '../shared/baseUrl';
import {Link} from 'react-router-dom';
import {Control, Form} from 'react-redux-form';


function RenderArticle({contentref, article}) {
    if (contentref&&article) {
        return (
            <React.Fragment>
                <h2 className="mt-3">{article.title}</h2>
                <hr></hr>
                <Row>
                    <Col md={10}>
                        <span style={{fontWeight: 'lighter', fontStyle: 'italic'}}>By {article.author} on {article.datepublish}</span>
                    </Col>
                    <Col md={2}>
                        <span className="fa fa-layers">
                            <i className="fa fa-thumbs-up" />
                            <span className="fa fa-layers-counter">{article.tagcount}</span>
                        </span>
                    </Col>
                </Row>
                <p style={{marginTop: '20px', marginBottom: '20px'}}>
                    <img src={baseUrl+article.image} alt={article.title} width="100%" height="300" />
                </p>
                {article.isUpdated? (<p>This article was last updated on {article.lastupdated}</p>):""}
                {contentref}
            </React.Fragment>
        );
    }
    return "<div/>"
}

function RenderComments({comments, onClickOfLike, onClickOfReply, dropdownval, article}) {
    // const [tagCount, computeTagCount]=useState(0);

    if (comments) {
        comments=(dropdownval==="Newest")? ((comments.slice().sort((a, b) => b.date-a.date)).reverse()):((dropdownval==="Oldest")? (comments.slice().sort((a, b) => b.date-a.date)):comments)
        return (
            <React.Fragment>
                <ul style={{listStyle: 'none'}}>
                    {
                        comments.map(comment => <li key={comment.id}>
                            <Row>
                                <Col sm={2} md={2}><img src={baseUrl+comment.authorimg} alt={comment.author} height="40%" width="40%"></img></Col>
                                <Col sm={10} md={10}>
                                    <p style={{fontWeight: "bold"}}>{comment.author}</p>
                                    <p>{comment.text}</p>
                                    <p style={{fontStyle: 'italic', fontSize: "small"}}>
                                        {'Updated on'}{' '}
                                        {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(Date.parse(comment.date))}
                                    </p>
                                    <p style={{fontSize: "small", marginTop: '1px'}}><Button outline size="sm" onClick={onClickOfLike} color="primary" value={[(comment.id), (comment.likedcount+1), (article.tagcount+1), (article.id)]}>Like</Button> {" "}{" "}{" "}{" "}<Button outline size="sm" onClick={onClickOfReply} color="primary" value={comment.id}>Reply</Button></p>
                                </Col>
                            </Row>
                        </li>
                        )
                    }
                </ul>
            </React.Fragment>
        );
    }
    return <div />;
}


class ArticleInfo extends Component {

    constructor(props) {
        super(props);
        this.state={
            dropdownOpen: false,
            dropdownval: "SortBy",
            isModalOpen: false,
            sourceEventFrm: "New",
            parentCommentId: -1
        };

        this.toggleModal=this.toggleModal.bind(this);
        this.onClickOfLike=this.onClickOfLike.bind(this);
        this.onClickOfReply=this.onClickOfReply.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    handleChange(event) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            dropdownval: event.target.innerText
        });
    }
    onClickOfLike(event) {
        const inputArr=(event.target.value).split(",").map(ele => parseInt(ele));
        console.log(inputArr);
        this.props.updateLikeCount(inputArr);
        event.preventDefault();
    }
    onClickOfReply(event) {
        console.log("Currently not supporting");
        /*this.setState({
            sourceEventFrm: "Reply",
            parentCommentId: event.target.value
        });
        this.toggleModal();
        event.preventDefault();*/
    }
    handleSubmit(values) {
        // this.props.postComment((this.state.parentCommentId), (this.state.sourceeventfrm), (this.props.commentslength), (this.props.article.id), false, 0, values.comment, values.username);
        this.props.postComment((this.props.commentslength), (this.props.article.id), false, 0, values.comment, values.username);
        this.props.resetAddCommentForm();
        this.toggleModal();
    }
    render() {

        const {article, articlesjava, articleshtml, comments}=this.props;
        if (article) {
            let contenttobedisplayed=(articlesjava? articlesjava.content:(articleshtml? articleshtml.content:''));
            if (contenttobedisplayed) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/articles">Home</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Category :{article.categorytype}</BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <RenderArticle article={article} contentref={contenttobedisplayed} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Row style={{marginBottom: '4px'}}>
                                    <Col md={2}><h4 className="mt-4">Have your Say</h4></Col>
                                    <Col md={9} className="mt-4">
                                        <Button outline size="sm" onClick={this.toggleModal}> <i className="fa fa-pencil fa-lg" /></Button>
                                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                            <ModalHeader toggle={this.toggleModal}>Here you say!!</ModalHeader>
                                            <ModalBody>
                                                <Form model="addcommentform" size="sm" onSubmit={values => this.handleSubmit(values)} className="form" style={{marginBottom: '6px'}}>
                                                    <Control.text model=".username" id="username" placeholder="Your Name" className="form-control" style={{marginBottom: '2px'}} />
                                                    <Control.textarea model=".comment" id="comment" placeholder="Your Comment" className="form-control" style={{marginBottom: '2px'}} />
                                                    <Row>
                                                        <Col md={10}></Col>
                                                        <Col md={2}>
                                                            <Button outline type="submit" size="sm" color="primary">Submit</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </ModalBody>
                                        </Modal>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={10}>
                                        <span fontStyle="italic important!" fontSize="3">{(comments).length} Comments</span>
                                    </Col>
                                    <Col md={2}>
                                        <span>
                                            <ButtonDropdown color="secondary" size="sm" isOpen={this.state.dropdownOpen} toggle={this.handleChange} direction="right">
                                                <DropdownToggle caret color="secondary" size="sm">
                                                    {this.state.dropdownval}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem>Oldest</DropdownItem>
                                                    <DropdownItem>Newest</DropdownItem>
                                                </DropdownMenu>
                                            </ButtonDropdown>
                                        </span>
                                    </Col>
                                </Row>
                                <hr></hr>
                                <RenderComments comments={comments} onClickOfLike={this.onClickOfLike} onClickOfReply={this.onClickOfReply} dropdownval={this.state.dropdownval} article={article} />
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return <div />;
    }
}
export default ArticleInfo;