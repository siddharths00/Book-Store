import React, { Component } from 'react';

import Header from './Header';
import Books from '../book/BooksComponent';
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