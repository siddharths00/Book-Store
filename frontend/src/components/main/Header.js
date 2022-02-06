import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavbarToggler,
    Collapse,
    NavItem,
    Button
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
            <div sticky='top'>
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
                                <MenuItem className='ms-auto'>
                                    {(localStorage.getItem("firstLogin")) ?
                                        <>
                                            <IconButton aria-label="Show cart items" color="inherit">
                                                <Badge color="secondary">

                                                    <NavLink className="nav-link" to='/cart'><FontAwesomeIcon icon={faShoppingCart} /></NavLink>
                                                </Badge>
                                            </IconButton>
                                        </>
                                        :
                                        null
                                    }
                                </MenuItem>

                                <NavItem >
                                    {(localStorage.getItem("firstLogin")) ? <NavLink to="/" onClick={this.logoutUser}><Button> Logout</Button></NavLink> : <NavLink to='/login'><Button  > Login</Button></NavLink>}
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/addbook" ><Button> Add more books</Button></NavLink>
                                </NavItem>
                            </Nav>

                        </Collapse>
                    </div>
                </Navbar>
            </div>
        );
    }
}

export default Header;