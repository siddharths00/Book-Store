import React, { Component, useContext } from 'react';
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
import { Card, CardMedia, CardActions, CardContent, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

class Books extends Component {

    constructor(props) {
        super(props);

        this.state = {
            books: []
        };
    }

    async componentDidMount() {
        let data = await axios.get('/api/books');
        this.setState({
            books: data.data.books
        });

    };

    addToCart = (e)=>{
        console.log(e.target);
    }

    render() {
        const imgStyle = {
            maxHeight: 150,
            maxWidth: 150
        }
        const books = this.state.books.map((book) => {

            return (
                <div key={book.id} className='col-4 mt-5'>
                    <Card left middle style={{ width: "80%", height: "90%" }}>
                        <NavLink className="nav-link" to={{

                        pathname:`/books/${book.book_id}`,
                        state: {name:'from home page'} 
                    }}>
                            <Media object src={book.images} style={imgStyle} alt={book.title} />
                            <CardContent>
                                <div >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {book.title}
                                    </Typography>
                                    <Typography>
                                        {book.price} ₹
                                    </Typography>
                                </div>
                                <Typography dangerouslySetInnerHTML={{ __html: book.description }} variant="body2" color="textSecondary" component="p" />
                            </CardContent>
                            <CardActions disableSpacing >

                                

                            </CardActions>
                        </NavLink>
                        <IconButton aria-label="Add to Cart" id={book.book_id}  onClick={this.addToCart}>
                                    <FontAwesomeIcon icon={faCartPlus} id={book.book_id}/>
                                </IconButton>
                    </Card>
                </div >
            );
        })


        return (
            <div >
                <div className='container' id="allbooks">
                    <div className='row'>
                        <Media list className='row'>
                            {books}
                        </Media>
                    </div>
                </div>

            </div >
        );
    }
}

export default Books;