import React, { Component, useEffect, useState, useContext } from 'react';
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
import Header from '../main/Header';
import { GlobalState } from '../../GlobalState';

export default function BookDetail() {
    const imgStyle = {
        maxHeight: 180,
        maxWidth: 180
    }
    const [book, setBook] = useState({});
    const val = useParams();

    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart;
    const tempUser = state.userAPI.user;

    useEffect(() => {
        async function fetchMyAPI() {
            let data = await axios.get('/api/books');
            data.data.books.forEach(book => {
                if (book.book_id === val.id) {
                    setBook(book)
                }
            })
        }
        fetchMyAPI()

    }, [])

    return (
        <div style={{backgroundColor:"#848884"}}>
            <Header />

            <div className="detail">
                <Media object src={book.images} style={imgStyle} alt={book.title} />
                <div className="box-detail">
                    <div className="row">
                        <h2>{book.title}</h2>
                    </div>
                    <span>₹ {book.price}</span>
                    <p style={{width:"300px", marginLeft:"38%"}}>{book.description}</p>
                    <Button className='text-dark' onClick={() => addCart(book)}>Add to Cart</Button>

                    {
                        tempUser[0].role === 1 ? 
                        <NavLink className="nav-link" to={`/addbook/${book.book_id}`}><Button className='text-dark'>Update the Details</Button></NavLink> : null
                    }
                    
                </div>
            </div>
        </div>
    );
}
