# Book-Store

This website aims to build a basic E-Commerce solution for all book-lovers. 
The website uses React on the frontend and NodeJS and Express in the backend. MongoDB was chosen as the database of choice.

There are 2 schemas defined for the data in MongoDB:
1.  BookModel *Emphasize* _emphasize_
2.  UserModel

The routes defined in the project are also divided in 2 parts:
1.  BookRouter
2.  UserRouter


The APIs exposed in the BookRouter.js file manage the operations on books in the database.
The operations supported in the file are
* get('api/books') - Fetches all the books in the database.
* post('api/books') - Adds a new book(Admin functionality).
* delete('api/books/:id ') - Deletes a particular book from database(Admin functionality).
* put('api/books/:id') - Updating the details of a book in the database(Admin functionality).


The APIs exposed in the UserRouter.js file manage the operations on users in the database.
The operations supported in the file are
* post('/register') - Posts details of a new user to store in the database.
* post('/login') - Posts details of existing user to verify and log them in to the website.
* get('/logout') - Logs the user out of the current session by clearing the cookies and the localstorage.
* get('/refresh_token') - Returns the JWT token for the current user by reading the cookies.
* get('/infor') - Gets the details of the current user from the database.
* patch('/addcart') - Adds the selected book to the user's cart.



