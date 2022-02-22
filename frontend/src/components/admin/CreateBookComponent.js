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
    images: "",
    upload: []
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

    const handleChangeInput2 = e => {
        // const { name, value } = e.target

        // (e)=>{

        let file = e.target.files[0];
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);

        reader.onloadend = function (event) {
            setBook({
                ...book,
                "images": [reader.result],
                "upload": e.target.files[0]
            })
        };
        console.log(url)

        // });
        // }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // if (onEdit) {
            //     await axios.put(`/api/books/${book.book_id}`, { ...book }, {
            //         headers: { Authorization: token }
            //     })
            // } else {
            //     await axios.post('/api/books', { book }, {
            //         headers: { Authorization: token }
            //     })
            // }
            let file;

            async function func(){
                file = book.images;
                const blob = await file.blob();
                file = new File([blob], 'image.jpg',{type:blob.type});
                console.log(file);
            }
            if(onEdit)
            {
                func();
            }
            else file = book.upload;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "upload");
            axios.post("https://api.cloudinary.com/v1_1/bookstoree6577876868/upload", formData).then(async (e) => {
                console.log(e);

                if (onEdit) {
                    await axios.put(`/api/books/${book.book_id}`, { ...book, images: e.data.url }, {
                        headers: { Authorization: token }
                    }).then(() => {
                        window.location.href = "/";
                    })
                } else {
                    await axios.post('/api/books', { ...book, images: e.data.url }, {
                        headers: { Authorization: token }
                    }).then(() => {
                        window.location.href = "/";
                    })
                }
            });
            // window.location.href = "/";
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="bg-light">
            <Header />
            <div className="create_book">
                {
                    book.images ?
                        <div className="upload">
                            <Media object src={book.images} style={{
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

                    {
                        onEdit ?
                            <div className="row">
                                <label htmlFor="images">Image: </label>
                                <input type="file" name="file" id="file"
                                    onChange={handleChangeInput2} />
                            </div>
                            :
                            <div className="row">
                                <label htmlFor="images">Image: </label>
                                <input type="file" name="file" id="file" required
                                    onChange={handleChangeInput2} />
                            </div>

                    }
                    {/* <div className="row">
                        <label htmlFor="images">Image: </label>
                        <input type="file" name="file" id="file" required
                            onChange={handleChangeInput2} />
                    </div> */}

                    <button type="submit">{onEdit ? "Update" : "Create"}</button>
                </form>
            </div>
        </div>
    )
}

export default CreateBook
