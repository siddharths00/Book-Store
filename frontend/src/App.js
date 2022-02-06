import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import BookDetail from './components/book/BookDetailComponent';
import Register from './components/user/Register';
import Login from './components/user/Login';

import Main from './components/main/MainComponent';
import Cart from './components/cart/CartComponent';
import CreateBook from './components/admin/CreateBookComponent';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { DataProvider } from './GlobalState'



function App() {
  return (
    <DataProvider>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route exact path='/home' element={<Main />} />
          <Route exact path='/books/:id' element={<BookDetail />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/addbook' element={<CreateBook />} />
          <Route exact path='/addbook/:id' element={<CreateBook />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;