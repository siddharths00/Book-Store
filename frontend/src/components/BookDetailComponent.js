import React, { Component, useEffect, useState } from 'react';
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
    Media,
} from 'reactstrap';


import { NavLink, useParams } from 'react-router-dom';
import { Card, CardMedia, CardActions, CardContent, Typography, IconButton, } from '@mui/material';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';

export default function BookDetail() {
    const imgStyle = {
        maxHeight: 150,
        maxWidth: 150
    }
    const [book, setBook] = useState({});
    const val=useParams();
    
    useEffect(() => {
        async function fetchMyAPI() {
            let data = await axios.get('/api/books');
            setBook(data.data.books[val.id-1]);
        }
    
        fetchMyAPI()
    
}, [])

return (
    <div >
        <Header/>
            <div className="detail">
                <Media object src={"http://localhost:3000/"+ book.images} style={imgStyle} alt={book.title} />
                <div className="box-detail">
                    <div className="row">
                        <h2>{book.title}</h2>
                        <h6>#id: {book.book_id}</h6>
                    </div> 
                    <span>$ {book.price}</span>
                    <p>{book.description}</p>
                    <p>{book.content}</p>
                        Buy Now
                </div>
            </div>
    </div> 
);
}