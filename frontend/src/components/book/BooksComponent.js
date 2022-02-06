import React, { useContext, useEffect, useState } from 'react';
import {
    Media
} from 'reactstrap';

import axios from 'axios'


import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography, IconButton, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { GlobalState } from '../../GlobalState';
function Books() {

    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    const state = useContext(GlobalState)
    const addCart = state.userAPI.addCart;
    const isAdmin = state.userAPI.isAdmin;
    const tempUser = state.userAPI.user;
    const [token] = state.token;
    useEffect(() => {
        async function myfunc() {
            let data = await axios.get('/api/books');
            setBooks(data.data.books);
            setShow(isAdmin);
        };
        myfunc();

    }, [isAdmin, show]);

    const removebook = async (id) => {
        await axios.delete(`/api/books/${id}`, {
            headers: { Authorization: token }
        });
        window.location.reload();
    }

    const imgStyle = {
        maxHeight: 150,
        maxWidth: 150
    }
    const books_detail = books.map((book) => {

        return (
            <div key={book.id} className='col-4 mt-5'>

                <Card style={{ width: "80%", height: '540px' }}>
                    {
                        tempUser[0].role ?
                            <Button variant="outlined" color="error" onClick={() => removebook(book._id)}>Remove</Button>
                            :
                            null
                    }
                    <NavLink className="nav-link" to={{

                        pathname: `/books/${book.book_id}`,
                        state: { name: 'from home page' }
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
                    </NavLink>
                    <IconButton style={{ marginBottom: '20px' }} aria-label="Add to Cart" id={book.book_id} onClick={() => addCart(book)}>
                        <FontAwesomeIcon icon={faCartPlus} id={book.book_id} />
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
                        {books_detail}
                    </Media>
                </div>
            </div>

        </div >
    );
}
// }

export default Books;