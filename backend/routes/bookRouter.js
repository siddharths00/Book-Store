const router = require('express').Router()
const bookCtrl = require('../controllers/bookControl')
const auth = require('../middleware/auth')
const authAdmin=require('../middleware/authAdmin')
router.get('/books', bookCtrl.getBooks);
router.route('/books')
    .post(auth, authAdmin, bookCtrl.createBook);

router.route('/books/:id')
    .delete(auth, authAdmin, bookCtrl.deleteBook)
    .put(auth, authAdmin, bookCtrl.updateBook)

module.exports = router