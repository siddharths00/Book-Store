import logo from './logo.svg';
import './App.css';
// import Books from './components/BooksComponent'
// import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.css';
import BookDetail from './components/BookDetailComponent';
import Register from './components/Register';
import Login from './components/Login';

import Main from './components/MainComponent';
import Cart from './components/CartComponent';
import { BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Routes, Route, Redirect, withRouter } from 'react-router-dom';
import {
  Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
// import Cart from './components/CartComponent';

import { DataProvider } from './GlobalState'
import Books from './components/BooksComponent';
import Jumbotron from './components/JumbotronComponent';



function App() {
  return (
    <DataProvider>
      {/* // <BrowserRouter> */}
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/home' element={<Main />} />
            <Route exact path='/books/:id' element={<BookDetail />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/cart' element={<Cart />} />
          </Routes>
        </div>
      {/* // </BrowserRouter> */}
    </DataProvider>
  );
}

export default App;







// import React, { useState, useEffect } from 'react';
// import { CssBaseline } from '@material-ui/core';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { Navbar, Products, Cart, Checkout } from './components';
// import { commerce } from './lib/commerce';

// const App = () => {
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState({});
//   const [order, setOrder] = useState({});
//   const [errorMessage, setErrorMessage] = useState('');

//   const fetchProducts = async () => {
//     // const { data } = await commerce.products.list();

//     let data = [
//       {
//         "id": 0,
//         "name": "Uthappizza",
//         "image": "assets/18952403.jpg ",
//         "category": "mains",
//         "label": "Hot",
//         "price": "4.99",
//         "featured": true,
//         "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer."
//       },
//       {
//         "id": 1,
//         "name": "Zucchipakoda",
//         "image": "assets/18952403.jpg ",
//         "category": "appetizer",
//         "label": "",
//         "price": "1.99",
//         "featured": false,
//         "description": "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce"
//       },
//       {
//         "id": 2,
//         "name": "Vadonut",
//         // "image": " ../../public/assets/18952403.jpg",
//         "image": "assets/18952403.jpg ",
//         "category": "appetizer",
//         "label": "New",
//         "price": "1.99",
//         "featured": false,
//         "description": "A quintessential ConFusion experience, is it a vada or is it a donut?"
//       }
//     ]

//     setProducts(data);
//   };

//   const fetchCart = async () => {
//     setCart(await commerce.cart.retrieve());
//   };

//   const handleAddToCart = async (productId, quantity) => {
//     const item = await commerce.cart.add(productId, quantity);

//     setCart(item.cart);
//   };

//   const handleUpdateCartQty = async (lineItemId, quantity) => {
//     const response = await commerce.cart.update(lineItemId, { quantity });

//     setCart(response.cart);
//   };

//   const handleRemoveFromCart = async (lineItemId) => {
//     const response = await commerce.cart.remove(lineItemId);

//     setCart(response.cart);
//   };

//   const handleEmptyCart = async () => {
//     const response = await commerce.cart.empty();

//     setCart(response.cart);
//   };

//   const refreshCart = async () => {
//     const newCart = await commerce.cart.refresh();

//     setCart(newCart);
//   };

//   const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
//     try {
//       const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

//       setOrder(incomingOrder);

//       refreshCart();
//     } catch (error) {
//       setErrorMessage(error.data.error.message);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCart();
//   }, []);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   return (
//     <Router>
//       <div style={{ display: 'flex' }}>
//         <CssBaseline />
//         <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
//         <Switch>
//           <Route exact path="/">
//             <Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />
//           </Route>
//           <Route exact path="/cart">
//             <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
//           </Route>
//           <Route path="/checkout" exact>
//             <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// };

// export default App;