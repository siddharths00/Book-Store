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

import { NavLink } from 'react-router-dom';

import Header from './Header';
import Books from './BooksComponent';
import Footer from './FooterComponent';
import Jumbotron from './JumbotronComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {}
        }
    }


    render() {
        return (
            <div >
                <Header />
                <Jumbotron/>
                <Books />
                <Footer />
            </div>
        );
    }
}

export default Main;