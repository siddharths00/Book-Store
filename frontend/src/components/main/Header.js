import React, { Component, useState, useContext } from 'react';
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
import { GlobalState } from '../../GlobalState';
function Header() {

    const [toggle, setToggle] = useState(true);
    const state = useContext(GlobalState)
    const tempUser = state.userAPI.user;
    const logoutUser = async () => {
        await axios.get('/user/logout')

        localStorage.removeItem('firstLogin')

        window.location.href = "/";
    }

    const toggleNavbar = () => {
        let tog = !toggle;
        setToggle(tog);
    }

    return (
        <div sticky='top'>
            <Navbar dark expand="md"
                style={{
                    backgroundColor: "#343434",
                    top: "0",
                    left: "0",
                    width: "100%",
                    zIndex:"5",
                    padding:"10px"
                }}>
                <div className="container">
                    <NavbarToggler onClick={toggleNavbar} />
                    <Collapse isOpen={toggle}>
                        <Nav navbar>
                            <NavbarBrand className="mr-auto" href="/"><strong>The Book Shop</strong></NavbarBrand>
                            <NavItem>
                                <Link to="aboutus" spy={true} className="nav-link"><FontAwesomeIcon icon={faCoffee} /> About Us</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="allbooks" spy={true} className="nav-link"><FontAwesomeIcon icon={faBars} /> Menu</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="footer" spy={true} className="nav-link"><FontAwesomeIcon icon={faPhone} /> Contact Us</Link>
                            </NavItem>
                            <MenuItem className='ms-auto'>
                                {(localStorage.getItem("firstLogin")) ?
                                    <>
                                        <IconButton aria-label="Show cart items" color="inherit" style={{ height: "1rem" }}>
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
                                {(localStorage.getItem("firstLogin")) ? <NavLink to="/" onClick={logoutUser}><Button className='text-dark'> Logout</Button></NavLink> : <NavLink to='/login'><Button className='text-dark' > Login</Button></NavLink>}
                            </NavItem>
                            {
                                tempUser[0].role === 1 ?
                                    <NavItem>
                                        <NavLink to="/addbook" ><Button className="text-dark"> Add more books</Button></NavLink>
                                    </NavItem>
                                    :
                                    null
                            }

                        </Nav>

                    </Collapse>
                </div>
            </Navbar>
        </div>
    );
}

export default Header;