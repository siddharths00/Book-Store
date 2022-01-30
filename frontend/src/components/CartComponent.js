import React, { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../GlobalState'
import axios from 'axios'
// import PaypalButton from './PaypalButton'
import './Cart.css'


import { NavLink } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

import { Media } from 'reactstrap';
import Header from './Header';


// const theme = createTheme();

function Cart() {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            }, 0)

            setTotal(total)
        }

        getTotal()

    }, [cart])

    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }


    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removebook = id => {
        if (window.confirm("Do you want to delete this book?")) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const imgStyle = {
        maxHeight: 150,
        maxWidth: 150
    }

    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

    const books_detail = cart.map((book) => {

        return (
            <div key={book.id} className='col-12 mt-5 row'>
                <Card className='col-6'>
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
                        </CardContent>
                    </NavLink>
                </Card>
                <Card className='col-6'>
                    <div className="detail cart" key={book._id}>

                        <CardContent>
                            <h2>{book.title}</h2>

                            <Typography>₹ {book.price * book.quantity}</Typography>
                            <Typography>₹ {book.description}</Typography>
                            <div className="amount">
                                <button onClick={() => decrement(book._id)}>  -  </button>
                                <span>{book.quantity}</span>
                                <button onClick={() => increment(book._id)}>  +  </button>
                            </div>

                            <div className="delete"
                                onClick={() => removebook(book._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                X
                            </div>
                        </CardContent>
                    </div>
                </Card>

            </div >
        );
    })


    return (
        <div>
            <Header />
            <div className='container' id="allbooks">
                <div className='row'>
                    <Media list className='row'>
                        {books_detail}
                    </Media>
                </div>
            </div>
            {
                // cart.map(book => (
                // <div className="detail cart" key={book._id}>
                //     <img src={book.images.url} alt="" />

                //     <div className="box-detail">
                //         <h2>{book.title}</h2>

                //         <h3>$ {book.price * book.quantity}</h3>
                //         <p>{book.description}</p>
                //         <p>{book.content}</p>

                //         <div className="amount">
                //             <button onClick={() => decrement(book._id)}> - </button>
                //             <span>{book.quantity}</span>
                //             <button onClick={() => increment(book._id)}> + </button>
                //         </div>

                //         <div className="delete" 
                //         onClick={() => removebook(book._id)}>
                //             X
                //         </div>
                //     </div>
                // </div>

                // ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                {/* <PaypalButton
                total={total}
                tranSuccess={tranSuccess} /> */}
            </div>
        </div>
    )
}

export default Cart
