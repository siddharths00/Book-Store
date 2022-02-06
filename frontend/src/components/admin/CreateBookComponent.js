import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../GlobalState'
import { useParams } from 'react-router-dom'
import './createBook.css';
import Header from '../main/Header';
import {
    Media,
} from 'reactstrap';

const initialState = {
    book_id: '8',
    title: 'some title',
    price: 2,
    description: 'some desc',
    images: ""
}


function CreateBook() {
    const state = useContext(GlobalState)
    const [book, setBook] = useState(initialState)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [onEdit, setOnEdit] = useState(false)
    const val = useParams();
    useEffect(() => {
        console.log(val);
        if (val.id) {
            console.log("here");
            setOnEdit(true)
            async function fetchMyAPI() {
                let data = await axios.get('/api/books');
                data.data.books.forEach(book => {
                    if (book.book_id === val.id) {
                        setBook(book)
                    }
                })
            }
            fetchMyAPI()
        }
        else setBook(initialState)
    }, [val.id])

    const handleChangeInput = e => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`/api/books/${book.book_id}`, { ...book }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post('/api/books', { book }, {
                    headers: { Authorization: token }
                })
            }
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>
            <Header />
            <div className="create_book">
                {
                    book.images ?
                        <div className="upload">
                            <Media object src={"http://localhost:3000/" + book.images} style={{
                                maxHeight: 500,
                                maxWidth: 500
                            }} alt={book.title} />
                        </div> :
                        null
                }

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <label htmlFor="book_id">Book ID</label>
                        <input type="text" name="book_id" id="book_id" required
                            value={book.book_id} onChange={handleChangeInput} />
                    </div>

                    <div className="row">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" required
                            value={book.title} onChange={handleChangeInput} />
                    </div>

                    <div className="row">
                        <label htmlFor="price">Price</label>
                        <input type="number" name="price" id="price" required
                            value={book.price} onChange={handleChangeInput} />
                    </div>

                    <div className="row">
                        <label htmlFor="description">Description</label>
                        <textarea type="text" name="description" id="description" required
                            value={book.description} rows="2" onChange={handleChangeInput} />
                    </div>

                    <div className="row">
                        <label htmlFor="images">Image: </label>
                        <input type="text" name="images" id="images" required
                            value={book.images} onChange={handleChangeInput} />
                    </div>

                    <button type="submit">{onEdit ? "Update" : "Create"}</button>
                </form>
            </div>
        </>
    )
}

export default CreateBook
