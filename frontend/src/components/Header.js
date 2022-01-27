import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    Collapse,
    NavItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Input,
    Label,
    Media
} from 'reactstrap';
import axios from 'axios'

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPhone, faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { MenuItem, Badge, IconButton } from '@mui/material';
import { Link } from 'react-scroll';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: true
        }
    }

    logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    toggleNavbar = () => {
        let tog = !this.state.toggle;
        this.setState({
            toggle: tog
        })
    }

    render() {
        return (
            <div >
                <Navbar dark expand="md" color='primary'>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.toggle}>
                            <Nav navbar>
                                <NavbarBrand className="mr-auto" href="/"><strong>The Book Shop</strong></NavbarBrand>
                                <NavItem>
                                    <Link to="aboutus" spy={true} className="nav-link"><NavLink className="nav-link" to='/'><FontAwesomeIcon icon={faCoffee} /> About Us</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link to="allbooks" spy={true} className="nav-link"><NavLink className="nav-link" to='/'><FontAwesomeIcon icon={faBars} /> Menu</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/'><Link to="footer" spy={true} className="nav-link"><FontAwesomeIcon icon={faPhone} /> Contact Us</Link></NavLink>
                                </NavItem>
                                <NavItem right>
                                    {(localStorage.getItem("firstLogin")) ? <NavLink to="/" onClick={this.logoutUser}><Button> Logout</Button></NavLink> : <NavLink className="nav-link" to='/login'><Button  > Login</Button></NavLink>}
                                </NavItem>
                                <MenuItem>
                                    <IconButton aria-label="Show cart items" color="inherit">
                                        <Badge badgeContent={2} color="secondary">
                                            <FontAwesomeIcon icon={faShoppingCart} />
                                        </Badge>
                                    </IconButton>
                                    <p>Cart</p>
                                </MenuItem>
                            </Nav>

                        </Collapse>
                    </div>
                </Navbar>


            </div>
        );
    }
}

export default Header;