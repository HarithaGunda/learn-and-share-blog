import React, { Component }  from 'react';
import { Nav,Navbar, NavbarBrand,NavbarToggler,Collapse,NavItem} from 'reactstrap';
class Header extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }
    
    render (){
        return (
            <React.Fragment>
                <Navbar dark expand="md" style={{background:'#ffc107',marginBottom:'50px'}}>
                    <div className="container">
                        <NavbarBrand href="/"><img className="mr-auto" src="/assets/images/haritha-profile.jpg" height="80" width="80" alt="Haritha Gunda" style={{borderRadius:"50%"}}/></NavbarBrand>
                        <span><h2 color='lite'>Learn & Share Blog</h2></span>
                        <NavbarToggler onClick={this.toggleNav}/>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="ml-auto">
                                <NavItem> 
                                    <ul style={{listStyle:'none',display:'flex'}}>
                                    <li key="email"><a className="btn btn-social-icon btn-email" href="mailto:gunda.haritha@gmail.com"><i className="fa fa-envelope-square text-white"></i></a></li>
                                    <li key="git"><a className="btn btn-social-icon btn-git" href="https://github.com/HarithaGunda"><i className="fa fa-github-square text-white"></i></a> </li>
                                    <li key="fb"><a className=" btn btn-social-icon btn-fb" href="https://www.facebook.com/haritha.gunda"><i className="fa fa-facebook-square text-white"></i></a></li>
                                    <li key="linkedin"><a className=" btn btn-social-icon btn-li" href="https://www.linkedin.com/in/harithagunda/"><i className="fa fa-linkedin-square text-white"></i></a></li>
                                    </ul>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }  
}
export default Header;