import React, { useContext, useEffect, useState } from 'react';
import {
    Media
} from 'reactstrap';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import './book.css';
import Alert from '@mui/material/Alert';
import { NavLink } from 'react-router-dom';
import { CardContent, Typography, IconButton, Button } from '@mui/material';
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { GlobalState } from '../../GlobalState';
function Books() {

    const [books, setBooks] = useState([]);
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState('');
    const [warnings, setWarnings] = useState('');
    const [success, setSuccess] = useState('');
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
        maxWidth: 150,
        marginTop: 5
    }
    const books_detail = books.map((book) => {

        return (
            <div key={book.book_id} className='col-4 mt-5 flex-container' style={{ boxSizing: "border-box" }}>
                <Card className="flex-container" style={{ width: "80%", height: '520px', borderRadius: "15px" }}>
                    <Card className="flex-item" style={{ width: "100%", height: '490px', borderRadius: "15px" }} className="bg-dark text-light">
                        {
                            tempUser[0].role === 1 ?
                                <Button variant="outlined" color="error" onClick={() => removebook(book._id)}>Remove</Button>
                                :
                                null
                        }
                        <div>
                            <NavLink className="nav-link" to={{

                                pathname: `/books/${book.book_id}`,
                                state: { name: 'from home page' }
                            }}>
                                <Media object src={book.images} style={imgStyle} alt={book.title} />
                                <Card.Body>
                                    
                                    <div >
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {book.title}
                                        </Typography>
                                        <Typography>
                                            {book.price} ₹
                                        </Typography>
                                    </div>
                                    <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '15rem'}}> 
                                    <Typography className="bg-dark text-light" style={{ boxSizing: "border-box" }} dangerouslySetInnerHTML={{ __html: book.description }} variant="body2" color="textSecondary" component="p" />
                                    </div>

                                    {(errors.length != 0) && (errors[1] === book.book_id) ? <Alert severity="error">{errors[0]}</Alert>:null}
                                    {(warnings.length != 0) && (warnings[1] === book.book_id) ? <Alert severity="warning">{warnings[0]}</Alert>:null}
                                    {(success.length != 0) && (success[1] === book.book_id) ? <Alert severity="success">{success[0]}</Alert>:null}
                                </Card.Body>
                            </NavLink>
                        </div>
                        {/* <Card.Footer style={{marginBottom: "20",}}> */}
                        {/* <div style={{marginTop:"30%"}}> */}

                        {/* </Card.Footer> */}
                        {/* </div> */}
                    </Card>
                    <Card.Footer>
                        <IconButton className="bg-dark text-light" style={{ marginBottom: "0" }} aria-label="Add to Cart" id={book.book_id} onClick={() => addCart(book).then((e) => {
                            console.log(e);
                            if (e.status === 200) {
                                setSuccess([
                                    e.msg,
                                    e.id
                                ]);
                                setWarnings([]);
                                setErrors([]);
                            }
                            else if (e.status === 300) {
                                console.log(e.id===book.book_id);
                                setWarnings([
                                    e.msg,
                                    e.id
                                ]);
                                setErrors([]);
                                setSuccess([]);
                            }
                            else if (e.status === 400) {
                                setErrors([
                                    e.msg,
                                    e.id
                                ]);
                                setWarnings([]);
                                setSuccess([]);
                            }

                            console.log(warnings, (warnings.length === 0) && (warnings[1] === book.book_id));
                        })}>
                            <FontAwesomeIcon icon={faCartPlus} id={book.book_id} />
                        </IconButton>
                    </Card.Footer>
                </Card>
            </div >
        );
    })


    return (
        <div style={{ backgroundColor: "#848884" }}>
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

export default Books;